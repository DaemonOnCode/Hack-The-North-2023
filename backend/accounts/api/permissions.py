from rest_framework.permissions import BasePermission

from accounts.models import USER_TYPE_RECRUITER


class IsRecruiter(BasePermission):
    """
    Allows access only to recruiters users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.user_type == USER_TYPE_RECRUITER)
