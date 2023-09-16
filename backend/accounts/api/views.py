from rest_framework.authtoken.models import Token
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.viewsets import GenericViewSet

from accounts.api.serializers import CandidateProfileSerializer, RecruiterProfileSerializer
from accounts.models import UserProfile, USER_TYPE_CANDIDATE, USER_TYPE_RECRUITER


class CandidateProfileViewSet(CreateModelMixin, RetrieveModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = CandidateProfileSerializer
    queryset = UserProfile.objects.filter(user_type=USER_TYPE_CANDIDATE)
    lookup_field = "id"

    def get_permissions(self):
        """
        Get permissions for different viewset methods
        """
        if self.request.method == 'POST':
            return [AllowAny()]
        else:
            return super().get_permissions()

    def create(self, request, *args, **kwargs):
        """
        Create candidate
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        token = Token.objects.create(user=serializer.instance.user)
        response_data = serializer.data
        response_data['auth_token'] = token.key
        return Response(data=response_data, status=HTTP_201_CREATED)


class RecruiterProfileViewSet(CreateModelMixin, RetrieveModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = RecruiterProfileSerializer
    queryset = UserProfile.objects.filter(user_type=USER_TYPE_RECRUITER)
    lookup_field = "id"

    def get_permissions(self):
        """
        Get permissions for different viewset methods
        """
        if self.request.method == 'POST':
            return [AllowAny()]
        else:
            return super().get_permissions()

    def create(self, request, *args, **kwargs):
        """
        Create recruiters
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        token = Token.objects.create(user=serializer.instance.user)
        response_data = serializer.data
        response_data['auth_token'] = token.key
        return Response(data=response_data, status=HTTP_201_CREATED)
