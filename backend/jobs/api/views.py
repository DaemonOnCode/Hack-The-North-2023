from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from accounts.api.permissions import IsRecruiter, IsCandidate
from accounts.models import USER_TYPE_RECRUITER
from jobs.api.serializers import JobsSerializer, JobApplicationsSerializer
from jobs.models import Jobs, JobApplications


class JobsViewSet(CreateModelMixin, RetrieveModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated, IsRecruiter,)
    serializer_class = JobsSerializer
    queryset = Jobs.objects.all()
    lookup_field = "id"

    def get_queryset(self):
        return self.queryset.filter(posted_by__profile__company=self.request.user.profile.company)


class JobApplicationsViewSet(CreateModelMixin, RetrieveModelMixin, ListModelMixin, GenericViewSet):
    serializer_class = JobApplicationsSerializer
    queryset = JobApplications.objects.all()
    lookup_field = "id"

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated(), IsCandidate()]
        elif self.action == "retrieve":
            return [IsAuthenticated()]
        elif self.action == "list":
            return [IsAuthenticated()]

    def get_queryset(self):
        request_user = self.request.user
        user_profile = request_user.profile
        user_type = user_profile.user_type
        # We only have two actions, list and retrieve, which is why we're not filtering on action type
        if user_type == USER_TYPE_RECRUITER:
            return self.queryset.filter(job__company=user_profile.company)
        else:
            return self.queryset.filter(user=request_user)
