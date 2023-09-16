from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import CheckConstraint, Q
from django_extensions.db.models import TimeStampedModel

from accounts.models import Company, USER_TYPE_CANDIDATE

User = get_user_model()


class EmployeeReviews(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

    class Meta:
        constraints = [
            CheckConstraint(check=Q(user__user_type=USER_TYPE_CANDIDATE),
                            name="employee_in_review_must_be_candidate_check")]


class EmployeeDetails(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    hired_on = models.DateTimeField(null=True, blank=True)
    discharged_on = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        constraints = [
            CheckConstraint(check=Q(user__user_type=USER_TYPE_CANDIDATE), name="employee_must_be_candidate_check")]
