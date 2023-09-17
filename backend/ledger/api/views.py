import requests
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserProfile


class VerifyCandidateBackground(APIView):
    def post(self, request, *args, **kwargs):
        candidate_id = request.data.get("user")
        candidate_blockchain_wallet_id = UserProfile.objects.get(user_id=candidate_id).blockchain_wallet_id
        company_blockchain_wallet_id = request.user.profile.company.blockchain_wallet_id
        response = requests.post("https://api.onehirehub.tech/blockchain/get-candidate-data-by-company",
                                 data={"candidateAddress": candidate_blockchain_wallet_id,
                                       "companyAddress": company_blockchain_wallet_id})
        return Response(data=response.json())
