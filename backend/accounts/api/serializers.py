import logging

from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from accounts.models import UserProfile, USER_TYPE_CANDIDATE, Company, USER_TYPE_RECRUITER

User = get_user_model()
logger = logging.getLogger(__name__)


class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = ("id", "name", "blockchain_wallet_id",)


class CandidateProfileSerializer(ModelSerializer):
    first_name = serializers.CharField(max_length=150, source="user.first_name", required=True)
    last_name = serializers.CharField(max_length=150, source="user.last_name", required=False, default="")
    email = serializers.EmailField(source="user.email", required=True)
    blockchain_wallet_id = serializers.CharField(write_only=True, required=True)
    user_type = serializers.CharField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ("id", "first_name", "last_name", "email", "user_type", "blockchain_wallet_id")

    @transaction.atomic
    def create(self, validated_data):
        """
        Create candidate user and profile
        """
        user = User.objects.create(first_name=validated_data['user']['first_name'],
                                   last_name=validated_data['user']['last_name'],
                                   email=validated_data['user']['email'])
        user_profile = UserProfile.objects.create(user=user, user_type=USER_TYPE_CANDIDATE,
                                                  blockchain_wallet_id=validated_data['blockchain_wallet_id'])
        return user_profile


class RecruiterProfileSerializer(ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", required=True, max_length=150)
    last_name = serializers.CharField(source="user.last_name", required=False, max_length=150, default="")
    email = serializers.CharField(source="user.email", required=True)
    company = CompanySerializer(read_only=True)
    company_name = serializers.CharField(max_length=64, source="company.name", required=True, write_only=True)
    company_blockchain_wallet_id = serializers.CharField(max_length=64, write_only=True, required=True)
    user_type = serializers.CharField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ("id", "first_name", "last_name", "email", "user_type", "company_name", "company_blockchain_wallet_id",
                  "company",)

    @transaction.atomic
    def create(self, validated_data):
        """
        Create recruiter user and profile
        """
        user = User.objects.create(first_name=validated_data["user"]['first_name'],
                                   last_name=validated_data["user"]['last_name'],
                                   email=validated_data["user"]['email'])
        company, _ = Company.objects.get_or_create(name=validated_data['company']['name'], defaults={
            "blockchain_wallet_id": validated_data['company_blockchain_wallet_id']})
        user_profile = UserProfile.objects.create(user=user, user_type=USER_TYPE_RECRUITER, company=company)
        return user_profile
