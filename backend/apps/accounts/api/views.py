from rest_framework import status
from rest_framework.generics import \
    GenericAPIView, RetrieveUpdateAPIView,\
    UpdateAPIView
from rest_framework.permissions import\
    AllowAny, IsAuthenticated
from rest_framework.parsers import \
    MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from accounts.utils import Util

from .serializers import *


class RegisterAPIView(GenericAPIView):
    """
    API view for register user
    """
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(GenericAPIView):
    """
    API view for login user
    """
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserAPIView(RetrieveUpdateAPIView):
    """
    API view for getting some user by slug field 
    """
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'


class CurrentUserAPIView(RetrieveUpdateAPIView):
    """
    API view for work with current user
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})

        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(GenericAPIView):
    serializer_class = PasswordResetSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.data['email']
        new_password = serializer.data['new_password']

        user = User.objects.get(email=email)
    
        email_body =\
            f"""Здравствуйте, перейдите
            по данной ссылке для смены
            пароля:"""

        data = {
            'email_body': email_body,
            'to_email': email,
            'email_subject': 'Восстановите пароль'
        }

        Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
    

class ChangePasswordView(UpdateAPIView):
    """
    An endpoint for changing password.
    """
    model = User
    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            error_response = {}
            if not self.object.check_password(serializer.data.get("old_password")):
                error_response = {"old_password": "Неверный пароль"}
            if serializer.data.get("new_password") != serializer.data.get("new_password2"):
                error_response = error_response | {"new_password": "Несовпадение паролей"}
        
            if error_response != {}:
                return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response({"empty_fields_error": "Поля обязательны к заполнению"}, status=status.HTTP_400_BAD_REQUEST)


class ChangeEmailView(UpdateAPIView):
    """
    An endpoint for changing email.
    """
    model = User
    serializer_class = ChangeEmailSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        # if serializer.is_valid():
        error_response = {}

        new_email = serializer.data.get('new_email')
        if User.objects.filter(email=new_email).exists():
            error_response = {'new_email': 'Такая почта уже есть'}
        if self.object.email != serializer.data.get('old_email'):
            error_response = {'old_email': 'Неверная почта'}
        elif not self.object.check_password(serializer.data.get("password")):
            error_response = {"password": "Неверный пароль"}
    
        if error_response != {}:
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

        self.object.email = serializer.data.get('new_email')
        self.object.save()
        response = {
            'status': 'success',
            'code': status.HTTP_200_OK,
            'message': 'Email updated successfully',
            'data': []
        }

        return Response(response)
        # return Response({"empty_fields_error": "Некорректные данные"}, status=status.HTTP_400_BAD_REQUEST)