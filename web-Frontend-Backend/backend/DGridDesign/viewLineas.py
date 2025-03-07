from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from .models import TipoNodo, Red, Nodo, Linea, Solutions, Parameters
from .serializer import LineaSerializer
from django_filters.rest_framework import DjangoFilterBackend

from django.db.models import Q



#====================================================================#
#=============== Funciones para las Lineas ==========================#
#====================================================================#
class LineaViewSet(viewsets.ModelViewSet):
    queryset = Linea.objects.all()
    serializer_class = LineaSerializer

    # Funcion para Crear una nueva linea
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def createLine(self, request):
        idred = request.data.get('idred')
        nombre = request.data.get('nombre')

        # Obtengo el parametro P
        Parametros = Parameters.objects.get(idred=idred)
        P = Parametros.P
        
        source = request.data.get('source')
        receptor = request.data.get('receptor')
        startX = request.data.get('startX')
        startY = request.data.get('startY')
        endX = request.data.get('endX')
        endY = request.data.get('endY')
        pinIdIni = request.data.get('pinIdIni')
        pinIdEnd = request.data.get('pinIdEnd')

        StartLat = request.data.get('StartLat')
        StartLng = request.data.get('StartLng')
        EndLat = request.data.get('EndLat')
        EndLng = request.data.get('EndLng')
        ILB = request.data.get('ILB')
        IUB = request.data.get('IUB')
        zOper = request.data.get('zOper')

        # Estos valores se obtienen de la solucion 
        #zLine = request.data.get('zLine')
        
        #sentido = request.data.get('sentido')

        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'nombre'
        if nombre is None:
            return Response({"error": "nombre is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'idsubtiponodo'
        #if idsubtipo is None:
        #    return Response({"error": "idsubtipo is required"}, status=status.HTTP_400_BAD_REQUEST)        
        # Verifica si se proporcionó 'source'
        if source is None:
            return Response({"error": "source is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'receptor'
        if receptor is None:
            return Response({"error": "receptor is required"}, status=status.HTTP_400_BAD_REQUEST)

        if startX is None:
            return Response({"error": "startX is required"}, status=status.HTTP_400_BAD_REQUEST)
        if startY is None:
            return Response({"error": "startY is required"}, status=status.HTTP_400_BAD_REQUEST)
        if endX is None:
            return Response({"error": "endX is required"}, status=status.HTTP_400_BAD_REQUEST)
        if endY is None:
            return Response({"error": "endY is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if StartLat is None:
            return Response({"error": "StartLat is required"}, status=status.HTTP_400_BAD_REQUEST)
        if StartLng is None:
            return Response({"error": "StartLng is required"}, status=status.HTTP_400_BAD_REQUEST)
        if EndLat is None:
            return Response({"error": "EndLat is required"}, status=status.HTTP_400_BAD_REQUEST)
        if EndLng is None:
            return Response({"error": "EndLng is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if pinIdIni is None:
            return Response({"error": "pinIdIni is required"}, status=status.HTTP_400_BAD_REQUEST)
        if pinIdEnd is None:
            return Response({"error": "pinIdEnd is required"}, status=status.HTTP_400_BAD_REQUEST)              

        # Obtengo la Red
        red = Red.objects.get(pk=idred)
        #Obtengo el nodo fuente
        nodoSource = Nodo.objects.get(idred_id=idred, idNodo=source)     
        #Obtengo el nodo receptor
        nodoReceptor = Nodo.objects.get(idred_id=idred, idNodo=receptor)     

        # Verifico si la linea ya está cread
        LineaExist = Linea.objects.filter(idred=red, nombre=nombre)
        
        if LineaExist.count() == 0:

            # Transformo los dato de tipo texto a tipo float de ambos nodos
            VectornodoReceptorP = textfield2float(nodoReceptor.p)
            VectornodoSourceP = textfield2float(nodoSource.p)
            VectornodoReceptorQ = textfield2float(nodoReceptor.q)
            VectornodoSourceQ = textfield2float(nodoSource.q)
            
            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
            vectorReceptorNewP = []    
            vectorReceptorNewQ = []  
            if nodoSource.idtiponodo == TipoNodo.objects.get(pk=6):
               # Si el nodo fuente es una carga (Debo modificar el nodo receptor)

               for p in range(0,P):
                    try:                
                        vectorReceptorNewP.append(float(VectornodoReceptorP[p]) + float(VectornodoSourceP[p]))
                    except:
                        vectorReceptorNewP.append(float(VectornodoSourceP[p]))    
                    try:                
                        vectorReceptorNewQ.append(float(VectornodoReceptorQ[p]) + float(VectornodoSourceQ[p]))
                    except:
                        vectorReceptorNewQ.append(float(VectornodoSourceQ[p]))  

               nodoReceptor.p = str(vectorReceptorNewP) 
               nodoReceptor.q = str(vectorReceptorNewQ) 

               nodoReceptor.save() 
            
            vectorSourceNewP = []    
            vectorSourceNewQ = []  
            if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=6):
               # Si el nodo receptor es una carga (Debo modificar el nodo fuente)
                for p in range(0,P):
                    try:                
                        vectorSourceNewP.append(float(VectornodoReceptorP[p]) + float(VectornodoSourceP[p]))
                    except:
                        vectorSourceNewP.append(float(VectornodoReceptorP[p]))    
                    try:                
                        vectorSourceNewQ.append(float(VectornodoReceptorQ[p]) + float(VectornodoSourceQ[p]))
                    except:
                        vectorSourceNewQ.append(float(VectornodoReceptorQ[p]))  

                nodoSource.p = str(vectorSourceNewP) 
                nodoSource.q = str(vectorSourceNewQ) 

                nodoSource.save() 

            # Si alguno de los nodos es una grid tengo que cambiar el grid del bus asociado
            if nodoSource.idtiponodo == TipoNodo.objects.get(pk=7):
               # Si el nodo fuente es una grid (Debo modificar el nodo receptor)
               nodoReceptor.grid = True;
               nodoReceptor.save() 
            
            if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=7):
               # Si el nodo receptor es una grid (Debo modificar el nodo fuente)
               nodoSource.grid = True;
               nodoSource.save() 

            # Defino el subtipo de linea que es (Si conecta bus/bus subtipo A - Si conecta bus/Load DG grid subtipo B)
            if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=1) and nodoSource.idtiponodo == TipoNodo.objects.get(pk=1):
               idsubtipo = "A";
            else:
               idsubtipo = "B";

            # Creo la nueva linea
            NewLinea = Linea.objects.create(idred=red,
                                            nombre=nombre,
                                            idsubtipo = idsubtipo, 
                                            r= 0,
                                            x= 0,
                                            z= 0,
                                            startX= startX,
                                            startY= startY,
                                            endX= endX,
                                            endY= endY,
                                            pinIdIni= pinIdIni,
                                            pinIdEnd= pinIdEnd,
                                            x1Original= startX,
                                            y1Original= startY,
                                            x2Original= endX,
                                            y2Original= endY,
                                            StartLat= StartLat,
                                            StartLng= StartLng,
                                            EndLat= EndLat,
                                            EndLng= EndLng,
                                            source= nodoSource,
                                            receptor= nodoReceptor, 
                                            sentido = True,
                                            zLine = True,
                                            ILB = "[" + ILB + "]",
                                            IUB = "[" + IUB + "]",
                                            zOper = "[" + zOper + "]" )
            NewLinea.save() 

            # Devuelve una respuesta de éxito con la linea nueva
            return Response(
                {"message": f" {NewLinea} lineas nueva."},
                status=status.HTTP_200_OK
            )
        else:
            # Devuelve una respuesta de éxito diciendo que la linea ya existe
            return Response(
                {"message": f" Lineas Existente."},
                status=status.HTTP_200_OK
            )    
    
    # Funcion filtrar los valores de acuerdo a la idred, nombre, source, receptor
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def filtrar(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idred = request.data.get('idred')
        nombre = request.data.get('nombre') 
        source = request.data.get('source') # permite filtrar las lineas que tiene el nodo source como source de la linea
        receptor = request.data.get('receptor') # permite filtrar las lineas que tiene el nodo receptor como receptor de la linea
        nodo = request.data.get('nodo') # permite filtrar las lineas que tiene el nodo como source o receptor de la linea
        fields = request.data.get('fields')
        idsubtipo = request.data.get('idsubtipo') # permite filtrar segun el tipo de linea
        source_tipo = request.data.get('source_tipo') # permite filtrar segun el tipo de nodo source (filtra todas las lineas que tienen conectado como source un tipo de nodo)
        receptor_tipo = request.data.get('receptor_tipo')  # permite filtrar segun el tipo de nodo source (filtra todas las lineas que tienen conectado como receptor un tipo de nodo dado)
        nodo_tipo = request.data.get('nodo_tipo')# permite filtrar segun el tipo de nodo (filtra todas las lineas que tienen conectado un tipo de nodo)
        

        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)

        lineas = Linea.objects.filter(idred=idred)

        if ( idred != None and nombre == None and source == None and receptor == None and idsubtipo == None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
           # Filtra todos las lineas con el idred
           lineas = Linea.objects.filter(idred=idred)
        elif (idred != None and nombre != None  and source == None and receptor == None and idsubtipo == None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
           # Filtra todos las lineas con el idred y el nombre
           lineas = Linea.objects.filter(idred=idred, nombre=nombre)
        elif (idred == None and nombre != None  and source == None and receptor == None and idsubtipo == None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
           # Filtra todos las lineas con el nombre
           lineas = Linea.objects.filter(nombre=nombre)
        
       
        if (idred != None and nombre == None  and source != None and receptor == None and idsubtipo == None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
            # Filtramos las lineas por fuente
            lineas = Linea.objects.filter(source=source) 
        
        if (idred != None and nombre == None  and source == None and receptor != None and idsubtipo == None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
            # Filtramos las lineas por receptor
            lineas = Linea.objects.filter(receptor=receptor) 

        if (idred != None and nombre == None  and source == None and receptor == None and idsubtipo != None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
            # Filtramos por idsubtipo
            lineas = Linea.objects.filter(idred=idred, idsubtipo=idsubtipo) 
            
        if (idred != None and nombre == None  and source == None and receptor != None and idsubtipo != None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
            # Filtramos por idsubtipo y receptor
            lineas = Linea.objects.filter(idred=idred, receptor=receptor, idsubtipo=idsubtipo) 
        
        if (idred != None and nombre == None  and source != None and receptor == None and idsubtipo != None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
            # Filtramos por idsubtipo y source
            lineas = Linea.objects.filter(idred=idred, source=source, idsubtipo=idsubtipo) 

        if (idred != None and nombre == None  and source != None and receptor != None and idsubtipo != None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
            # Filtramos por idsubtipo, source y receptor
            #lineas = Linea.objects.filter(idred=idred, source=source, idsubtipo=idsubtipo) | Linea.objects.filter(idred=idred, receptor=receptor, idsubtipo=idsubtipo)
            lineas_origen = Linea.objects.filter(idred=idred, source=source, idsubtipo=idsubtipo)
            lineas_destino = Linea.objects.filter(idred=idred, receptor=receptor, idsubtipo=idsubtipo)
            lineas = lineas_origen.union(lineas_destino)
        
        if (idred != None and nombre == None  and source == None and receptor == None and idsubtipo != None and
            nodo != None and source_tipo == None and receptor_tipo == None and nodo_tipo== None):
            # Filtramos por idsubtipo, source y receptor
            #lineas = Linea.objects.filter(idred=idred, source=source, idsubtipo=idsubtipo) | Linea.objects.filter(idred=idred, receptor=receptor, idsubtipo=idsubtipo)
            lineas_origen = Linea.objects.filter(idred=idred, source__idNodo=nodo, idsubtipo=idsubtipo)
            lineas_destino = Linea.objects.filter(idred=idred, receptor__idNodo=nodo, idsubtipo=idsubtipo)
            lineas = lineas_origen.union(lineas_destino)

        if (idred != None and nombre == None  and source == None and receptor == None and idsubtipo == None and
            nodo == None and source_tipo != None and receptor_tipo == None and nodo_tipo== None):
            # Filtramos por tipo de nodo source 
            #lineas = Linea.objects.filter(idred=idred, source=source, idsubtipo=idsubtipo) | Linea.objects.filter(idred=idred, receptor=receptor, idsubtipo=idsubtipo)
            lineas = Linea.objects.filter(idred=idred, source__idtiponodo=source_tipo)

        if (idred != None and nombre == None  and source == None and receptor == None and idsubtipo == None and
            nodo == None and source_tipo == None and receptor_tipo != None and nodo_tipo== None):
            # Filtramos por tipo de nodo source 
            #lineas = Linea.objects.filter(idred=idred, source=source, idsubtipo=idsubtipo) | Linea.objects.filter(idred=idred, receptor=receptor, idsubtipo=idsubtipo)
            lineas = Linea.objects.filter(idred=idred, receptor__idtiponodo=receptor_tipo)
                
        if (idred != None and nombre == None  and source == None and receptor == None and idsubtipo == None and
            nodo == None and source_tipo == None and receptor_tipo == None and nodo_tipo != None):
            # Filtramos por tipo de nodo en source o receptor 
            lineas_origen = Linea.objects.filter(idred=idred, source__idtiponodo=nodo_tipo)
            lineas_destino = Linea.objects.filter(idred=idred, receptor__idtiponodo=nodo_tipo)
            lineas = lineas_origen.union(lineas_destino)

        if (idred != None and nombre == None  and source == None and receptor == None and idsubtipo == None and
            nodo != None and source_tipo == None and receptor_tipo == None and nodo_tipo == None):
            # Filtramos todas las lineas coencatadas a un nodo 
            #lineas = Linea.objects.filter(idred=idred, source=source, idsubtipo=idsubtipo) | Linea.objects.filter(idred=idred, receptor=receptor, idsubtipo=idsubtipo)
            lineas_origen = Linea.objects.filter(idred=idred, source__idNodo=nodo)
            lineas_destino = Linea.objects.filter(idred=idred, receptor__idNodo=nodo)
            lineas = lineas_origen.union(lineas_destino)

        # Devuelve una respuesta de éxito con la linea filtrada
        #return Response(
        #    {"message": f"{lineas} lineas obtenias."},
        #    status=status.HTTP_200_OK
        #)

        #serializer = LineaSerializer(lineas, many=True)        

        # Permite obtener solo ciertos campos del objeto (Para no devolver todos los datos)
        if fields:
            # Convertir la lista de campos en una lista de Python
            fields = fields.split(',')
            # Crear un nuevo serializador con solo los campos especificados
            serializer = LineaSerializer(lineas, many=True, fields=fields)
        else:
            # Usar el serializador con todos los campos por defecto
            serializer = LineaSerializer(lineas, many=True)
        
        # Devuelve una respuesta de éxito con el nodo filtrado
        return Response(
                {"message": serializer.data},
            status=status.HTTP_200_OK
        )

    # Función para eliminar lineas
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def delete(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idred = request.data.get('idred')
        nombre = request.data.get('nombre')
        source = request.data.get('source')
        receptor = request.data.get('receptor')

        # Obtengo el parametro P
        Parametros = Parameters.objects.get(idred=idred)
        P = Parametros.P

        lineas = Linea.objects.filter(idred=idred)

        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)
        lineasFiltrada = []
        if idred != None and nombre == None:
           # Filtra todos las lineas con el idred
           lineas = Linea.objects.filter(idred=idred)
        elif idred != None and nombre != None:
           # Filtra todos las lineas con el idred y el nombre
           lineas = Linea.objects.filter(idred=idred, nombre=nombre)
        elif idred == None and nombre != None:
           # Filtra todos las lineas con el nombre
           lineas = Linea.objects.filter(nombre=nombre)

        ####===============================================
        ## OJO comenté porque estoy debuggiando
        ####===============================================

        if lineas:
           for linea in lineas:
            nodoSource = linea.source
            nodoReceptor = linea.receptor
            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
             # Transformo los dato de tipo texto a tipo float de ambos nodos
            VectornodoReceptorP = textfield2float(nodoReceptor.p)
            VectornodoSourceP = textfield2float(nodoSource.p)
            VectornodoReceptorQ = textfield2float(nodoReceptor.q)
            VectornodoSourceQ = textfield2float(nodoSource.q)
            
            # Si alguno de los nodos es una carga tengo que cambiar el P y Q del bus asociado
            vectorReceptorNewP = []    
            vectorReceptorNewQ = []  
            if nodoSource.idtiponodo == TipoNodo.objects.get(pk=6):
               # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
               for p in range(0,P):             
                    vectorReceptorNewP.append(float(VectornodoReceptorP[p]) - float(VectornodoSourceP[p]))              
                    vectorReceptorNewQ.append(float(VectornodoReceptorQ[p]) - float(VectornodoSourceQ[p]))
                    
               nodoReceptor.p = str(vectorReceptorNewP) 
               nodoReceptor.q = str(vectorReceptorNewQ) 
        
               nodoReceptor.save() 
            
            vectorSourceNewP = []    
            vectorSourceNewQ = []  
            if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=6):
               # Si el nodo receptor es una carga (Debo modificar el nodo fuente)
                for p in range(0,P):
                    vectorSourceNewP.append(float(VectornodoSourceP[p]) - float(VectornodoReceptorP[p]))
                    vectorSourceNewQ.append(float(VectornodoSourceQ[p]) - float(VectornodoReceptorQ[p]))
                    
                nodoSource.p = str(vectorSourceNewP) 
                nodoSource.q = str(vectorSourceNewQ) 
        
                nodoSource.save()  
        
            # Si alguno de los nodos es una grid tengo que cambiar el grid del bus asociado
            if nodoSource.idtiponodo == TipoNodo.objects.get(pk=7):
                # Si el nodo fuente es una carga (Debo modificar el nodo receptor)
                nodoReceptor.grid = False
                nodoReceptor.save() 
            
            if nodoReceptor.idtiponodo == TipoNodo.objects.get(pk=7):
                # Si el nodo receptor es una carga (Debo modificar el nodo fuente)
                nodoSource.p = False
                nodoSource.save() 

        # Elimina las lineas
        lineas_deleted, _ = lineas.delete()  # Obtiene el número de elementos eliminados

        # Devuelve una respuesta de éxito con la línea eliminada
        return Response(
            {"message": f"{lineas_deleted} lineas deleted."}, 
            status=status.HTTP_200_OK
        )
    
    #Funcion para cambiar los valores de las lineas
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def change(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idredOriginal = request.data.get('idredOriginal')
        nombreOriginal = request.data.get('nombreOriginal') 

        # Nuevos valores 
        idredNew = request.data.get('idredNew')
        nombreNew = request.data.get('nombreNew')
        idsubtipoNew = request.data.get('idsubtipoNew')
        rNew = request.data.get('rNew')
        xNew = request.data.get('xNew')
        zNew = request.data.get('zNew')
        startXNew = request.data.get('startXNew')
        startYNew = request.data.get('startYNew')
        endXNew = request.data.get('endXNew')
        endYNew = request.data.get('endYNew')
        pinIdIniNew = request.data.get('pinIdIniNew')
        pinIdEndNew = request.data.get('pinIdEndNew')
        x1OriginalNew = request.data.get('x1OriginalNew')
        y1OriginalNew = request.data.get('y1OriginalNew')
        x2OriginalNew = request.data.get('x2OriginalNew')
        y2OriginalNew = request.data.get('y2OriginalNew')
        StartLatNew = request.data.get('StartLatNew')
        StartLngNew = request.data.get('StartLngNew')
        EndLatNew = request.data.get('EndLatNew')
        EndLngNew = request.data.get('EndLngNew')
        sourceNew = request.data.get('sourceNew')
        receptorNew = request.data.get('receptorNew')
        sentidoNew = request.data.get('sentidoNew')
        zLineNew = request.data.get('zLineNew')
        zOperNew = request.data.get('zOperNew')
        ILBNew = request.data.get('ILBNew')
        IUBNew = request.data.get('IUBNew')

        # Verifica si se proporcionó 'idred y el nombre'
        if idredOriginal is None:
            return Response({"error": "idredOriginal is required"}, status=status.HTTP_400_BAD_REQUEST)
        if nombreOriginal is None:
            return Response({"error": "nombreOriginal is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Obtengo el nodo a modificar
        LineaModificar = Linea.objects.filter(idred=idredOriginal, nombre=nombreOriginal)

        for linea in LineaModificar:
            if idredNew is not None:
                redNew = Red.objects.get(pk=idredNew)
                linea.idred = redNew
            if nombreNew is not None:
                linea.nombre = nombreNew
            if idsubtipoNew is not None:
                linea.idsubtipo = idsubtipoNew
            if rNew is not None:
                linea.r = rNew
            if xNew is not None:
                linea.x = xNew
            if zNew is not None:
                linea.z = zNew
            if startXNew is not None:
                linea.startX = startXNew
            if startYNew is not None:
                linea.startY = startYNew
            if endXNew is not None:
                linea.endX = endXNew
            if endYNew is not None:
                linea.endY = endYNew
            if pinIdIniNew is not None:
                linea.pinIdIni = pinIdIniNew
            if pinIdEndNew is not None:
                linea.pinIdEnd = pinIdEndNew
            if x1OriginalNew is not None:
                linea.x1Original = x1OriginalNew
            if y1OriginalNew is not None:
                linea.y1Original = y1OriginalNew
            if x2OriginalNew is not None:
                linea.x2Original = x2OriginalNew
            if y2OriginalNew is not None:
                linea.y2Original = y2OriginalNew
            if StartLatNew is not None:
                linea.StartLat = StartLatNew
            if StartLngNew is not None:
                linea.StartLng = StartLngNew
            if EndLatNew is not None:
                linea.EndLat = EndLatNew
            if EndLngNew is not None:
                linea.EndLng = EndLngNew
            if sourceNew is not None:
                nodoSourceNewFilter = Nodo.objects.filter(idred_id=idredNew, idNodo=receptorNew)
                if nodoSourceNewFilter:
                    nodoSourceNew = Nodo.objects.get(idred_id=idredNew, idNodo=sourceNew)
                    linea.source = nodoSourceNew
            if receptorNew is not None:
                nodoReceptorNewFilter = Nodo.objects.filter(idred_id=idredNew, idNodo=receptorNew)
                if nodoReceptorNewFilter:
                    nodoReceptorNew = Nodo.objects.get(idred_id=idredNew, idNodo=receptorNew)
                    linea.receptor = nodoReceptorNew
            if sentidoNew is not None:
                linea.sentido = sentidoNew
            if zLineNew is not None:
                linea.zLine = zLineNew
            if ILBNew is not None:
                linea.ILB = "[" +  ILBNew + "]" 
            if IUBNew is not None:
                linea.IUB = "[" +  IUBNew + "]" 
            if zOperNew is not None:
                linea.zOper = "[" +  zOperNew + "]" 

            if sourceNew is not None and receptorNew is not None:
                # Defino el subtipo de linea que es (Si conecta bus/bus subtipo A - Si conecta bus/Load DG grid subtipo B)
                if nodoReceptorNew.idtiponodo == TipoNodo.objects.get(pk=1) and nodoSourceNew.idtiponodo == TipoNodo.objects.get(pk=1):
                    linea.idsubtipo = "A";
                else:
                    linea.idsubtipo = "B";
                     
            linea.save() 
        # Devuelve una respuesta de éxito con la linea modificada
        return Response(
            {"message": f"{LineaModificar} lineas modificadas."},
            status=status.HTTP_200_OK
        )
    
    # Función para chequear la existencia de una linea
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def check(self, request):
        # Obtiene los valores de ID de la red y de los nodos del cuerpo de la solicitud
        idred = request.data.get('idred')
        nodo1ID = request.data.get('nodo1')
        nodo2ID = request.data.get('nodo2') 
        # Verifica si se proporcionó el id de la red y de los nodo1 y del nodo2
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)
        if nodo1ID is None:
            return Response({"error": "nodo1ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        if nodo2ID is None:
            return Response({"error": "nodo2ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        nodo1 = Nodo.objects.filter(idred_id=idred, idNodo=nodo1ID)    
        nodo2 = Nodo.objects.filter(idred_id=idred, idNodo=nodo2ID)

        # Primero chequeo si los nodos existen
        if nodo1.exists() and nodo2.exists():
            # Si existen los obetengo
            nodo1 = Nodo.objects.get(idred_id=idred, idNodo=nodo1ID)    
            nodo2 = Nodo.objects.get(idred_id=idred, idNodo=nodo2ID)
            FlagLineaExistente1= Linea.objects.filter(idred=idred, source=nodo1, receptor=nodo2).exists()
            FlagLineaExistente2= Linea.objects.filter(idred=idred, source=nodo2, receptor=nodo1).exists()
        else: 
            FlagLineaExistente1 = False
            FlagLineaExistente2 = False               

        flagExist =False
        if FlagLineaExistente1 or FlagLineaExistente2:
            flagExist =True        

        # Impido que se puedan conectar 2 grid a un bus
        if nodo1.idtiponodo == TipoNodo.objects.get(pk=1) and nodo2.idtiponodo == TipoNodo.objects.get(pk=7):
            if nodo1.grid:           
               flagExist =True   
        if nodo1.idtiponodo == TipoNodo.objects.get(pk=7) and nodo2.idtiponodo ==  TipoNodo.objects.get(pk=1):
            if nodo2.grid:          
               flagExist =True   

        return Response(
            {flagExist}
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