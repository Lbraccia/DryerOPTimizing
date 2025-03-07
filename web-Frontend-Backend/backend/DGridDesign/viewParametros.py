from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from .models import Dryer, Parameters#Red, Parameters, Nodo, Linea
from .serializer import ParametersSerializer
from django_filters.rest_framework import DjangoFilterBackend

#====================================================================#
#=============== Funciones para los Parámetros ======================#
#====================================================================#    
class ParametersViewSet(viewsets.ModelViewSet):
    queryset = Parameters.objects.all()
    serializer_class = ParametersSerializer

    def createParameters(self, request):
        idred = request.data.get('idred')
        P = request.data.get('P')
        idKey = request.data.get('idKey')
        N = request.data.get('N')
        NG1 = request.data.get('NG1')
        NG2 = request.data.get('NG2')
        NG3 = request.data.get('NG3')
        S = request.data.get('S')
        NLoad = request.data.get('NLoad')
        NStorage = request.data.get('NStorage')
        NLine = request.data.get('NLine')
        Nnodos = request.data.get('Nnodos')
        Layer = request.data.get('Layer')
        centerLat = request.data.get('centerLat')
        centerLng = request.data.get('centerLng')
        zoom = request.data.get('zoom')
        zoomScale = request.data.get('zoomScale')
        ColorLine = request.data.get('ColorLine')
        WidthLine = request.data.get('WidthLine')
        ColorNode = request.data.get('ColorNode')
        WidthNode = request.data.get('WidthNode')
        pinColor = request.data.get('pinColor')
        NS = request.data.get('NS')
        NQP = request.data.get('NQP')
        kw_W = request.data.get('kw_W')
        Omhs_Komhs = request.data.get('Omhs_Komhs')
        Vnom = request.data.get('Vnom')
        ke = request.data.get('ke')
        kI = request.data.get('kI')
        VUBg = request.data.get('VUBg')
        VLBg = request.data.get('VLBg')
        maxVLB = request.data.get('maxVLB')
        minVUB = request.data.get('minVUB')
        IUBg = request.data.get('IUBg')
        ILBg = request.data.get('ILBg')
        PUBg = request.data.get('PUBg')
        PLBg = request.data.get('PLBg')
        QUBg = request.data.get('QUBg')
        QLBg = request.data.get('QLBg')
        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)\
        # Verifica si se proporcionó 'P'
        if P is None:
            return Response({"error": "P is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'idKey'
        if idKey is None:
            return Response({"error": "idKey is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'N'
        if N is None:
            return Response({"error": "N is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'NG1'
        if NG1 is None:
            return Response({"error": "NG1 is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'NG2'
        if NG2 is None:
            return Response({"error": "NG2 is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'NG3'
        if NG3 is None:
            return Response({"error": "NG3 is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'S'
        if S is None:
            return Response({"error": "S is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'NLoad'
        if NLoad is None:
            return Response({"error": "NLoad is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'NStorage'
        if NStorage is None:
            return Response({"error": "NStorage is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'NLine'
        if NLine is None:
            return Response({"error": "NLine is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'Nnodos'
        if Nnodos is None:
            return Response({"error": "Nnodos is required"}, status=status.HTTP_400_BAD_REQUEST)
        if Layer is None:
            return Response({"error": "Layer is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'centerLat'
        if centerLat is None:
            return Response({"error": "centerLat is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'centerLng'
        if centerLng is None:
            return Response({"error": "centerLng is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Verifica si se proporcionó 'zoom'
        if zoom is None:
            return Response({"error": "zoom is required"}, status=status.HTTP_400_BAD_REQUEST)     
        # Verifica si se proporcionó 'zoomScale'   
        if zoomScale is None:
            return Response({"error": "zoomScale is required"}, status=status.HTTP_400_BAD_REQUEST)       
        # Verifica si se proporcionó 'ColorLine' 
        if ColorLine is None:
            return Response({"error": "ColorLine is required"}, status=status.HTTP_400_BAD_REQUEST)     
        # Verifica si se proporcionó 'WidthLine'   
        if WidthLine is None:
            return Response({"error": "WidthLine is required"}, status=status.HTTP_400_BAD_REQUEST)        
        # Verifica si se proporcionó 'ColorNode'
        if ColorNode is None:
            return Response({"error": "ColorNode is required"}, status=status.HTTP_400_BAD_REQUEST)  
        # Verifica si se proporcionó 'WidthNode'      
        if WidthNode is None:
            return Response({"error": "WidthNode is required"}, status=status.HTTP_400_BAD_REQUEST)      
        # Verifica si se proporcionó 'pinColor'  
        if pinColor is None:
            return Response({"error": "pinColor is required"}, status=status.HTTP_400_BAD_REQUEST)        

        # Verifica si se proporcionó 'VUBg'  
        if VUBg is None:
            return Response({"error": "VUBg is required"}, status=status.HTTP_400_BAD_REQUEST)     

        # Verifica si se proporcionó 'VLBg'  
        if VLBg is None:
            return Response({"error": "VLBg is required"}, status=status.HTTP_400_BAD_REQUEST)     

        # Verifica si se proporcionó 'maxVLB'  
        if maxVLB is None:
            return Response({"error": "maxVLB is required"}, status=status.HTTP_400_BAD_REQUEST)     


        # Verifica si se proporcionó 'minVUB'  
        if minVUB is None:
            return Response({"error": "minVUB is required"}, status=status.HTTP_400_BAD_REQUEST)  

        # Verifica si se proporcionó 'IUBg'  
        if IUBg is None:
            return Response({"error": "IUBg is required"}, status=status.HTTP_400_BAD_REQUEST)  

        # Verifica si se proporcionó 'ILBg'  
        if ILBg is None:
            return Response({"error": "ILBg is required"}, status=status.HTTP_400_BAD_REQUEST)  
       

       # Verifica si se proporcionó 'PUBg'  
        if PUBg is None:
            return Response({"error": "PUBg is required"}, status=status.HTTP_400_BAD_REQUEST)  

        # Verifica si se proporcionó 'PLBg'  
        if PLBg is None:
            return Response({"error": "PLBg is required"}, status=status.HTTP_400_BAD_REQUEST)  
     
        # Verifica si se proporcionó 'QUBg'  
        if QUBg is None:
            return Response({"error": "QUBg is required"}, status=status.HTTP_400_BAD_REQUEST)  

        # Verifica si se proporcionó 'QLBg'  
        if QLBg is None:
            return Response({"error": "QLBg is required"}, status=status.HTTP_400_BAD_REQUEST)  
     
        # Obtengo la Red
        red = Red.objects.get(pk=idred) 

        # Verifico si la linea ya está cread
        ParametersExist = Parameters.objects.filter(idred=red)

        if ParametersExist.count() == 0:
            # Creo los nuevos parámetros asociados a la red
            NewParameters = Parameters.objects.create(idred=red,
                                            P=P,
                                            idKey=idKey,
                                            N=N,
                                            NG1= NG1,
                                            NG2= NG2,
                                            NG3= NG3,
                                            S= S,
                                            NLoad= NLoad,
                                            NStorage= NStorage,
                                            NLine= NLine,
                                            Nnodos= Nnodos,
                                            Layer = Layer,
                                            centerLat= centerLat,
                                            centerLng= centerLng,
                                            zoom= zoom,
                                            zoomScale= zoomScale,
                                            ColorLine= ColorLine,
                                            WidthLine= WidthLine,
                                            ColorNode= ColorNode,
                                            WidthNode= WidthNode,
                                            pinColor= pinColor,
                                            NS= NS,
                                            NQP = NQP,
                                            kw_W = kw_W,
                                            Omhs_Komhs = Omhs_Komhs,
                                            Vnom = Vnom, 
                                            ke = ke,
                                            kI = kI,
                                            VUBg = VUBg,
                                            VLBg = VLBg,
                                            maxVLB = maxVLB,
                                            minVUB = minVUB, 
                                            IUBg = IUBg,
                                            ILBg = ILBg,
                                            PUBg = PUBg,
                                            PLBg = PLBg,
                                            QUBg = QUBg,
                                            QLBg = QLBg 
                                            )
            NewParameters.save() 

            # Devuelve una respuesta de éxito con la linea nueva
            return Response(
                {"message": f" {NewParameters} lineas nueva."},
                status=status.HTTP_200_OK
            )
        else:
            # Devuelve una respuesta de éxito diciendo que la linea ya existe
            return Response(
                {"message": f" Parametro Ya Existente."},
                status=status.HTTP_200_OK
            )    
        
    # Funcion filtrar los valores de acuerdo a la idred, nombre, source, receptor
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def filtrar(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idred = request.data.get('idred')

        # Verifica si se proporcionó 'idred'
        if idred is None:
            return Response({"error": "idred is required"}, status=status.HTTP_400_BAD_REQUEST)
    
        if idred != None:
           # Filtra todos los parametros para una idred
           Parametros = Parameters.objects.filter(idred=idred)

        serializer = ParametersSerializer(Parametros, many=True)        
        # Devuelve una respuesta de éxito con el nodo filtrado
        return Response(
                {"message": serializer.data},
            status=status.HTTP_200_OK
        )

    #Funcion para cambiar los valores de los parametros
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def change(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idredOriginal = request.data.get('idredOriginal')
        # Nuevos valores 
        PNew = request.data.get('PNew')
        idKeyNew = request.data.get('idKeyNew')
        NNew = request.data.get('NNew')
        NG1New = request.data.get('NG1New')
        NG2New = request.data.get('NG2New')
        NG3New = request.data.get('NG3New')
        SNew = request.data.get('SNew')
        NLoadNew = request.data.get('NLoadNew')
        NStorageNew = request.data.get('NStorageNew')
        NLineNew = request.data.get('NLineNew')
        NnodosNew = request.data.get('NnodosNew')
        LayerNew = request.data.get('LayerNew')
        centerLatNew = request.data.get('centerLatNew')
        centerLngNew = request.data.get('centerLngNew')
        zoomNew = request.data.get('zoomNew')
        zoomScaleNew = request.data.get('zoomScaleNew')
        ColorLineNew = request.data.get('ColorLineNew')
        WidthLineNew = request.data.get('WidthLineNew')
        ColorNodeNew = request.data.get('ColorNodeNew')
        WidthNodeNew = request.data.get('WidthNodeNew')
        pinColorNew = request.data.get('WidthNodeNew')
        NSNew = request.data.get('NSNew')
        NQPNew = request.data.get('NQPNew')
        kw_WNew = request.data.get('kw_WNew')
        Omhs_KomhsNew = request.data.get('Omhs_KomhsNew')
        VnomNew = request.data.get('VnomNew')
        keNew = request.data.get('keNew')
        kINew = request.data.get('kINew')
        VUBgNew = request.data.get('VUBgNew') 
        VLBgNew = request.data.get('VLBgNew')
        maxVLBNew = request.data.get('maxVLBNew')
        minVUBNew = request.data.get('minVUBNew')
        IUBgNew = request.data.get('IUBgNew')
        ILBgNew = request.data.get('ILBgNew')
        PUBgNew = request.data.get('PUBgNew')
        PLBgNew = request.data.get('PLBgNew')
        QUBgNew = request.data.get('QUBgNew')
        QLBgNew = request.data.get('QLBgNew')   
        # Periodo en el que se está cambiando el Voltaje
        Pvalue = request.data.get('Pvalue')  
        # Verifica si se proporcionó 'idred y el nombre'
        if idredOriginal is None:
            return Response({"error": "idredOriginal is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Obtengo la red a modificar
        ParametersModificar = Parameters.objects.filter(idred=idredOriginal)

        for parameter in ParametersModificar:
            if PNew is not None:
                # Si se cambia el numero de periodos
                P =  parameter.P  # Valor original de P
                parameter.P = PNew # Actualizo el valor de P en los parametros

                parmVnom = textfield2float(parameter.Vnom)
                parmVnom = ajustar_vector(parmVnom, P, PNew, parmVnom[0]) # Agrego el primer valor
                parameter.Vnom = parmVnom

                # Actualizo los valores de p de cada nodo:
                Busses = Nodo.objects.filter(idred=idredOriginal , idtiponodo=1)
                for bus in Busses:
                    BusP = textfield2float(bus.p)
                    BusQ = textfield2float(bus.q)
                    BuszOper = textfield2float(bus.zOper)
                    # Incorporo valores 0 a las P y Q y 1 a las zOper (Si PNew > P) o quito elementos (Si PNew < P) 
                    BusP = ajustar_vector(BusP, P, PNew, 0)
                    BusQ = ajustar_vector(BusQ, P, PNew, 0)
                    BuszOper = ajustar_vector(BuszOper, P, PNew, 1)

                    # Incorporo valores a los limites del Voltaje y al nuevo valor
                    BusVLB = textfield2float(bus.VLB)
                    BusVUB = textfield2float(bus.VUB)
                    BusVLB = ajustar_vector(BusVLB, P, PNew, parameter.VLBg)
                    BusVUB = ajustar_vector(BusVUB, P, PNew, parameter.VUBg)
                    

                    # Actualizo los valores de las p, q y Zoper 
                    bus.p = str(BusP) 
                    bus.q = str(BusQ) 
                    bus.VLB = str(BusVLB) 
                    bus.VUB = str(BusVUB) 
                    bus.zOper = str(BuszOper) 
                    bus.save() 

                Geneartions = Nodo.objects.filter(idred=idredOriginal, idtiponodo__in=[2, 3, 4, 5])
                for gen in Geneartions:
                    # Incorporo valores en los limites de las generaciones
                    GenpLB = textfield2float(gen.pLB)
                    GenpUB = textfield2float(gen.pUB)
                    GenqLB = textfield2float(gen.qLB)
                    GenqUB = textfield2float(gen.qUB)

                    # Incorporo el valor del límite en los períodos creados 
                    
                    GenpUB = ajustar_vector(GenpUB, P, PNew, parameter.PUBg)
                    GenqUB = ajustar_vector(GenqUB, P, PNew, parameter.QUBg)

                    if gen.idtiponodo != 5:
                       #si la generación no es una bateria coloco como limite inferior 0
                        GenpLB = ajustar_vector(GenpLB, P, PNew, 0)
                        GenqLB = ajustar_vector(GenqLB, P, PNew, 0) 
                    else:
                        GenpLB = ajustar_vector(GenpLB, P, PNew, parameter.PLBg)
                        GenqLB = ajustar_vector(GenpLB, P, PNew, parameter.QLBg)

                    GenzOper = textfield2float(gen.zOper)
                    # Incorporo valores de -1 a las zOper (Si PNew > P) o quito elementos (Si PNew < P) 
                    GenzOper = ajustar_vector(GenzOper, P, PNew, -1)
                    # Actualizo los valores de las pLB, pUB, qLB, qUB y Zoper 
                    gen.pLB = str(GenpLB) 
                    gen.pUB = str(GenpUB) 
                    gen.qLB = str(GenqLB) 
                    gen.qUB = str(GenqUB) 

                    gen.zOper = str(GenzOper) 
                    gen.save() 
                
                Lineas = Linea.objects.filter(idred=idredOriginal, idsubtipo="A")
                for linea in Lineas:
                    # Incorporo valores en los limites de las generaciones
                    lineaILB= textfield2float(linea.ILB)
                    lineaIUB= textfield2float(linea.IUB)
                    # Incorporo los limites gobales
                    lineaILB = ajustar_vector(lineaILB, P, PNew, parameter.ILBg)
                    lineaIUB = ajustar_vector(lineaIUB, P, PNew, parameter.IUBg)


                    lineazOper = textfield2float(linea.zOper)
                    # Incorporo valores de -1 a las zOper (Si PNew > P) o quito elementos (Si PNew < P) 
                    lineazOper = ajustar_vector(lineazOper, P, PNew, 1)

                    # Guardo los nuevos valores
                    linea.ILB = str(lineaILB)
                    linea.IUB = str(lineaIUB)
                    linea.zOper = str(lineazOper)
                    linea.save()
                    
            if idKeyNew is not None:
                parameter.idKey = idKeyNew
            if NNew is not None:
                parameter.N = NNew
            if NG1New is not None:
                parameter.NG1 = NG1New
            if NG2New is not None:
                parameter.NG2 = NG2New
            if NG3New is not None:
                parameter.NG3 = NG3New
            if SNew is not None:
                parameter.S = SNew
            if NLoadNew is not None:
                parameter.NLoad = NLoadNew
            if NStorageNew is not None:
                parameter.NStorage = NStorageNew
            if NLineNew is not None:
                parameter.NLine = NLineNew
            if NnodosNew is not None:
                parameter.Nnodos = NnodosNew
            if LayerNew is not None:
                parameter.Layer = LayerNew
            if centerLatNew is not None:
                parameter.centerLat = centerLatNew
            if centerLngNew is not None:
                parameter.centerLng = centerLngNew
            if zoomNew is not None:
                parameter.zoom = zoomNew
            if zoomScaleNew is not None:
                parameter.zoomScale = zoomScaleNew
            if ColorLineNew is not None:
                parameter.ColorLine = ColorLineNew
            if WidthLineNew is not None:
                parameter.WidthLine = WidthLineNew
            if ColorNodeNew is not None:
                parameter.ColorNode = ColorNodeNew
            if WidthNodeNew is not None:
                parameter.WidthNode = WidthNodeNew
            if pinColorNew is not None:
                parameter.pinColor = pinColorNew
            if NSNew is not None:
                parameter.NS = NSNew
            if NQPNew is not None:
                parameter.NQP = NQPNew
            if kw_WNew is not None:
                parameter.kw_W = kw_WNew
            if Omhs_KomhsNew is not None:
                parameter.Omhs_Komhs = Omhs_KomhsNew
            if VnomNew is not None:
                # Si se cambia el voltaje nominal (Cambio los limites superiores e inferiores de todos los nodos)
                nodos = Nodo.objects.filter(idred=idredOriginal, idtiponodo__in=[1])
                p = int(Pvalue)
                VectorVnom = textfield2float(parameter.Vnom)
                VectorVnomNew = textfield2float(VnomNew)
                deltaV = VectorVnom[p] - VectorVnomNew[int(p)]

                for nodo in nodos:
                   
                    VectorVLB = textfield2float(nodo.VLB)
                    VectorVUB = textfield2float(nodo.VUB)
                    VLBNew = VectorVLB[p] - deltaV
                    VUBNew = VectorVUB[p] - deltaV

                    if VLBNew < parameter.VLBg:
                        # Si el nuevo limite inferior es menor al limite inferior global (toma ese valor)
                        VLBNew = parameter.VLBg

                    if VUBNew > parameter.VUBg:
                        # Si el nuevo limite superior es mayor al limite superior global (toma ese valor)
                        VUBNew = parameter.VUBg

                    VectorVLB[p] = VLBNew
                    VectorVUB[p] = VUBNew
                    nodo.VLB =  VectorVLB # str(VectorVLB)      
                    nodo.VUB =  VectorVUB #str(VectorVUB)   
                    nodo.save()

                parameter.Vnom =  "[" +  VnomNew + "]"     

            if keNew is not None:
                parameter.ke = keNew
            if kINew is not None:
                parameter.kI = kINew
            if VUBgNew is not None:
                parameter.VUBg = VUBgNew
            if VLBgNew is not None:
                parameter.VLBg = VLBgNew
            if maxVLBNew is not None:
                parameter.maxVLB = maxVLBNew
            if minVUBNew is not None:
                parameter.minVUB = minVUBNew
            if IUBgNew is not None:
                parameter.IUBg = IUBgNew
            if ILBgNew is not None:
                parameter.ILBg = ILBgNew
            if PUBgNew is not None:
                parameter.PUBg = PUBgNew
            if PLBgNew is not None:
                parameter.PLBg = PLBgNew
            if QUBgNew is not None:
                parameter.QUBg = QUBgNew
            if QLBgNew is not None:
                parameter.QLBg = QLBgNew

            parameter.save()

        # Devuelve una respuesta de éxito con la linea modificada
        return Response(
            {"message": f"{ParametersModificar} se modificaron los parametros."},
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



def ajustar_vector(vector, P, PNew, addValue):
    """
    Ajusta el tamaño del vector Nodop según los valores de P y PNew.

    Args:
        Nodop: Una lista que representa el vector.
        P: El tamaño actual del vector.
        PNew: El nuevo tamaño deseado.
        addValue: El valor que se desea agreagar
    """

    # Si el nuevo tamaño es mayor, extendemos el vector con ceros
    if PNew > P:
        vector.extend([addValue] * (PNew - P))
    # Si el nuevo tamaño es menor, truncamos el vector
    elif PNew < P:
        del vector[PNew:]
    
    return vector