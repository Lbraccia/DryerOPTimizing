from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from .models import TipoNodo
from .serializer import TipoNodoSerializer

class TipoNodoViewSet(viewsets.ModelViewSet):
    queryset = TipoNodo.objects.all()
    serializer_class = TipoNodoSerializer