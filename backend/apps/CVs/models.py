import datetime
from django.db import models
from django.core.validators import\
    RegexValidator, MaxValueValidator, MinValueValidator
from accounts.models import User
from common.models import TimeStampedModel


class CV(TimeStampedModel):
    SEX = (
        ('Мужской', 'Мужской'),
        ('Женский', 'Женский')
    )

    title = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    birthday = models.DateField()
    sex = models.CharField(choices=SEX, max_length=10)
    contact_email = models.EmailField(max_length=255, null=True, blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    contact_phone = models.CharField(validators=[phone_regex], max_length=17, blank=True)

    def __str__(self) -> str:
        return f'{self.user}'
    
    def save(self, *args, **kwargs):
        """Title generation"""
        if not self.title:
            number_of_CVs = CV.objects.filter(user=self.user).count()
            title = f'Анкета {number_of_CVs+1}'
            self.title = title
        super().save(*args, **kwargs)


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


class Education(TimeStampedModel):
    LEVEL = (
        ('Среднее специальное', 'Среднее специальное'),
        ('Высшее', 'Высшее')
    )
    university = models.CharField(max_length=255)
    faculty = models.CharField(max_length=255)
    speciality = models.CharField(max_length=255, blank=True, null=True)
    start_year = models.IntegerField(validators=[MinValueValidator(1900), max_value_current_year])
    end_year = models.IntegerField(validators=[MinValueValidator(1900), max_value_current_year])
    until_now_flag = models.BooleanField(default=False)
    level = models.CharField(max_length=32, choices=LEVEL, blank=False)

    CV = models.ForeignKey(to=CV, on_delete=models.CASCADE, related_name='educations')

    def __str__(self) -> str:
        return f'{self.CV.user} <-> {self.university} <-> {self.faculty}'


class Job(TimeStampedModel):
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    until_now_flag = models.BooleanField(default=False)
  
    CV = models.ForeignKey(to=CV, on_delete=models.CASCADE, related_name='jobs')
    external_CV_link = models.URLField(max_length=512, blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.CV.user} <-> {self.company} <-> {self.position}'
