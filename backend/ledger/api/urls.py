from django.urls import path

from ledger.api.views import VerifyCandidateBackground

urlpatterns = [
    path(r"verify/", VerifyCandidateBackground.as_view()),

]
