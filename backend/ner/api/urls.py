from django.urls import path
from rest_framework.routers import SimpleRouter

from ner.api.views import FilterApplicantsView, AnalyticsQueriesViewSet

router = SimpleRouter()
router.register(r"analytics-filters", AnalyticsQueriesViewSet, basename="analytics-filter")
urlpatterns = router.urls + [
    path(r"filter-applicants/", FilterApplicantsView.as_view()),

]
