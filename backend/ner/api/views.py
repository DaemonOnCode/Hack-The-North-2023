from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from accounts.api.permissions import IsRecruiter
from jobs.api.serializers import JobApplicationsSerializer
from jobs.models import JobApplications
from ner.api.serializer import AnalyticsQueriesSerializer
from ner.models import AnalyticsQueries
from ner.utils import analyse_resume


class FilterApplicantsView(APIView):
    permission_classes = (IsAuthenticated, IsRecruiter,)

    def get(self, request, *args, **kwargs):
        job_id = request.GET.get("job_id")
        analytics_query_id = request.GET.get("analytics_query_id")
        job_applications = JobApplications.objects.select_related("user").filter(job_id=job_id)
        analytics_query = AnalyticsQueries.objects.get(id=analytics_query_id)
        filtered_applications = list(
            filter(lambda x: analyse_resume(x.resume_transcript, analytics_query), job_applications))
        return JobApplicationsSerializer(instance=filtered_applications, many=True)


class AnalyticsQueriesViewSet(ListModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated, IsRecruiter,)
    serializer_class = AnalyticsQueriesSerializer
    queryset = AnalyticsQueries.objects.all()
