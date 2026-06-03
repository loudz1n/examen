from django.contrib import admin
from .models import Marca, Calzado

@admin.register(Marca)
class MarcaAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'pais']
    search_fields = ['nombre', 'pais']

@admin.register(Calzado)
class CalzadoAdmin(admin.ModelAdmin):
    list_display = ['id', 'modelo', 'talla', 'precio', 'marca', 'stock']
    list_filter = ['marca', 'talla']
    search_fields = ['modelo']
