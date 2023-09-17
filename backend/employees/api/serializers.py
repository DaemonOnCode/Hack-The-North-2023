from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.api.serializers import CompanySerializer
from accounts.models import USER_TYPE_CANDIDATE, Company
from employees.models import EmployeeDetails, EmployeeReviews

User = get_user_model()


class EmployeeDetailsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(profile__user_type=USER_TYPE_CANDIDATE),
                                              required=True, write_only=True)
    company = CompanySerializer(read_only=True)
    discharged_on = serializers.DateTimeField(required=False)

    class Meta:
        model = EmployeeDetails
        fields = ("id", "user", "company", "discharged_on", "is_active",)
        read_only_field = ("hired_on",)

    def create(self, validated_data):
        recruiter = self.context['request'].user
        company = recruiter.profile.company
        validated_data['company'] = company
        return super().create(validated_data)


class EmployeeReviewsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(profile__user_type=USER_TYPE_CANDIDATE))
    score = serializers.IntegerField(required=True)

    class Meta:
        model = EmployeeReviews
        fields = ("id", "user", "score",)
