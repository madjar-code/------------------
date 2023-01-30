from django.urls import path
from .views import *


app_name = 'recommendations'

urlpatterns = [
    path('categories/', RCListView.as_view(), name='category-list'),
]