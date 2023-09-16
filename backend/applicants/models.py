from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django_extensions.db.models import TimeStampedModel

from accounts.models import USER_TYPE_CANDIDATE

User = get_user_model()


class ApplicantProfile(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.FileField()

    # we can preprocess the resume and store some metadata here

    def clean(self):
        if self.user.user_type != USER_TYPE_CANDIDATE:
            raise ValidationError("Invalid applicant profile user type")
