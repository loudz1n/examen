from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Marca, Calzado
from .serializers import MarcaSerializer, CalzadoSerializer, CalzadoListSerializer


class MarcaListCreate(APIView):
    def get(self, request):
        marcas = Marca.objects.all()
        serializer = MarcaSerializer(marcas, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = MarcaSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MarcaDetail(APIView):
    def get(self, request, pk):
        marca = get_object_or_404(Marca, pk=pk)
        serializer = MarcaSerializer(marca, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        marca = get_object_or_404(Marca, pk=pk)
        serializer = MarcaSerializer(marca, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        marca = get_object_or_404(Marca, pk=pk)
        marca.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CalzadoListCreate(APIView):
    def get(self, request):
        calzados = Calzado.objects.select_related('marca').all()
        marca_id = request.query_params.get('marca')
        if marca_id:
            calzados = calzados.filter(marca_id=marca_id)
        serializer = CalzadoListSerializer(calzados, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = CalzadoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalzadoDetail(APIView):
    def get(self, request, pk):
        calzado = get_object_or_404(Calzado, pk=pk)
        serializer = CalzadoListSerializer(calzado, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        calzado = get_object_or_404(Calzado, pk=pk)
        serializer = CalzadoSerializer(calzado, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        calzado = get_object_or_404(Calzado, pk=pk)
        calzado.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
