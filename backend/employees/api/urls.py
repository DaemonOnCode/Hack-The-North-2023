from rest_framework.routers import SimpleRouter

from employees.api.views import EmployeeDetailsViewSet, EmployeeReviewsViewSet

router = SimpleRouter()

router.register(r"", EmployeeDetailsViewSet, "employee-details-viewset")
router.register(r"reviews", EmployeeReviewsViewSet, "employee-reviews-viewset")

urlpatterns = router.urls
