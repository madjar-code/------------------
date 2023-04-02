import requests
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import\
    ListAPIView, RetrieveAPIView,\
    CreateAPIView, DestroyAPIView
from rest_framework.parsers import\
    MultiPartParser, FormParser, JSONParser
from routes.services.graph_file import\
    visualize_route_AB
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
    
    CAREER_API = 'http://127.0.0.1:8001/api/v1/careers'

    def post(self, request: Request) -> Response:
        data: dict = request.data
        start_node_id: int = data['start_node']
        end_node_id: int = data['end_node']
        type_code: int = data['route_type']

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        
        POSTFIX: str = ''
        if type_code == 1:
            POSTFIX = f'route-between-{start_node_id}--{end_node_id}'
            response: Response = requests.get(f'{self.CAREER_API}/{POSTFIX}/')
            graph_data: dict = response.json()
            if graph_data['message'] == 'No path':
                return Response({'message': 'No path'}, status.HTTP_400_BAD_REQUEST)

            route_obj: Route = serializer.save()
            list_of_node_ids: list = graph_data['list_of_node_ids']
            id_name_dict: dict = graph_data['id_name_dict']
            route_obj.html_file = visualize_route_AB(list_of_node_ids, id_name_dict)
            route_obj.save()
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RTListView(ListAPIView):
    serializer_class = RouteTypeSerializer
    queryset = RouteType.objects.filter(is_active=True)


class TargetListView(ListAPIView):
    serializer_class = TargetSerializer
    queryset = Target.objects.filter(is_active=True)
