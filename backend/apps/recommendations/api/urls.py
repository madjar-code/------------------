from django.urls import path
from .views import *


app_name = 'recommendations'

urlpatterns = [
    path('categories/', RCListView.as_view(), name='category-list'),
    path('p-r/', PRForCurrentUser.as_view(), name='p-r-list'),
    path('p-r/<int:id>', PRDetails.as_view(), name='p-r-detail'),
    path('p-r/actual/', GetActualAPIView.as_view(), name='p-r-actual'),
]