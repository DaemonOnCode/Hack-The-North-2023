import logging

from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.fields import empty
from rest_framework.serializers import ModelSerializer

from accounts.models import UserProfile, USER_TYPE_CANDIDATE, Company, USER_TYPE_RECRUITER

User = get_user_model()
logger = logging.getLogger(__name__)


class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = ("id", "name", "blockchain_wallet_id",)


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email",)


class CandidateProfileSerializer(ModelSerializer):
    id = serializers.IntegerField(source="user.id", read_only=True)
    first_name = serializers.CharField(max_length=150, source="user.first_name", required=True)
    last_name = serializers.CharField(max_length=150, source="user.last_name", required=False, default="")
    email = serializers.EmailField(source="user.email", required=True)
    password = serializers.CharField(max_length=128, source="user.password", write_only=True)

    class Meta:
        model = UserProfile
        fields = ("id", "first_name", "last_name", "email", "user_type", "blockchain_wallet_id", "password")
        read_only_fields = ("user_type",)
        extra_kwargs = {
            'blockchain_wallet_id': {'write_only': True, "required": True}
        }

    @transaction.atomic
    def create(self, validated_data):
        """
        Create candidate user and profile
        """
        user_details = validated_data.pop("user")
        password = user_details.pop("password")
        user = User.objects.create(**user_details)
        user.set_password(password)
        user.save()
        validated_data['user'] = user
        validated_data['user_type'] = USER_TYPE_CANDIDATE
        return super().create(validated_data)


class RecruiterProfileSerializer(ModelSerializer):
    id = serializers.IntegerField(source="user.id", read_only=True)
    first_name = serializers.CharField(source="user.first_name", required=True, max_length=150)
    last_name = serializers.CharField(source="user.last_name", required=False, max_length=150, default="")
    email = serializers.CharField(source="user.email", required=True)
    company = CompanySerializer(read_only=True)
    company_name = serializers.CharField(max_length=64, source="company.name", required=True, write_only=True)
    company_blockchain_wallet_id = serializers.CharField(max_length=64, source="company.blockchain_wallet_id",
                                                         write_only=True, required=True)
    password = serializers.CharField(max_length=128, source="user.password", write_only=True)

    class Meta:
        model = UserProfile
        fields = ("id", "first_name", "last_name", "email", "user_type", "company_name", "company_blockchain_wallet_id",
                  "company", "password",)
        read_only_fields = ("user_type",)

    @transaction.atomic
    def create(self, validated_data):
        """
        Create recruiter user and profile
        """
        user_details = validated_data.pop("user")
        password = user_details.pop("password")
        print(password)
        user = User.objects.create(**user_details)
        user.set_password(password)
        user.save()
        company_details = validated_data.pop("company")
        company, _ = Company.objects.get_or_create(name=company_details['name'], defaults={
            "blockchain_wallet_id": company_details['blockchain_wallet_id']})
        validated_data['company'] = company
        validated_data['user'] = user
        validated_data['user_type'] = USER_TYPE_RECRUITER
        return super().create(validated_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(max_length=128, required=True)

    def __init__(self, instance=None, data=empty, **kwargs):
        super().__init__(instance, data, **kwargs)
        self.user = None

    def get_user_queryset(self):
        raise NotImplementedError

    def validate(self, attrs):
        """
        Check
        - if the payload is valid
        - if a user wih the given email exists
        - if the password is correct
        """
        attrs = super().validate(attrs)
        try:
            self.user = self.get_user_queryset().get(email=attrs["email"])
        except User.DoesNotExist:
            raise ValidationError("Invalid email")
        else:
            print(attrs['password'])
            if not self.user.check_password(attrs['password']):
                raise ValidationError("Invalid password")
        return attrs


class CandidateLoginSerializer(UserLoginSerializer):
    def get_user_queryset(self):
        return User.objects.filter(profile__user_type=USER_TYPE_CANDIDATE)


class RecruiterLoginSerializer(UserLoginSerializer):
    def get_user_queryset(self):
        return User.objects.filter(profile__user_type=USER_TYPE_RECRUITER)
