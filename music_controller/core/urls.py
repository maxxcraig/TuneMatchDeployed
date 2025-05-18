# core/urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('spotify/', include('spotify.urls')),
]

# during development serve static files directly
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# catch-all: serve your React app’s index.html on any other route
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='index'),
]
