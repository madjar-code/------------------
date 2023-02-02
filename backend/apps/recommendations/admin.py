from django.contrib import admin
from .models import RecommendationCategory,\
    Recommendation, PersonalRecommendation

admin.site.register(RecommendationCategory)
admin.site.register(Recommendation)
admin.site.register(PersonalRecommendation)
