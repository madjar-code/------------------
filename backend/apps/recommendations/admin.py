from django.contrib import admin
from .models import RecommendationCategory,\
    ReasonType, Recommendation, PersonalRecommendation

admin.site.register(RecommendationCategory)
admin.site.register(ReasonType)
admin.site.register(Recommendation)
admin.site.register(PersonalRecommendation)
