from rest_framework.permissions import BasePermission
from rest_framework import permissions


class IsPublicOrIsAuthenticated(BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user.is_authenticated:
            return True
        elif request.method not in permissions.SAFE_METHODS:
            return False


    def has_object_permission(self, request, view, obj):
        # if obj.title == 'title2' or request.method not in permissions.SAFE_METHODS:
        #     return False
        # # Allow if the entry is public and the request is a safe method (GET, HEAD, OPTIONS)
        # elif obj.title == 'title5' and request.method in permissions.SAFE_METHODS:
        #     return True
        # # Allow if the request is from the creator of the entry
        # if obj.user == request.user:
        #     return True
        # Deny for private entries and for non-creators attempting unsafe methods
        return obj.user == request.user
