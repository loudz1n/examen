from django.urls import path
from . import views

urlpatterns = [
    path('marcas/', views.MarcaListCreate.as_view(), name='marca-list'),
    path('marcas/<int:pk>/', views.MarcaDetail.as_view(), name='marca-detail'),
    path('calzados/', views.CalzadoListCreate.as_view(), name='calzado-list'),
    path('calzados/<int:pk>/', views.CalzadoDetail.as_view(), name='calzado-detail'),
]
