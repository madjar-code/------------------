from django.db import models
from common.models import TimeStampedModel
from accounts.models import User
from CVs.models import CV


class RouteType(TimeStampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self) -> str:
        return self.title


class Target(TimeStampedModel):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title


class Route(TimeStampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    CV = models.ForeignKey(to=CV, on_delete=models.SET_NULL, null=True)
    route_type = models.ForeignKey(to=RouteType, on_delete=models.SET_NULL, null=True)
    html_code = models.TextField(blank=True, null=True)
    target = models.ForeignKey(to=Target, on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return self.title