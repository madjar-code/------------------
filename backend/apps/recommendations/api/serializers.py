from rest_framework.serializers import ModelSerializer
from recommendations.models import *


class RCSerializer(ModelSerializer):
    class Meta:
        fields = (
          '__all__'
        )
        model = RecommendationCategory
