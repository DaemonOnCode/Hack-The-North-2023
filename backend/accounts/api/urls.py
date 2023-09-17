from rest_framework.routers import SimpleRouter

from accounts.api.views import CandidateProfileViewSet, RecruiterProfileViewSet

router = SimpleRouter()

router.register(r"candidates", CandidateProfileViewSet, "candidates-viewset")
router.register(r"recruiters", RecruiterProfileViewSet, "recruiters-viewset")

urlpatterns = router.urls
