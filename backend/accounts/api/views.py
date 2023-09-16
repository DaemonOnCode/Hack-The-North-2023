from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.viewsets import GenericViewSet

from accounts.api.permissions import IsRecruiter, IsCandidate
from accounts.api.serializers import CandidateProfileSerializer, RecruiterProfileSerializer, CandidateLoginSerializer, \
    RecruiterLoginSerializer
from accounts.models import UserProfile, USER_TYPE_CANDIDATE, USER_TYPE_RECRUITER


class CandidateProfileViewSet(RetrieveModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated, IsCandidate,)
    serializer_class = CandidateProfileSerializer
    queryset = UserProfile.objects.filter(user_type=USER_TYPE_CANDIDATE)
    lookup_field = "id"

    def get_serializer_class(self):
        if self.action == "login":
            return CandidateLoginSerializer
        else:
            return super().get_serializer_class()

    @action(detail=False, methods=["POST"], permission_classes=(), url_path="signup")
    def signup(self, request, *args, **kwargs):
        """
        Signup candidate
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        token = Token.objects.create(user=serializer.instance.user)
        response_data = serializer.data
        response_data['auth_token'] = token.key
        return Response(data=response_data, status=HTTP_201_CREATED)

    @action(detail=False, methods=["POST"], permission_classes=(), url_path="login")
    def login(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        token, _ = Token.objects.get_or_create(user=user)
        response_data = self.serializer_class(user.profile).data
        response_data['auth_token'] = token.key
        return Response(data=response_data)


class RecruiterProfileViewSet(RetrieveModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated, IsRecruiter,)
    serializer_class = RecruiterProfileSerializer
    queryset = UserProfile.objects.filter(user_type=USER_TYPE_RECRUITER)
    lookup_field = "id"

    def get_serializer_class(self):
        if self.action == "login":
            return RecruiterLoginSerializer
        else:
            return super().get_serializer_class()

    @action(detail=False, methods=["POST"], permission_classes=(), url_path="signup")
    def signup(self, request, *args, **kwargs):
        """
        Signup recruiters
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        token = Token.objects.create(user=serializer.instance.user)
        response_data = serializer.data
        response_data['auth_token'] = token.key
        return Response(data=response_data, status=HTTP_201_CREATED)

    @action(detail=False, methods=["POST"], permission_classes=(), url_path="login")
    def login(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        token, _ = Token.objects.get_or_create(user=user)
        response_data = self.serializer_class(user.profile).data
        response_data['auth_token'] = token.key
        return Response(data=response_data)
