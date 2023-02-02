from rest_framework.serializers import\
    ModelSerializer, SerializerMethodField
from recommendations.models import *


class RCSerializer(ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'description',
            'image',
        )
        model = RecommendationCategory


class SimpleRecommendationSerializer(ModelSerializer):
    image = SerializerMethodField()

    def get_image(self, obj):
        return obj.category.image

    class Meta:
        fields = (
            'id',
            'image',
            'category',
        )
        model = Recommendation


class RecommendationSerializer(ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'category',
            'brief',
            'html_code',
        )
        model = Recommendation


class PRSerializer(ModelSerializer):
    recommendation = SimpleRecommendationSerializer()
    title = SerializerMethodField()
    description = SerializerMethodField()
    image = SerializerMethodField()
    html_code = SerializerMethodField()

    def get_title(self, obj):
        return obj.recommendation.title

    def get_description(self, obj):
        return obj.recommendation.brief

    def get_image(self, obj):
        return obj.recommendation.category.image.url
    
    def get_html_code(self, obj):
        return obj.recommendation.html_code

    class Meta:
        fields = (
            'id',
            'recommendation',
            'favorites_flag',
            'title',
            'description',
            'image',
            'user',
            'reason',
            'html_code',
        )
        model = PersonalRecommendation