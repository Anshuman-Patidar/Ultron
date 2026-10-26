from django.urls import path
from . import views

urlpatterns = [
    path('hi/', views.hi, name='hi'),
    path('get/', views.hi, name='get'),
    path('ask/', views.ask, name='ask'),
    path('history/', views.history, name='history'),
]



