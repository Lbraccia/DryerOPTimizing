from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from .models import Dryer, Parameters#TipoNodo, Red, Nodo, Linea, Parameters
from .serializer import NodoSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone

import numpy as np
from datetime import datetime
import json

#====================================================================#
#=============== Funciones para los Nodos ===========================#
#====================================================================#
class NodoViewSet(viewsets.ModelViewSet):
    queryset = Nodo.objects.all()
    serializer_class = NodoSerializer

    # Modifico el get para filtrar nodos por idred, tipo y nombre
    def get_queryset(self):
        idred_param = self.request.query_params.get('idred', None)
        idtiponodo_param = self.request.query_params.get('type', None)
        nombre_param = self.request.query_params.get('nombre', None)
        queryset = Nodo.objects.all()
        if idred_param: 
            queryset = queryset.filter(idred=idred_param)
        if idtiponodo_param: 
            queryset = queryset.filter(idtiponodo= idtiponodo_param)
        if nombre_param: 
            queryset = queryset.filter(nombre = nombre_param)
        return queryset
    
    # Funcion para Crear una nuevo nodo
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def createNodo(self, request):        
        idred = request.data.get('idred')
        idNodo = request.data.get('idNodo')
        nombre = request.data.get('nombre')
        idtiponodo = request.data.get('idtiponodo')
        idsubtiponodo = request.data.get('idsubtiponodo')
        x = request.data.get('x')
        y = request.data.get('y')
        lat = request.data.get('lat')
        lng = request.data.get('lng')
        #Pinlat = request.data.get('Pinlat')
        #Pinlng = request.data.get('Pinlng')
        xPinL = request.data.get('xPinL')
        yPinT = request.data.get('yPinT')
        anguloPin = request.data.get('anguloPin')
        p = request.data.get('p')
        q = request.data.get('q')
        fi = request.data.get('fi')
        pLB = request.data.get('pLB')
        qLB = request.data.get('qLB')
        pUB = request.data.get('pUB')
        qUB = request.data.get('qUB')
        VLB = request.data.get('VLB')
        VUB = request.data.get('VUB')
        z = request.data.get('z')
        zOper = request.data.get('zOper')
        grid = request.data.get('grid')

        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'idNodo'
        if idNodo is None:
            return Response({"error": "idNodo is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'nombre'
        if nombre is None:
            return Response({"error": "nombre is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'idtiponodo'
        if idtiponodo is None:
            return Response({"error": "idtiponodo is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'idsubtiponodo'
        if idsubtiponodo is None:
            return Response({"error": "idsubtiponodo is required"}, status=status.HTTP_400_BAD_REQUEST)
        if x is None:
            return Response({"error": "x is required"}, status=status.HTTP_400_BAD_REQUEST)
        if y is None:
            return Response({"error": "y is required"}, status=status.HTTP_400_BAD_REQUEST)
        if lat is None:
            return Response({"error": "lat is required"}, status=status.HTTP_400_BAD_REQUEST)
        if lng is None:
            return Response({"error": "lng is required"}, status=status.HTTP_400_BAD_REQUEST)
        if xPinL is None:
            return Response({"error": "xPinL is required"}, status=status.HTTP_400_BAD_REQUEST)              
        if yPinT is None:
            return Response({"error": "yPinT is required"}, status=status.HTTP_400_BAD_REQUEST)               
        # Se puede crear el nodo sin saber la latitud y longitud del pin
        #if Pinlat is None:
        #    return Response({"error": "Pinlat is required"}, status=status.HTTP_400_BAD_REQUEST)              
        #if Pinlng is None:
        #    return Response({"error": "Pinlng is required"}, status=status.HTTP_400_BAD_REQUEST)               
        if anguloPin is None:
            return Response({"error": "anguloPin is required"}, status=status.HTTP_400_BAD_REQUEST)              
        if p is None:
            return Response({"error": "p is required"}, status=status.HTTP_400_BAD_REQUEST)
        if q is None:
            return Response({"error": "q is required"}, status=status.HTTP_400_BAD_REQUEST)
        if fi is None:
            return Response({"error": "fi is required"}, status=status.HTTP_400_BAD_REQUEST)
        if pLB is None:
            return Response({"error": "pLB is required"}, status=status.HTTP_400_BAD_REQUEST)
        if qLB is None:
            return Response({"error": "qLB is required"}, status=status.HTTP_400_BAD_REQUEST)
        if pUB is None:
            return Response({"error": "pUB is required"}, status=status.HTTP_400_BAD_REQUEST)
        if qUB is None:
            return Response({"error": "qUB is required"}, status=status.HTTP_400_BAD_REQUEST)
        if VUB is None:
            return Response({"error": "VUB is required"}, status=status.HTTP_400_BAD_REQUEST)
        if VUB is None:
            return Response({"error": "VUB is required"}, status=status.HTTP_400_BAD_REQUEST)       

        # Las variables binarias se crean pero no son requeridas ya que se obtienen de las soluciones
        #if z is None:
        #    return Response({"error": "z is required"}, status=status.HTTP_400_BAD_REQUEST)              
        #if zOper is None:
        #    return Response({"error": "zOper is required"}, status=status.HTTP_400_BAD_REQUEST)              
        if grid is None:
            return Response({"error": "grid is required"}, status=status.HTTP_400_BAD_REQUEST)              

        # Obtengo la Red
        red = Red.objects.get(pk=idred)
        tipo = TipoNodo.objects.get(pk=idtiponodo)

        # Verifico si el nodo ya está creado
        nodoExist = Nodo.objects.filter(idred=red, idNodo=idNodo)

        if nodoExist.count() == 0:
            # Creo el nueva Nodo
            NewNodo = Nodo.objects.create(idred=red,
                                      idNodo = idNodo,
                                      nombre= nombre,
                                      idtiponodo = tipo,
                                      idsubtiponodo = idsubtiponodo,
                                      x=x,
                                      y=y,
                                      lat=lat,
                                      lng=lng,
                                      xPinL= xPinL,
                                      yPinT= yPinT, 
                                      anguloPin = anguloPin,
                                      p= "[" + p + "]",
                                      q= "[" + q + "]",
                                      fi= "[" + fi + "]",
                                      pLB = "[" + pLB + "]",
                                      qLB = "[" + qLB + "]",
                                      pUB = "[" + pUB + "]",
                                      qUB = "[" + qUB + "]",
                                      VUB = "[" + VUB + "]",
                                      VLB = "[" + VLB + "]",
                                      z = True,
                                      zOper = "[" + zOper + "]",
                                      grid = grid
                                    )
        
            # Si el nodo no existe lo guardo en la base de datos
            #print("se guardó el elemento")
            NewNodo.save() 
        
            # Devuelve una respuesta de éxito con el nodo creado
            return Response(
                {"message": f" {NewNodo} nodo nuevo."},
                status=status.HTTP_200_OK
            )
        else: 
            # Devuelve una respuesta de éxito diciendo que el nodo ya existe en la bd
            return Response(
                {"message": f" Nodo Existente."},
                status=status.HTTP_200_OK
            )           
    
    
    # Función para eliminar nodos
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def delete(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idred = request.data.get('idred')
        idNodo = request.data.get('idNodo')
        
        # Obtengo el parametro P
        Parametros = Parameters.objects.get(idred=idred)
        P = Parametros.P

        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)
    
        if idred != None and idNodo == None:
           # Filtra todos los nodos con el idred
           nodos = Nodo.objects.filter(idred=idred)
        elif idred != None and idNodo != None:
           # Filtra todos los nodos con el idred y el id
           nodos = Nodo.objects.filter(idred=idred, idNodo=idNodo)
        elif idred == None and idNodo != None:
           # Filtra todos los nodos con el id
           nodos = Nodo.objects.filter(idNodo=idNodo)
        
        for nodo in nodos:
            # elimino el p de los bus
            if nodo.idtiponodo == TipoNodo.objects.get(pk=6):
                # El nodo carga está como source (Tengo que buscar en los receptores el bus)
                lineas = Linea.objects.filter(source=nodo.id)
                for linea in lineas:
                    nodoReceptor = linea.receptor

                    if nodoReceptor: 
                        # Si el nodo Receptor existe
                        if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=1):
                            # Si el nodo es el bus conectado debo cambiar el valor de p al nuevo valor
                            # Transformo los dato de tipo texto a tipo float de ambos nodos
                            VectornodoReceptorP = textfield2float(nodoReceptor.p)
                            VectornodoP = textfield2float(nodo.p)
                            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
                            vectorReceptorNewP = []   

                            # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
                            for p in range(0,P):        
                                vectorReceptorNewP.append(float(VectornodoReceptorP[p]) - float(VectornodoP[p]))
                                    
                            nodoReceptor.p = str(vectorReceptorNewP) 
                            nodoReceptor.save() 

                # El nodo carga está como receptor (Tengo que buscar en los receptores el bus)
                lineas = Linea.objects.filter(receptor=nodo.id)
                for linea in lineas:
                    nodoSource = linea.source
                    if nodoSource:
                        # Si el nodo fuente existe
                        if nodoSource.idtiponodo == TipoNodo.objects.get(pk=1):
                            # Si el nodo es el bus conectado debo cambiar el valor de p al nuevo valor
                            # Transformo los dato de tipo texto a tipo float de ambos nodos
                            VectornodoSourceP = textfield2float(nodoSource.p)
                            VectornodoP = textfield2float(nodo.p)
                            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
                            vectorSourceNewP = []   

                            # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
                            for p in range(0,P):    
                                vectorSourceNewP.append(float(VectornodoSourceP[p]) - float(VectornodoP[p]))
                                    
                            nodoSource.p = str(vectorSourceNewP) 
                            nodoSource.save()
    
            # elimino los q de los bus
            if nodo.idtiponodo == TipoNodo.objects.get(pk=6):
                # El nodo carga está como receptor (Tengo que buscar en los receptores el bus)
                lineas = Linea.objects.filter(receptor=nodo.id)
                for linea in lineas:
                    nodoSource = linea.source
                    if nodoSource:
                        # Si el nodo Source existe
                        if nodoSource.idtiponodo == TipoNodo.objects.get(pk=1):
                            # Si el nodo es el bus conectado debo cambiar el valor de p al nuevo valor
                            # Transformo los dato de tipo texto a tipo float de ambos nodos
                            VectornodoSourceQ = textfield2float(nodoSource.q)
                            VectornodoQ = textfield2float(nodo.q)

                            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
                            vectorSourceNewQ = []  
                            # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
                            for p in range(0,P):     
                                vectorSourceNewQ.append(float(VectornodoSourceQ[p]) - float(VectornodoQ[p]))         

                            nodoSource.q = str(vectorSourceNewQ) 
                            nodoSource.save() 

                # El nodo carga está como source (Tengo que buscar en los receptores el bus)
                lineas = Linea.objects.filter(source=nodo.id)
                for linea in lineas:
                    nodoReceptor = linea.receptor
                    if nodoReceptor: 
                        # Si el nodo receptor existe
                        if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=1):
                            # Si el nodo es el bus conectado debo cambiar el valor de p al nuevo valor
                            # Transformo los dato de tipo texto a tipo float de ambos nodos
                            VectornodoReceptorQ = textfield2float(nodoReceptor.q)
                            VectornodoQ = textfield2float(nodo.q)

                            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
                            vectorReceptorNewQ = []  
                            # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
                            for p in range(0,P):     
                                vectorReceptorNewQ.append(float(VectornodoReceptorQ[p]) - float(VectornodoQ[p]))         

                            nodoReceptor.q = str(vectorReceptorNewQ) 
                            nodoReceptor.save() 
                            
        ## Esta parte permite cambiar el campo grid de los buses conectados a una grid que se elimina
        # Si el nodo eliminado es una grid (Debo cambiar el valor grid sobre los buses)
        for nodo in nodos:
            if nodo.idtiponodo == TipoNodo.objects.get(pk=7):
               # El nodo grid está como source (Tengo que buscar en los receptores el bus)
               lineas = Linea.objects.filter(source=nodo.id)
               for linea in lineas:
                   nodoReceptor = linea.receptor
                   if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=1):
                       # Si el nodo es el bus conectado debo eliminar el nodo    
                       nodoReceptor.grid = False
                       nodoReceptor.save() 

               # El nodo grid está como receptor (Tengo que buscar en los source el bus)
               lineas = Linea.objects.filter(receptor=nodo.id)
               for linea in lineas:
                   nodoSource = linea.source
                   if nodoSource.idtiponodo == TipoNodo.objects.get(pk=1):
                       # Si el nodo es el bus conectado debo eliminar el nodo    
                       nodoSource.grid = False
                       nodoSource.save()       

        # Elimina los nodos
        nodos_deleted, _ = nodos.delete()  # Obtiene el número de elementos eliminados

        # Devuelve una respuesta de éxito con el número de nodos eliminados
        return Response(
            {"message": f"{nodos_deleted} nodos deleted."},
            status=status.HTTP_200_OK
        )

    # Funcion filtrar los valores de acuerdo a la idred, nombre y tipo
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def filtrar(self, request):

        idred = request.data.get('idred', None)
        idNodo = request.data.get('idNodo', None)
        tipo_filtro = request.data.get('tipo', None)
        fields = request.data.get('fields', None)

        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        #idtiponodo = TipoNodo.objects.get(pk=tipo)
        
        #print(idtiponodo)
        #print(f"idred: {idred}")
        #print(f"idNodo: {idNodo}")
        #print(f"tipo: {tipo_filtro}")
        #print(f"fields: {fields}")

        if (idred != None or idred != "") and (idNodo == None or idNodo == "") and (tipo_filtro == None or tipo_filtro == ""):
           # Filtra todos los nodos con el idred
           nodos = Nodo.objects.filter(idred=idred)
        elif (idred != None or idred != "") and (idNodo != None or idNodo != "") and (tipo_filtro == None or tipo_filtro == ""): 
           # Filtra todos los nodos con el idred y el nombre
           nodos = Nodo.objects.filter(idred=idred, idNodo=idNodo)
        elif (idred == None or idred == "") and (idNodo != None or idNodo != "") and (tipo_filtro == None or tipo_filtro == ""): 
           # Filtra todos los nodos con el nombre
           nodos = Nodo.objects.filter(idNodo=idNodo)
        elif (idred != None or idred != "") and (idNodo != None or idNodo != "") and (tipo_filtro != None or tipo_filtro != ""): 
           # Filtrar por idred y tipo
           tipo = tipo_filtro.split('&')
           nodos = Nodo.objects.filter(idred=idred, idtiponodo__in=tipo)
        elif (idred == None or idred == "") and (idNodo == None or idNodo == "") and (tipo_filtro != None or tipo_filtro != ""):
           # Filtrar por  tipo
           tipo = tipo_filtro.split('&')
           nodos = Nodo.objects.filter(idtiponodo__in=tipo)
        elif (idred != None or idred != "") and (idNodo != None or idNodo != "") and (tipo_filtro != None or tipo_filtro != ""):
           # Filtrar por idred, por nombre y tipo
           tipo = tipo_filtro.split('&')
           nodos = Nodo.objects.filter(idred=idred, idNodo=idNodo, idtiponodo__in=tipo)

        #print(nodos)
        #serializer = NodoSerializer(nodos, many=True)    
        #Permite obtener solo ciertos campos del objeto (Para no devolver todos los datos)
        if fields:
            # Convertir la lista de campos en una lista de Python
            fields = fields.split(',')
            # Crear un nuevo serializador con solo los campos especificados
            serializer = NodoSerializer(nodos, many=True, fields=fields)
        else:
            # Usar el serializador con todos los campos por defecto
            serializer = NodoSerializer(nodos, many=True)

        # Devuelve una respuesta de éxito con el nodo filtrado
        return Response(
                {"message": serializer.data},
            status=status.HTTP_200_OK
        )
    
# Funcion filtrar los valores de acuerdo a la idred, nombre y tipo
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def Nodos_conectados(self, request):

        idred = request.data.get('idred', None)
        idNodo = request.data.get('idNodo', None)
        tipos_nodos = request.data.get('tipos_nodos', None) # Tipos de nodos conectados
        tipo_line = request.data.get('tipo_line', None) # Filtrar las lineas
        fields = request.data.get('fields', None)

        # print(f"idred: {idred}")
        # print(f"idNodo: {idNodo}")
        # print(f"tipos_nodos: {tipos_nodos}")
        # print(f"tipo_line: {tipo_line}")

        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        nodos_conectados = set()  # Inicializar como un conjunto vacío

        # Filtro los nodos conectados a otro (Sin importar el tipo de linea o de nodo)
        if (idNodo != None and tipos_nodos == None and tipo_line == None):
            # Filtro todas las lineas que tienen como origen el nodo
            lineas_origen = Linea.objects.filter(idred=idred, source__idNodo=idNodo)
            for linea in lineas_origen:
                nodo = Nodo.objects.filter(idred=idred, id = linea.receptor_id)
                nodos_conectados.update(nodo)

            # Filtro todas las lineas que tienen como receptor el nodo
            lineas_receptor = Linea.objects.filter(idred=idred, receptor__idNodo=idNodo)
            for linea in lineas_receptor:
                nodo = Nodo.objects.filter(idred=idred, id = linea.source_id)
                nodos_conectados.update(nodo)

        # Filtro los nodos conectados a otro teniendo en cuenta el tipo de nodo
        if (idNodo != None and tipos_nodos != None and tipo_line == None):
            tiposNodos = tipos_nodos.split('&') # Se pueden dar varios tipos separados por &
            # Filtro todas las lineas que tienen como origen el nodo
            lineas_origen = Linea.objects.filter(idred=idred, source__idNodo=idNodo)
            for linea in lineas_origen:
                nodo = Nodo.objects.filter(idred=idred, id = linea.receptor_id, idtiponodo__in=tiposNodos)
                nodos_conectados.update(nodo)

            # Filtro todas las lineas que tienen como receptor el nodo
            lineas_receptor = Linea.objects.filter(idred=idred, receptor__idNodo=idNodo)
            for linea in lineas_receptor:
                nodo = Nodo.objects.filter(idred=idred, id = linea.source_id, idtiponodo__in=tiposNodos)
                nodos_conectados.update(nodo)

        
        # Filtro los nodos conectados a otro (teniendo en cuenta el tipo de linea)
        if (idNodo != None and tipos_nodos == None and tipo_line != None):
            tipoLine = tipo_line.split('&') # Se pueden dar varios tipos separados por &
            # Filtro todas las lineas que tienen como origen el nodo
            lineas_origen = Linea.objects.filter(idred=idred, source__idNodo=idNodo, idsubtipo__in=tipoLine)
            for linea in lineas_origen:
                nodo = Nodo.objects.filter(idred=idred, id = linea.receptor_id)
                nodos_conectados.update(nodo)

            # Filtro todas las lineas que tienen como receptor el nodo
            lineas_receptor = Linea.objects.filter(idred=idred, receptor__idNodo=idNodo, idsubtipo__in=tipoLine)
            for linea in lineas_receptor:
                nodo = Nodo.objects.filter(idred=idred, id = linea.source_id)
                nodos_conectados.update(nodo)

        #print(f"nodos_conectados {nodos_conectados}")
        #Permite obtener solo ciertos campos del objeto (Para no devolver todos los datos)
        if fields:
            # Convertir la lista de campos en una lista de Python
            fields = fields.split(',')
            # Crear un nuevo serializador con solo los campos especificados
            serializer = NodoSerializer(nodos_conectados, many=True, fields=fields)
        else:
            # Usar el serializador con todos los campos por defecto
            serializer = NodoSerializer(nodos_conectados, many=True)

        # Devuelve una respuesta de éxito con el nodo filtrado
        return Response(
                {"message": serializer.data},
            status=status.HTTP_200_OK
        )
    
    #Funcion para cambiar los valores de los nodos
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def change(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idredOriginal = request.data.get('idredOriginal')
        idNodoOriginal = request.data.get('idNodoOriginal') 
        
        # Obtengo el parametro P
        Parametros = Parameters.objects.get(idred=idredOriginal)
        P = Parametros.P

        # Nuevos valores 
        idredNew = request.data.get('idredNew')
        idNodoNew = request.data.get('idNodoNew')
        nombreNew = request.data.get('nombreNew')
        tipoNew = request.data.get('tipoNew')
        idsubtiponodoNew = request.data.get('idsubtiponodoNew')
        xNew = request.data.get('xNew')
        yNew = request.data.get('yNew')
        latNew = request.data.get('latNew')
        lngNew = request.data.get('lngNew')
        xPinLNew = request.data.get('xPinLNew')
        yPinTNew = request.data.get('yPinTNew')
        anguloPinNew = request.data.get('anguloPinNew')
        pNew = request.data.get('pNew')
        qNew = request.data.get('qNew')
        fiNew = request.data.get('fiNew')
        pLBNew = request.data.get('pLBNew')
        qLBNew = request.data.get('qLBNew')
        pUBNew = request.data.get('pUBNew')
        qUBNew = request.data.get('qUBNew')
        VLBNew = request.data.get('VLBNew')
        VUBNew = request.data.get('VUBNew')
        zNew = request.data.get('zNew')
        zOperNew = request.data.get('zOperNew')
        gridNew = request.data.get('gridNew')
        
        
        """ print("=====================")
        print(f'idredOriginal Anterior: {str(idredOriginal)}')
        print(f'idNodoOriginal Anterior: {str(idNodoOriginal)}')
        print(f'xNew Anterior: {str(xNew)}')
        print(f'yNew Anterior: {str(yNew)}')
         """

        # Verifica si se proporcionó 'idred y el nombre'
        if idredOriginal is None:
            return Response({"error": "idredOriginal is required"}, status=status.HTTP_400_BAD_REQUEST)
        if idNodoOriginal is None:
            return Response({"error": "idNodoOriginal is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Obtengo el nodo a modificar
        nodoModificar = Nodo.objects.filter(idred=idredOriginal, idNodo=idNodoOriginal)

        #print(f"idNodoOriginal: {idNodoOriginal}")
        #print(f"nodo a modificar: {nodoModificar}")

        for nodo in nodoModificar:
            if idredNew is not None:
                redNew = Red.objects.get(pk=idredNew)
                nodo.idred = redNew
            if idNodoNew is not None:
                nodo.idNodo = idNodoNew
            if nombreNew is not None:
                nodo.nombre = nombreNew
            if tipoNew is not None:
                NuevoTipo = TipoNodo.objects.get(pk=tipoNew)
                nodo.idtiponodo = NuevoTipo
            if idsubtiponodoNew is not None:
                nodo.idsubtiponodo = idsubtiponodoNew
            if xNew is not None:
                nodo.x = xNew
            if yNew is not None:
                nodo.y = yNew
            if latNew is not None:
                nodo.lat = latNew
            if lngNew is not None:
                nodo.lng = lngNew
            if xPinLNew is not None:
                nodo.xPinL = xPinLNew
            if yPinTNew is not None:
                nodo.yPinT = yPinTNew

            if pNew is not None:
                # Si se cambia el p de una carga debo modificar el p del bus asociado a dicha carga
                if nodo.idtiponodo == TipoNodo.objects.get(pk=6):
                    # El nodo carga está como source (Tengo que buscar en los receptores el bus)
                    lineas = Linea.objects.filter(source=nodo.id)
                    for linea in lineas:
                        nodoReceptor = linea.receptor
                        if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=1):
                            # Si el nodo es el bus conectado debo cambiar el valor de p al nuevo valor
                            # Transformo los dato de tipo texto a tipo float de ambos nodos
                            VectornodoReceptorP = textfield2float(nodoReceptor.p)
                            VectornodoP = textfield2float(nodo.p)

                            VectornodoPNew = textfield2float(pNew)

                            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
                            vectorReceptorNewP = []   

                            # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
                            for p in range(0,P):  
                                try:         
                                    vectorReceptorNewP.append(float(VectornodoReceptorP[p]) - float(VectornodoP[p]) + float(VectornodoPNew[p]))
                                except:
                                    vectorReceptorNewP.append(float(VectornodoPNew[p]))        
                            nodoReceptor.p = str(vectorReceptorNewP) 
                            nodoReceptor.save() 

                    # El nodo carga está como receptor (Tengo que buscar en los source el bus)
                    lineas = Linea.objects.filter(receptor=nodo.id)
                    for linea in lineas:
                        nodoSource = linea.source
                        if nodoSource.idtiponodo == TipoNodo.objects.get(pk=1):
                            # Si el nodo es el bus conectado debo cambiar el valor de p al nuevo valor
                            # Transformo los dato de tipo texto a tipo float de ambos nodos
                            VectornodoSourceP = textfield2float(nodoSource.p)
                            VectornodoP = textfield2float(nodo.p)
                            VectornodoPNew = textfield2float(pNew)
                            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
                            vectorSourceNewP = []   

                            # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
                            for p in range(0,P):   
                                try:         
                                    vectorSourceNewP.append(float(VectornodoSourceP[p]) - float(VectornodoP[p]) + float(VectornodoPNew[p]))
                                except:
                                    vectorSourceNewP.append(float(VectornodoPNew[p]))         
                            nodoSource.p = str(vectorSourceNewP) 
                            nodoSource.save() 

                ## Cambio el valor en el nodo
                nodo.p = "[" +  pNew + "]"           


            if qNew is not None:
            # Si se cambia el q de una carga debo modificar el p del bus asociado a dicha carga
                if nodo.idtiponodo == TipoNodo.objects.get(pk=6):
                    # El nodo carga está como source (Tengo que buscar en los receptores el bus)
                    lineas = Linea.objects.filter(source=nodo.id)
                    for linea in lineas:
                        nodoReceptor = linea.receptor
                        if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=1):
                            # Si el nodo es el bus conectado debo cambiar el valor de p al nuevo valor
                            # Transformo los dato de tipo texto a tipo float de ambos nodos
                            VectornodoReceptorQ = textfield2float(nodoReceptor.q)
                            VectornodoQ = textfield2float(nodo.q)
                            VectornodoQNew = textfield2float(qNew)

                            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
                            vectorReceptorNewQ = []  
                            # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
                            for p in range(0,P):     
                                try:         
                                    vectorReceptorNewQ.append(float(VectornodoReceptorQ[p]) - float(VectornodoQ[p]) + float(VectornodoQNew[p]))         
                                except:
                                    vectorReceptorNewQ.append(float(VectornodoQNew[p]))  

                            nodoReceptor.q = str(vectorReceptorNewQ) 
                            nodoReceptor.save() 
                
                    # El nodo carga está como receptor (Tengo que buscar en los source el bus)
                    lineas = Linea.objects.filter(receptor=nodo.id)
                    for linea in lineas:
                        nodoSource = linea.source
                        if nodoSource.idtiponodo == TipoNodo.objects.get(pk=1):
                            # Si el nodo es el bus conectado debo cambiar el valor de p al nuevo valor
                            # Transformo los dato de tipo texto a tipo float de ambos nodos
                            VectornodoSourceQ = textfield2float(nodoSource.q)
                            VectornodoQ = textfield2float(nodo.q)
                            VectornodoQNew = textfield2float(qNew)

                            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
                            vectorSourceNewQ = []  
                            # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
                            for p in range(0,P):     
                                try:         
                                    vectorSourceNewQ.append(float(VectornodoSourceQ[p]) - float(VectornodoQ[p]) + float(VectornodoQNew[p]))         
                                except:
                                    vectorSourceNewQ.append(float(VectornodoQNew[p]))  

                            nodoSource.q = str(vectorSourceNewQ) 
                            nodoSource.save() 

                ## Cambio el valor en el nodo
                nodo.q = "[" +  qNew + "]" 

            if fiNew is not None:
                nodo.fi = "[" +  fiNew + "]"
            if pLBNew is not None:
                nodo.pLB = "[" +  pLBNew + "]" 
            if qLBNew is not None:
                nodo.qLB = "[" +  qLBNew + "]"
            if pUBNew is not None:
                nodo.pUB = "[" +  pUBNew + "]"
            if qUBNew is not None:
                nodo.qUB = "[" +  qUBNew + "]"
            if VLBNew is not None:
               nodo.VLB =  "[" +  VLBNew + "]" 
            if VUBNew is not None:
               nodo.VUB =  "[" +  VUBNew + "]" 
            if anguloPinNew is not None:
                nodo.anguloPin = anguloPinNew
            if zNew is not None:
                nodo.z = "[" +  zNew + "]" 
            if zOperNew is not None:
                nodo.zOper = "[" +  zOperNew + "]" 
            if gridNew is not None:
                nodo.grid = gridNew
            nodo.save() 
        # Devuelve una respuesta de éxito con el nodo modificado
        return Response(
            {"message": f"{nodoModificar} nodos modificados."},
            status=status.HTTP_200_OK
        )
    

        
import ast
# Permite convertir un vector textfield en un vector float
def textfield2float(string):
    # Reemplazar los espacios por comas
    #string = string.replace(' ', ', ')
    # Evaluar la expresión para convertirla en una lista de listas

    tupla = ast.literal_eval(string)

    try:
        vector = list(tupla)
    except:
        vector = list((tupla,))

    # Si la evaluación devuelve un único valor, convertirlo en una lista
    if not isinstance(vector, list):
       vector = [vector]
    #vector = [float(item) for item in vector]
    return vector