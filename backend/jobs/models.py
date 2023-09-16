from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import CheckConstraint, Q
from django_extensions.db.models import TimeStampedModel

from accounts.models import USER_TYPE_CANDIDATE

User = get_user_model()


class Jobs(TimeStampedModel):
    title = models.CharField(max_length=256)


class JobApplications(TimeStampedModel):
    PENDING_REVIEW = "pending_review"
    REVIEWED = "reviewed"
    REJECTED = "rejected"
    ACCEPTED = "accepted"

    STATUS_CHOICES = [
        (PENDING_REVIEW, "Pending Review"),
        (REVIEWED, "Reviewed"),
        (REJECTED, "Rejected"),
        (ACCEPTED, "Accepted")
    ]
    job = models.ForeignKey(Jobs, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(choices=STATUS_CHOICES, default=PENDING_REVIEW, max_length=16)

    class Meta:
        constraints = [
            CheckConstraint(check=Q(user__user_type=USER_TYPE_CANDIDATE), name="job_applicant_must_be_candidate_check")]
