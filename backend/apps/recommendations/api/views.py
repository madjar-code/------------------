from rest_framework import status
from rest_framework.generics import\
    ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from recommendations.models import *
from .serializers import *



class RCListView(ListAPIView):
    serializer_class = RCSerializer
    queryset = RecommendationCategory.objects.filter(is_active=True)


class RecommendationListView(ListAPIView):
    serializer_class = RecommendationSerializer
    queryset = Recommendation.objects.filter(is_active=True)


class PRForCurrentUser(ListAPIView):
    serializer_class = PRSerializer
    queryset = PersonalRecommendation.objects.filter(is_active=True)

    def get(self, request):
        user = request.user
        personal_recommendations = self.queryset.filter(user=user)
        serializer = self.serializer_class(personal_recommendations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PRDetails(RetrieveAPIView):
    serializer_class = PRSerializer
    queryset = PersonalRecommendation.objects.all()
    lookup_field = 'id'


class GetActualAPIView(ListAPIView):
    serializer_class = PRSerializer
    queryset = PersonalRecommendation.objects.filter(is_active=True)

    def get(self, request):
        user = request.user
        personal_recommendations = self.queryset.filter(user=user, favorites_flag=True)
        serializer = self.serializer_class(personal_recommendations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)