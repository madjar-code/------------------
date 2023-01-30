from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('current/', CurrentUserAPIView.as_view(), name='current_user'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('change_email/', ChangeEmailView.as_view(), name='change_email'),
    path('<int:id>/', UserAPIView.as_view(), name='some_user'),
]