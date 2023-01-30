from rest_framework.generics import\
    ListAPIView
from .serializers import *
from recommendations.models import RecommendationCategory


class RCListView(ListAPIView):
    serializer_class = RCSerializer
    queryset = RecommendationCategory.objects.filter(is_active=True)
