from rest_framework.routers import SimpleRouter

from jobs.api.views import JobApplicationsViewSet, JobsViewSet

router = SimpleRouter()

router.register(r"applications", JobApplicationsViewSet, "job-applications-viewset")
router.register(r"", JobsViewSet, "jobs-viewset")

urlpatterns = router.urls
