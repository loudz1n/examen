from django.db import models


class Marca(models.Model):
    nombre = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='marcas/', blank=True, null=True)
    descripcion = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['nombre']
        verbose_name = 'Marca'
        verbose_name_plural = 'Marcas'

    def __str__(self):
        return self.nombre


class Calzado(models.Model):
    TALLAS = [(str(i), str(i)) for i in range(35, 46)]

    modelo = models.CharField(max_length=150)
    talla = models.CharField(max_length=5, choices=TALLAS)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='calzados/')
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE, related_name='calzados')
    color = models.CharField(max_length=50, default='Negro')
    stock = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['modelo']
        verbose_name = 'Calzado'
        verbose_name_plural = 'Calzados'

    def __str__(self):
        return f"{self.modelo} - Talla {self.talla}"
