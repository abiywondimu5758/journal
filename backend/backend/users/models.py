# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    birth_date = models.DateField(null=True, blank=True)
    
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    otp_secret = models.CharField(max_length=16, blank=True, null=True)
    otp_forgot_pass = models.CharField(max_length=16, blank=True, null=True)
    otp_enabled = models.BooleanField(default=False)
    otp_validated = models.BooleanField(default=False)
    otp_forgot_pass_validated = models.BooleanField(default=False)
    # Add any other custom fields you need

    class Meta:
        permissions = [
            # Define any custom permissions if needed
        ]

    # Add related_query_name to avoid clashes with auth.User
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        related_query_name='user',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        related_query_name='user',
        blank=True,
    )
