from django.db import models
from django_extensions.db.models import TimeStampedModel


class Transactions(TimeStampedModel):
    EMPLOYEE_HIRED = "employee_hired"
    EMPLOYEE_DISCHARGED = "employee_discharged"
    EMPLOYEE_REVIEWED = "employee_reviewed"

    TRANSACTION_TYPE_CHOICES = [
        (EMPLOYEE_HIRED, "Employee Hired"),
        (EMPLOYEE_DISCHARGED, "Employee Discharged"),
        (EMPLOYEE_REVIEWED, "Employee Reviewed"),
    ]

    transaction_type = models.CharField(choices=TRANSACTION_TYPE_CHOICES, max_length=32)
    blockchain_transaction_id = models.CharField(max_length=64)
    company_wallet_id = models.CharField(max_length=64)
    candidate_wallet_id = models.CharField(max_length=64)
    gas_fee = models.FloatField()  # eth
