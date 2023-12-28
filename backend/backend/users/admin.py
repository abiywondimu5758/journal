# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['id', 'username', 'email', 'birth_date', 'is_staff']  # Add any other fields you want to display

# Register your custom admin class
admin.site.register(User, CustomUserAdmin)
