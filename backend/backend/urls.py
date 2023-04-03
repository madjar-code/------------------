from django.views.generic import TemplateView
from django.contrib import admin
from django.conf import settings
from django.urls import path, re_path, include
from django.conf.urls.static import static
from rest_framework_simplejwt.views import \
    TokenRefreshView,\
    TokenObtainPairView
from .yasg import schema_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/users/', include('accounts.api.urls')),
    path('api/', include('CVs.api.urls')),
    path('api/recommendations/', include('recommendations.api.urls')),
    path('api/routes/', include('routes.api.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r".*", TemplateView.as_view(template_name="index.html")),
]