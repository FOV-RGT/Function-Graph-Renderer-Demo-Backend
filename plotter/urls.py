from django.urls import path
from . import views

urlpatterns = [
    path('plot/', views.plot_function, name='plot_function'),
]
