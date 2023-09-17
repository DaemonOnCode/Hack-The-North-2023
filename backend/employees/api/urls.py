from rest_framework.routers import SimpleRouter

from employees.api.views import EmployeeDetailsViewSet, EmployeeReviewsViewSet

router = SimpleRouter()

router.register(r"reviews", EmployeeReviewsViewSet, "employee-reviews-viewset")
router.register(r"details", EmployeeDetailsViewSet, "employee-details-viewset")

urlpatterns = router.urls
