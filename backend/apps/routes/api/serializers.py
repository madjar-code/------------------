from rest_framework.serializers import\
    ModelSerializer, SerializerMethodField
from common.utils import transform_date
from routes.models import *


class CreateRouteSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = (
            'id',
            'title',
            'user',
            'CV',
            'route_type',
            'target',
            )


class SimpleRouteSerializer(ModelSerializer):
    creation_date = SerializerMethodField()

    def get_creation_date(self, obj):
        return transform_date(obj.created_at)

    class Meta:
        model = Route
        fields = (
            'id',
            'creation_date',
            'title',
        )


class RouteDetailsSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = ('__all__')


class RouteTypeSerializer(ModelSerializer):
    class Meta:
        model = RouteType
        fields = ('__all__')


class TargetSerializer(ModelSerializer):
    class Meta:
        model = Target
        fields = ('__all__')
