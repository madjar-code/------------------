from rest_framework import serializers
from rest_framework.serializers import\
    ModelSerializer, Serializer
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from accounts.models import User


class RegisterSerializer(ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=2, write_only=True)
  
    class Meta:
        model=User
        fields = (
            'email',
            'first_name',
            'last_name',
            'password'
        )

    def validate(self, attrs):
        email = attrs.get('email', '')
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3, write_only=True)
    password = serializers.CharField(max_length=68, min_length=2, write_only=True)
    access = serializers.CharField(max_length=68, min_length=6, read_only=True)
    refresh = serializers.CharField(max_length=68, min_length=6, read_only=True)

    class Meta:
        model = User
        fields = (
            'email',
            'password',
            'access',
            'refresh'
        )

    def validate(self, attrs):
        """During validation, authentication occurs on the backend"""
        email = attrs.get('email', '')
        password = attrs.get('password', '')

        user = auth.authenticate(email=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')

        return {
            'access': user.tokens()['access'],
            'refresh': user.tokens()['refresh']}


class SimpleUserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'password',
        )

        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'password',
            'first_name',
            'last_name',
            'avatar'
        )
        read_only_fields = (
            'email',
        )
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class PasswordResetSerializer(Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(max_length=128)
    
    class Meta:
        fields = ('email', 'new_password')
    
    def validate(self, attrs):
        email = attrs.get('email', '')

        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError('Введена неверная почта!')

        
        return super().validate(attrs)


class ChangePasswordSerializer(Serializer):
    model = User

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)


class ChangeEmailSerializer(Serializer):
    model = User

    password = serializers.CharField(required=True)
    old_email = serializers.EmailField(required=True)
    new_email = serializers.EmailField(required=True)
