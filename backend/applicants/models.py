from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import CheckConstraint, Q
from django_extensions.db.models import TimeStampedModel

from accounts.models import USER_TYPE_CANDIDATE

User = get_user_model()


class ApplicantProfile(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.FileField()
    # we can preprocess the resume and store some metadata here

    class Meta:
        constraints = [
            CheckConstraint(check=Q(user__user_type=USER_TYPE_CANDIDATE), name="applicant_must_be_candidate_check")]