from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django_extensions.db.models import TimeStampedModel

from accounts.models import USER_TYPE_CANDIDATE, Company, USER_TYPE_RECRUITER

User = get_user_model()


class Jobs(TimeStampedModel):
    title = models.CharField(max_length=256)
    description = models.TextField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def clean(self):
        if self.posted_by.profile.user_type != USER_TYPE_RECRUITER:
            raise ValidationError("Invalid posted by user type")


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
    resume = models.FileField()

    class Meta:
        unique_together = (('job', 'user',),)

    def clean(self):
        if self.user.profile.user_type != USER_TYPE_CANDIDATE:
            raise ValidationError("Invalid job applicant user type")
