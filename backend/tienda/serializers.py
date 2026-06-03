from rest_framework import serializers
from .models import Marca, Calzado


class MarcaSerializer(serializers.ModelSerializer):
    calzados_count = serializers.SerializerMethodField()

    class Meta:
        model = Marca
        fields = ['id', 'nombre', 'pais', 'logo', 'descripcion', 'calzados_count']

    def get_calzados_count(self, obj):
        return obj.calzados.count()


class CalzadoSerializer(serializers.ModelSerializer):
    marca_nombre = serializers.CharField(source='marca.nombre', read_only=True)
    marca_pais = serializers.CharField(source='marca.pais', read_only=True)

    class Meta:
        model = Calzado
        fields = ['id', 'modelo', 'talla', 'precio', 'imagen', 'marca', 'marca_nombre', 'marca_pais', 'color', 'stock']


class CalzadoListSerializer(serializers.ModelSerializer):
    marca = MarcaSerializer(read_only=True)

    class Meta:
        model = Calzado
        fields = ['id', 'modelo', 'talla', 'precio', 'imagen', 'marca', 'color', 'stock']
