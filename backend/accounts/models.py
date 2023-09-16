from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import CheckConstraint, Q
from django_extensions.db.models import TimeStampedModel

USER_TYPE_CANDIDATE = "candidate"
USER_TYPE_RECRUITER = "recruiter"


# Adding created and updated timestamps to the user model
class User(AbstractUser, TimeStampedModel):
    pass


class Company(TimeStampedModel):
    name = models.CharField(max_length=64)
    blockchain_wallet_id = models.CharField(max_length=64, unique=True)


class UserProfile(TimeStampedModel):
    USER_TYPE_CHOICES = (
        (USER_TYPE_CANDIDATE, "Candidate"),
        (USER_TYPE_RECRUITER, "Recruiter")
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(choices=USER_TYPE_CHOICES, max_length=10)
    blockchain_wallet_id = models.CharField(null=True, blank=True, max_length=64, unique=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(Q(type=USER_TYPE_RECRUITER, blockchain_wallet_id__isnull=True) | Q(type=USER_TYPE_CANDIDATE,
                                                                                           blockchain_wallet_id__isnull=False)),
                name="blockchain_wallet_id_check",
            ),
            CheckConstraint(
                check=Q(Q(type=USER_TYPE_CANDIDATE, company__isnull=True) | Q(type=USER_TYPE_RECRUITER,
                                                                              company__isnull=False)),
                name="company_check",
            )
        ]
