from django.urls import path
from .views import *


app_name = 'routes'

urlpatterns = [
    path('', RouteListView.as_view(), name='routes'),
    path('route-types/', RTListView.as_view(), name='types-list'),
    path('targets/', TargetListView.as_view(), name='target-list'),
    path('create/', CreateRouteView.as_view(), name='create-route'),
    path('delete/<int:id>', DeleteRouteView.as_view(), name='delete-route'),
    path('current/', RouteForCurrentUser.as_view(), name='current-route'),
    path('<int:id>/', RouteDetailsView.as_view(), name='route-detail'),
]