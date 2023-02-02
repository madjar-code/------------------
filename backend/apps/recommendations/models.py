from django.db import models
from common.models import TimeStampedModel
from accounts.models import User


class RecommendationCategory(TimeStampedModel):
    id = models.PositiveIntegerField(
        db_index=True, unique=True, primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='RCs/', blank=True)
  
    class Meta:
        verbose_name_plural = 'Recommendation categories'

    def __str__(self):
        return f'{self.title} <-> {self.description}'


class Recommendation(TimeStampedModel):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(
        to=RecommendationCategory, on_delete=models.PROTECT)
    brief = models.CharField(max_length=255)
    html_code = models.TextField(blank=True)

    def __str__(self):
        return self.title


class PersonalRecommendation(TimeStampedModel):
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE,
        related_name='recommendations')
    recommendation = models.ForeignKey(
        to=Recommendation, on_delete=models.CASCADE)
    favorites_flag = models.BooleanField(default=False)
    reason = models.CharField(max_length=255, blank=True)
  
    def __str__(self):
        return f'{self.user} <-> {self.reason}'
