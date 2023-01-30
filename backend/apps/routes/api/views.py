from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import\
    ListAPIView, RetrieveAPIView,\
    CreateAPIView, DestroyAPIView
from rest_framework.parsers import\
    MultiPartParser, FormParser, JSONParser
from routes.models import *
from .serializers import *


class RouteListView(ListAPIView):
    serializer_class = SimpleRouteSerializer
    queryset = Route.objects.filter(is_active=True)


class RouteForCurrentUser(ListAPIView):
    serializer_class = SimpleRouteSerializer
    queryset = Route.objects.filter(is_active=True)

    def get(self, request):
        """
        Getting routes for current user
        """
        user = request.user
        routes = self.queryset.filter(user=user)
        serializer = self.serializer_class(routes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RouteDetailsView(RetrieveAPIView):
    serializer_class = RouteDetailsSerializer
    queryset = Route.objects.filter(is_active=True)
    lookup_field = 'id'


class DeleteRouteView(DestroyAPIView):
    serializer_class = SimpleRouteSerializer
    queryset = Route.objects.filter(is_active=True)
    lookup_field = 'id'


class CreateRouteView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = CreateRouteSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RTListView(ListAPIView):
    serializer_class = RouteTypeSerializer
    queryset = RouteType.objects.filter(is_active=True)


class TargetListView(ListAPIView):
    serializer_class = TargetSerializer
    queryset = Target.objects.filter(is_active=True)
