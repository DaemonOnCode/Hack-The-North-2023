from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from accounts.api.permissions import IsRecruiter
from employees.api.serializers import EmployeeDetailsSerializer, EmployeeReviewsSerializer
from employees.models import EmployeeDetails, EmployeeReviews


class EmployeeDetailsViewSet(CreateModelMixin, RetrieveModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated, IsRecruiter,)
    serializer_class = EmployeeDetailsSerializer
    queryset = EmployeeDetails.objects.all()


class EmployeeReviewsViewSet(CreateModelMixin, RetrieveModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated, IsRecruiter,)
    serializer_class = EmployeeReviewsSerializer
    queryset = EmployeeReviews.objects.all()
