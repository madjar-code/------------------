from django.urls import path
from .views import *


app_name = 'CVs'

urlpatterns = [
    path('CVs/', CVListView.as_view(), name='CV-list'),
    path('CVs/current/', CVListView.as_view(), name='CV-list-current'),
    path('CVs/delete/<int:id>', DeleteCVView.as_view(), name='CV-delete'),
    path('CVs/validate/', ValidateCVView.as_view(), name='CV-validate'),
    path('edu/validate/', ValidateEducationView.as_view(), name='edu-validate'),
    path('jobs/validate/', ValidateJobView.as_view(), name='job-validate'),
    path('CVs/create/', CreateCVView.as_view(), name='CV-create'),
    path('edu/create/', CreateEducationView.as_view(), name='edu-create'),
    path('jobs/create/', CreateJobView.as_view(), name='job-create'),
    path('jobs/link/validate/', ValidateJobLinkView.as_view(), name='job-validate'),
    path('CVs/<int:id>/', CVDetails.as_view(), name='CV-details'),
]