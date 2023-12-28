# urls.py
from django.urls import path
from .views import (CustomUserListCreateView, CustomUserDetailView, AdminUserListView,
                    GenerateOTPView, VerifyOTPView, ForgotPasswordView, VerifyForgotOTPView, ChangePasswordView)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('users/', AdminUserListView.as_view(), name='user-list'),
    path('register/', CustomUserListCreateView.as_view(), name='register'),
    path('user/', CustomUserDetailView.as_view(), name='user-detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('generate-otp/', GenerateOTPView.as_view(), name='generate-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('verify-forgot-password/', VerifyForgotOTPView.as_view(),
         name='verify-forgot-password'),
    path('change-forgot-password/', ChangePasswordView.as_view(),
         name='change-forgot-password'),
]
# ... other URLs
