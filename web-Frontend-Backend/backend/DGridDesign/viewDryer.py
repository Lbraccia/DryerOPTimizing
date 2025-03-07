from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from .models import Usuario, Dryer
from .serializer import DryerSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone

from subprocess import run, PIPE, STDOUT
import numpy as np
from datetime import datetime
import json

import sys


#====================================================================#
#=============== Funciones para las Secadoras ===========================#
#====================================================================#
class DryerViewSet(viewsets.ModelViewSet):
    queryset = Dryer.objects.all()
    serializer_class = DryerSerializer

    # Funcion para Crear una nueva Red
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def createDryer(self, request):
        # Tengo que verificar
        nombre = request.data.get('nombre')
        idUser = request.data.get('idUser')
        estado = request.data.get('status')
        print("=====================")
        print(f"idUser:  {idUser}" )

        # Obtengo la fecha y la hora de creacion
        fecha_creacion = timezone.now().date()
        hora_creacion=timezone.now().time().strftime("%H:%M:%S")

        # Verifica si se proporcionó 'nombre'
        #if nombre is None:
        #   return Response({"error": "nombre is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'fecha'
        #if fecha is None:
        #    return Response({"error": "fecha is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'hora'
        #if hora is None:
        #    return Response({"error": "hora is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'idUser'
        if idUser is None:
            return Response({"error": "idUser is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Obtengo la Red
        UsuarioValue = Usuario.objects.filter(pk=idUser)

        print(f"Usuario:  {UsuarioValue[0]}" )

        #print(UsuarioValue)
        # Este codigo serviría para verificar que no se repitan nombres
        # Verifico si la red ya está creado
        #RedExist = Red.objects.filter(idUser=idUser, nombre=nombre)

        # Codigo para genera nombres si ya existe
        #contador = 1
        #while True:
        #   nombre_completo = f"{nombre_base}({contador})"
        #    RedExist = Red.objects.filter(idUser=idUser, nombre=nombre_completo)
        #    if RedExist.count() == 0:
        #        return nombre_completo
        #    contador += 1


        #if RedExist.count() == 0:
        # Creo la Nueva Red
        NewDryer = Dryer.objects.create(nombre = nombre,
                                    fecha= fecha_creacion,
                                    hora = hora_creacion,
                                    idUser = UsuarioValue[0],
                                    status = estado
                                )   
        
        # Si la red no existe la guardo en la base de datos

        #NewRed.save() 
        #status = status.HTTP_200_OK
        #print(status = status.HTTP_200_OK)
        # Devuelve una respuesta de éxito con el nodo creado {NewRed}
        return Response(
            {"message": f" {NewDryer} dryer nuevo."},
            status=status.HTTP_200_OK
        )

        #else: 
        #    # Devuelve una respuesta de éxito diciendo que la red ya existe en la bd
        #    return Response(
        #        {"message": f" Red Existente."},
        #        status=status.HTTP_200_OK
        #    )           


    # Funcion filtrar los valores de acuerdo a la idred, nombre
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def filtrar(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idUser = request.data.get('idUser')
        nombre = request.data.get('nombre')
        idred = request.data.get('idred')
        
        # Verifica si se proporcionó 'idred'
        if idUser is None:
            return Response({"error": "idUser is required"}, status=status.HTTP_400_BAD_REQUEST)

        #Usuario = Usuario.objects.get(pk=idUser)
        if idUser != None and nombre == None and idred == None:
           # Filtra todos los parametros para una idred
           Dryers = Dryer.objects.filter(idUser=idUser)
        if idUser != None and nombre != None and idred == None:
           # Filtra todos los parametros para un nombre
           Dryers = Dryer.objects.filter(idUser=idUser, nombre = nombre)
        if idUser != None and nombre == None and idred != None:
           # Filtra todos los parametros para una idred
           Dryers = Dryer.objects.filter(idUser=idUser, id = idred)

        serializer = RedSerializer(Dryers, many=True)        
        # Devuelve una respuesta de éxito con el nodo filtrado
        return Response(
                {"message": serializer.data},
            status=status.HTTP_200_OK
        )
    

    # Funcion filtrar los valores de acuerdo a la idred, nombre
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def lastCreatedDryer(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idUser = request.data.get('idUser')
        # Verifica si se proporcionó 'idred'
        if idUser is None:
            return Response({"error": "idUser is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        #usuario = Usuario.objects.filter(id=idUser).order_by('-fecha', '-hora').first()

        ultima_dryer = Dryer.objects.filter(idUser=idUser).order_by('-fecha', '-hora').first()
        #print(ultima_red)
        if ultima_dryer:
            # Si se encuentra un registro, lo serializamos y lo retornamos
            serializer = DryerSerializer(ultima_dryer)
            return Response(serializer.data)
            #return Response(
            #    {"message": f"{redes_deleted} redes deleted."},
            #    status=status.HTTP_200_OK
            # )    
        else:
            # Si no se encuentra ningún registro, retornamos un mensaje de error
            return Response({"error": "No se encontraron registros para el idUser"}, status=status.HTTP_404_NOT_FOUND)
        
    # Función para eliminar redes
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def delete(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        nombre = request.data.get('nombre')
        idUser = request.data.get('idUser')
        idred = request.data.get('idred')

        # Verifica si se proporcionó 'idred'
        if idUser is None:
            return Response({"error": "idUser is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)


        #Usuario = Usuario.objects.get(pk=idUser)
    
        if idUser != None and nombre == None and idred == None:
           # Filtra todos los nodos con el idred
           Dryers = Dryer.objects.filter(idUser=idUser)
        elif idUser != None and nombre != None and idred == None:
           # Filtra todos los nodos con el idUser y el nombre
           Dryers = Dryer.objects.filter(idUser=idUser, nombre=nombre)
        elif idUser != None and nombre == None and idred != None:
           # Filtra todos los nodos con el idUser y el idred
           Dryers = Dryer.objects.filter(idUser=idUser, id=idred)

        print(f"dryer: {Dryers}")
        # Elimina los nodos
        dryers_deleted, _ = Dryers[0].delete()  # Obtiene el número de elementos eliminados

        # Devuelve una respuesta de éxito con el número de nodos eliminados
        return Response(
            {"message": f"{dryers_deleted} dryer deleted."},
            status=status.HTTP_200_OK
        )    

    #Funcion para cambiar los valores de una red
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def change(self, request):

        # Obtiene el valor 'idUsiaro' del cuerpo de la solicitud
        iUsuarioOriginal = request.data.get('iUsuarioOriginal')
        NombreOriginal = request.data.get('NombreOriginal') 
        idOriginal = request.data.get('idOriginal')

        # Nuevos valores 
        nombreNew = request.data.get('nombreNew')
        fechaNew = request.data.get('fechaNew')
        horaNew = request.data.get('horaNew')
        idUserNew = request.data.get('idUserNew')
        statusNew = request.data.get('statusNew')

        # Verifica si se proporcionó 'iUsuarioOriginal y el nombre'
        if iUsuarioOriginal is None:
            return Response({"error": "iUsuarioOriginal is required"}, status=status.HTTP_400_BAD_REQUEST)
        if (NombreOriginal is None) and (idOriginal is None):
            return Response({"error": "NombreOriginal or idOriginal is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Obtengo el nodo a modificar
        if NombreOriginal is not None:
            DryerModificar = Dryer.objects.filter(idUser=iUsuarioOriginal, nombre=NombreOriginal)
        elif idOriginal is not None:
            DryerModificar = Dryer.objects.filter(idUser=iUsuarioOriginal, id=idOriginal)
        else:
            print("error: idOriginal o Nombre original is not provide")

        for Dryer in DryerModificar:
            if nombreNew is not None:
                Dryer.nombre = nombreNew
            if fechaNew is not None:
                Dryer.fecha = fechaNew
            if horaNew is not None:
                Dryer.hora = horaNew
            if idUserNew is not None:
                UsuarioValue = Usuario.objects.get(pk=idUserNew)
                Dryer.idUser = UsuarioValue
            if statusNew is not None:
                Dryer.status = statusNew

            Dryer.save() 
        # Devuelve una respuesta de éxito con el nodo modificado
        return Response(
            {"message": f"{DryerModificar} dryer modificados."},
            status=status.HTTP_200_OK
        )