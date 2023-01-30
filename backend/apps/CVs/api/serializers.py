from rest_framework.serializers import\
    ModelSerializer, SerializerMethodField
from common.utils import transform_date
from CVs.models import *


class ValidateEducationSerializer(ModelSerializer):
    class Meta:
        fields = (
            'university',
            'faculty',
            'speciality',
            'start_year',
            'level',
            'end_year',
            'until_now_flag',
        )
        model = Education


class ValidateJobSerializer(ModelSerializer):
    class Meta:
        fields = (
            'company',
            'position',
            'start_date',
            'end_date',
            'until_now_flag'
        )
        model = Job


class CreateEducationSerializer(ModelSerializer):
    class Meta:
        fields = (
            'university',
            'faculty',
            'speciality',
            'start_year',
            'level',
            'end_year',
            'until_now_flag',
            'CV'
        )
        model = Education


class CreateJobSerializer(ModelSerializer):
    class Meta:
        fields = (
            'company',
            'position',
            'start_date',
            'end_date',
            'until_now_flag',
            'external_CV_link',
            'CV',
        )
        model = Job


class JobLinkSerializer(ModelSerializer):
    class Meta:
        fields = (
            'external_CV_link',
        )
        model = Job


class SimpleCVSerializer(ModelSerializer):
    creation_date = SerializerMethodField()

    def get_creation_date(self, obj):
        return transform_date(obj.created_at)

    class Meta:
        model = CV
        fields = (
            'id',
            'title',
            'creation_date'
        )
        

class CVSerializer(ModelSerializer):
    
    class Meta:
        fields = (
            'id',
            'first_name',
            'last_name',
            'birthday',
            'sex',
            'contact_email',
            'contact_phone',
            'user'
        )
        model = CV


class AllCVDataSerializer(ModelSerializer):
    educations = ValidateEducationSerializer(many=True)
    jobs = ValidateJobSerializer(many=True)
    birthday = SerializerMethodField()

    def get_birthday(self, obj):
        return transform_date(obj.birthday)

    class Meta:
        fields = '__all__'
        model = CV