# serializers.py
from rest_framework import serializers
from .models import User


class CustomUserSerializer(serializers.ModelSerializer):
    # Allow password to be optional
    password = serializers.CharField(required=True)
    birth_date = serializers.DateField(required=False)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    username = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username',
                  'email', 'birth_date', 'password', 'bio', 'avatar', )

    def create(self, validated_data):
        # Custom logic to create a user with a hashed password
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        # Custom logic to update a user, including handling password update
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)
        return super().update(instance, validated_data)


class OTPRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordChangeSerializer(serializers.Serializer):
    otp = serializers.CharField(
        write_only=True,
        required=True,
        max_length=6,  # Assuming OTP is a 6-digit code, adjust as needed
        min_length=6,
        error_messages={
            'required': 'OTP is required.',
            'min_length': 'OTP must be exactly {min_length} characters long.',
            'max_length': 'OTP must be exactly {max_length} characters long.'
        }
    )

    new_password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=8,  # Set your desired minimum length for the password
        error_messages={
            'required': 'New password is required.',
            'min_length': 'New password must be at least {min_length} characters long.'
        }
    )

    confirm_new_password = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={
            'required': 'Confirm new password is required.'
        }
    )

    def validate(self, data):
        otp = data.get('otp')
        new_password = data.get('new_password')
        confirm_new_password = data.get('confirm_new_password')

        # Your additional validation logic for OTP can be added here

        # Check if new password and confirm new password match
        if new_password != confirm_new_password:
            raise serializers.ValidationError(
                "New password and confirm new password must match.")

        return data
