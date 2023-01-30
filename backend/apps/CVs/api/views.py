from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import \
    ListAPIView, CreateAPIView, \
    RetrieveAPIView, DestroyAPIView
from rest_framework.parsers import \
    MultiPartParser, FormParser, JSONParser
from CVs.models import *
from .serializers import *


class ValidateJobView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = ValidateJobSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ValidateJobLinkView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = JobLinkSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ValidateEducationView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = ValidateEducationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ValidateCVView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = CVSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateCVView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = CVSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CreateEducationView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = CreateEducationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CreateJobView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = CreateJobSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CVDetails(RetrieveAPIView):
    serializer_class = AllCVDataSerializer
    queryset = CV.objects.all()
    lookup_field = 'id'


class CVsForCurrentUser(ListAPIView):
    serializer_class = SimpleCVSerializer
    queryset = CV.objects.all()

    def get(self, request):
        """
        Getting CVs for current user
        """
        user = request.user
        CVs = self.queryset.filter(user=user)
        serializer = self.serializer_class(CVs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteCVView(DestroyAPIView):
    serializer_class = SimpleCVSerializer
    queryset = CV.objects.all()
    lookup_field = 'id'


class CVListView(ListAPIView):
    serializer_class = SimpleCVSerializer
    queryset = CV.objects.all()
