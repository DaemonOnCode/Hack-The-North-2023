from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.models import USER_TYPE_CANDIDATE, Company
from employees.models import EmployeeDetails, EmployeeReviews

User = get_user_model()


class EmployeeDetailsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(profile__user_type=USER_TYPE_CANDIDATE),
                                              required=True)
    company = serializers.PrimaryKeyRelatedField(read_only=True)
    hired_on = serializers.DateTimeField(required=False)
    discharged_on = serializers.DateTimeField(required=False)
    is_active = serializers.BooleanField(required=False)

    class Meta:
        model = EmployeeDetails
        fields = ("id", "user", "company", "hired_on", "discharged_on", "is_active",)

    def create(self, validated_data):
        recruiter = self.context['request'].user
        company = recruiter.company
        validated_data['company'] = company
        return super().create(validated_data)


class EmployeeReviewsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(profile__user_type=USER_TYPE_CANDIDATE))
    score = serializers.IntegerField(required=True)

    class Meta:
        model = EmployeeReviews
        fields = ("id", "user", "score",)
