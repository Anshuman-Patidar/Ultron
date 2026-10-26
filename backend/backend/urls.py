"""
URL configuration for backend project.
Global URLs — includes all app-level URL configs.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('AIapp.urls')),
]
