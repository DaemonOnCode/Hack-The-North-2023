from django.urls import path

from ner.api.views import FilterApplicantsView

urlpatterns = [
    path(r"filter-applicants/", FilterApplicantsView.as_view()),

]
