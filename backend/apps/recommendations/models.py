from django.db import models
from common.models import TimeStampedModel
from accounts.models import User


class ReasonType(TimeStampedModel):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class RecommendationCategory(TimeStampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
  
    def __str__(self):
        return self.title


class Recommendation(TimeStampedModel):
    category = models.ForeignKey(
        to=RecommendationCategory, on_delete=models.PROTECT)
    brief = models.CharField(max_length=255)
    html_code = models.TextField()

    def __str__(self):
        return self.brief


class PersonalRecommendation(TimeStampedModel):
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE,
        related_name='recommendations')
    recommendation = models.ForeignKey(
        to=Recommendation, on_delete=models.CASCADE)
    reason_type = models.ForeignKey(
        to=ReasonType, on_delete=models.CASCADE)
    reason = models.CharField(max_length=255)
  
    def __str_(self):
        return f'{self.user} <-> {self.reason}'
