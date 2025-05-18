from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name=''),
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index),
    path('privacy-policy', index),
]
