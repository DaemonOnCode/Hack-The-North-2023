from django.db import models
from django_extensions.db.models import TimeStampedModel


class AnalyticsQueries(TimeStampedModel):
    question = models.TextField()
    examples = models.TextField()
    answer = models.TextField()
    display_prompt = models.TextField()
