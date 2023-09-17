from rest_framework import serializers

from ner.models import AnalyticsQueries


class AnalyticsQueriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsQueries
        fields = ("id", "display_prompt",)