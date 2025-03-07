from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from .models import Usuario, Dryer #, Conexiones, TipoNodo, Red, Nodo, Linea, Solutions, Parameters
from .serializer import UsuarioSerializer, DryerSerializer #, ConexionesSerializer, TipoNodoSerializer
#from .serializer import NodoSerializer, LineaSerializer, ParametersSerializer, SolutionsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone

from subprocess import run, PIPE, STDOUT
import numpy as np
import subprocess
import os
from datetime import datetime
import json

import sys
#import base64
#from json import dumps
#from ast import literal_eval


#Obtengo el directorio 
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#print(BASE_DIR)
SCRIPT_ROOT = os.path.join(BASE_DIR, 'gisp_web/script')
#print(SCRIPT_ROOT)
    
# Ruta completa al script
import os
from django.shortcuts import render

# Importo todas las vistas


# Funciones Adicionales

#from .viewTipos import TipoNodoViewSet
from .viewUsuarios import UsuarioViewSet
#from .viewConexiones import ConexionesViewSet   
from .viewDryer import DryerViewSet
#from .viewNodos import NodoViewSet    
#from .viewLineas import LineaViewSet
#from .viewParametros import ParametersViewSet
#from .viewSolution import SolutionsViewSet


# Permite convertir un vector float en un vector textfield
def float2textfield(vector):
    # Convierte la lista de listas a un string
    string = str(vector)
    # Reemplazar las comas y los corchetes por el formato deseado
    string = string.replace(',', '').replace('[', '[').replace(']', ']')    
    return string
