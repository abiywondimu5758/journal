# views.py
from django.db import IntegrityError
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics, permissions, status,serializers
from .models import User
from .serializers import CustomUserSerializer, OTPRequestSerializer, PasswordChangeSerializer, CustomUserUpdateSerializer
from rest_framework.views import APIView
from .utils import generate_otp, verify_otp, forgot_password
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import check_password


class GenerateOTPView(APIView):
    def post(self, request, *args, **kwargs):
        
        generate_otp(request.user)
        return Response({'detail': 'OTP generated successfully.'}, status=status.HTTP_200_OK)


class VerifyOTPView(APIView):
    def post(self, request, *args, **kwargs):
        entered_otp = request.data.get('otp')
        if verify_otp(request.user, entered_otp):
            request.user.otp_validated = True
            request.user.save()
            return Response({'detail': 'OTP verified successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)


class CustomUserListCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer

    def list(self, request, *args, **kwargs):
        # Return 405 Method Not Allowed for GET requests
        return Response(status=405)

    # You can keep the create method for handling POST requests
    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except IntegrityError as e:
            # Check if the error is due to a duplicate email
            if 'UNIQUE constraint failed: users_user.email' in str(e):
                return Response({'detail': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
            # Handle other IntegrityError cases if needed
            else:
                return Response({'detail': 'An error occurred while creating the user.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomUserDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user  # Retrieve the authenticated user

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class CustomUserUpdateView(generics.UpdateAPIView):
    serializer_class = CustomUserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    

    
    def get_object(self):
        # Get the current user
        return self.request.user

    def perform_update(self, serializer):
        # Get the current user
        user = self.get_object()

        # Get the provided password from the serializer
        provided_password = serializer.validated_data.get('password', None)
        # Check if the provided password matches the current user's password
        if not check_password(provided_password, user.password):
            raise serializers.ValidationError({'password': 'Current password is incorrect'})

        # Save the updated data
        serializer.save()

        return Response(serializer.data)

class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    # Replace with your authentication class
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]


class ForgotPasswordView(generics.CreateAPIView):
    serializer_class = OTPRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
            request._user_for_verification = user
            forgot_password(user)
        except ObjectDoesNotExist:
            return Response({'detail': 'User not found for the provided email.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'detail': 'OTP sent successfully.'}, status=status.HTTP_200_OK)


class VerifyForgotOTPView(APIView):
    def post(self, request, *args, **kwargs):
        entered_otp = request.data.get('otp')
        try:
            user = User.objects.get(otp_forgot_pass=entered_otp)

            if user:
                user.otp_forgot_pass_validated = True
                user.save()
                return Response({'detail': 'OTP verified successfully.'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            pass

        return Response({'detail': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    def post(self, request, *args, **kwargs):
        otp = request.data.get('otp')
        serializer = PasswordChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.get(otp_forgot_pass=otp)

        if user.otp_forgot_pass_validated:
            if make_password(
                serializer.validated_data['new_password']) == user.password:
                return Response({'detail': 'Password can\'t be the same as the old one.'}, status=status.HTTP_400_BAD_REQUEST)
            user.password = make_password(
                serializer.validated_data['new_password'])
            user.otp_forgot_pass_validated = False
            user.otp_forgot_pass = None
            user.save()

            return Response({'detail': 'Password changed successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'OTP validation required before changing the password.'}, status=status.HTTP_400_BAD_REQUEST)
