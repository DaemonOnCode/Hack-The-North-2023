from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django_extensions.db.models import TimeStampedModel

from accounts.models import Company, USER_TYPE_CANDIDATE

User = get_user_model()


class EmployeeReviews(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

    def clean(self):
        if self.user.profile.user_type != USER_TYPE_CANDIDATE:
            raise ValidationError("Invalid employee review user type")


class EmployeeDetails(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    hired_on = models.DateTimeField(auto_now=True)
    discharged_on = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def clean(self):
        if self.user.profile.user_type != USER_TYPE_CANDIDATE:
            raise ValidationError("Invalid employee detail user type")