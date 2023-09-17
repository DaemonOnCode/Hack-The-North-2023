from rest_framework import serializers

from accounts.api.serializers import UserSerializer
from jobs.models import Jobs, JobApplications


class JobsSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer(read_only=True)

    class Meta:
        model = Jobs
        fields = ("id", "title", "description", "posted_by")

    def create(self, validated_data):
        request = self.context['request']
        recruiter = request.user
        validated_data['posted_by'] = recruiter
        validated_data['company'] = recruiter.profile.company
        return super().create(validated_data)


class JobApplicationsSerializer(serializers.ModelSerializer):
    job_id = serializers.PrimaryKeyRelatedField(queryset=Jobs.objects.all(), source="job", write_only=True)
    job = JobsSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = JobApplications
        fields = ("id", "job", "resume", "user", "job_id",)
        read_only_fields = ("status",)

    def create(self, validated_data):
        request = self.context['request']
        user = request.user
        validated_data['user'] = user
        return super().create(validated_data)


class JobApplicantSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="user.id", read_only=True)
    first_name = serializers.CharField(read_only=True, source="user.first_name")
    last_name = serializers.CharField(read_only=True, source="user.last_name")
    email = serializers.CharField(read_only=True, source="user.email")
    user_type = serializers.CharField(read_only=True, source="user.profile.user_type")

    class Meta:
        model = JobApplications
        fields = ("id", "first_name", "last_name", "email", "user_type", "resume",)
