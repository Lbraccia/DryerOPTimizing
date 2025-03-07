from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from .models import Conexiones
from .serializer import ConexionesSerializer

class ConexionesViewSet(viewsets.ModelViewSet):
    queryset = Conexiones.objects.all()
    serializer_class = ConexionesSerializer
