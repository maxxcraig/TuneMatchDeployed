from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('spotify/', include('spotify.urls')),
    path('', include('frontend.urls')),
]

# Fallback route to serve React index.html
urlpatterns += [
    path('', TemplateView.as_view(template_name="index.html")),
]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
