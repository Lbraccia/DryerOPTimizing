from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from .models import Usuario, Dryer, Parameters#Conexiones, TipoNodo, Red, Nodo, Linea, Solutions, Parameters
from .serializer import UsuarioSerializer, ConexionesSerializer, TipoNodoSerializer, RedSerializer
from .serializer import NodoSerializer, LineaSerializer, ParametersSerializer, SolutionsSerializer
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

class SolutionsViewSet(viewsets.ModelViewSet):
    queryset = Solutions.objects.all()
    serializer_class = SolutionsSerializer


    # Funcion filtrar los valores de acuerdo a la idred, nombre
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def filtrar(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idUser = request.data.get('idUser')
        nombre = request.data.get('nombre')
        idred = request.data.get('idred')
        """  print(f"idred: {idred}") """
        # Verifica si se proporcionó 'idred'
        """ if idUser is None:
            return Response({"error": "idUser is required"}, status=status.HTTP_400_BAD_REQUEST) """
        if idred is None:
            return Response({"error": "idUsidreder is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        """ Redes = Red.objects.filter(idUser=idUser, id = idred) """
        filtered_solutions = Solutions.objects.filter(idred=idred)  
        
        # Check if any solutions were found
        if not filtered_solutions.exists():
            return Response({"message": "No solutions found with the provided idred."}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the filtered solutions
        serializer = SolutionsSerializer(filtered_solutions, many=True)

        return Response(
            {"message": serializer.data},
            status=status.HTTP_200_OK
        )
    

    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def Design(self, request):
        #inicializo el flag de la terminacion
        flag_termination_status = False
        idred = request.data.get('idred')
        idUser = request.data.get('idUser')
        #Obtengo el usuario
        user = Usuario.objects.get(pk=idUser)
        # Obtengo la red
        red = Red.objects.get(idUser=user,pk=idred)
        # Obtengo los nodos
        nodos = Nodo.objects.filter(idred=red)        
        # Obtengo los buses las cargas, los dg1/2/3 y grid
        Busses = Nodo.objects.filter(idred=idred, idtiponodo=1)
        Load = Nodo.objects.filter(idred=idred, idtiponodo=6)
        DG1s = Nodo.objects.filter(idred=idred, idtiponodo=2)
        DG2s = Nodo.objects.filter(idred=idred, idtiponodo=3)
        DG3s = Nodo.objects.filter(idred=idred, idtiponodo=4)
        Grid = Nodo.objects.filter(idred=idred, idtiponodo=7)

        # Vuelvo a colocar como vacio las p y q de los generadores
        for dg1 in DG1s:
            dg1.p = "[]"
            dg1.q = "[]"
            dg1.save()
        for dg2 in DG2s:
            dg2.p = "[]"
            dg2.q = "[]"
            dg2.save()
        for dg3 in DG3s:
            dg3.p = "[]"
            dg3.q = "[]"
            dg3.save()
        for bus in Busses:
            bus.V = "[]"
            bus.save()

        # Obtengo las lineas
        lineas = Linea.objects.filter(idred=red)
        # vuelvo colocar vacio los parametros de las lineas
        for linea in lineas:
            linea.P = "[]"
            linea.Q = "[]"
            linea.I = "[]"
            linea.save()

        # Obtengo las solución al problema lineas
        Solucions = Solutions.objects.filter(idred=red)
        # vuelvo colocar vacio los parametros de las lineas
        for Solucion in Solucions:
            Solucion.Obj = 0
            Solucion.power_losses = 0
            Solucion.time = 0
            Solucion.status = 'non-solved'
            Solucion.flag_termination_status = False
            Solucion.SolverTermination = 'non-solved'
            Solucion.save()


        # Obtengo los parametros
        Parametros = Parameters.objects.filter(idred=idred)

        #"=== Obtengo los parámetros ==="
        for parameter in Parametros:
            P = parameter.P
            Nnodos = parameter.Nnodos # Numero totales de Nodos (N + NG1 + NG2 + NG3 + S + NLoad + NStorage)
            NLine = parameter.NLine # Numero de lineas
            N = parameter.N # Numero de Buses   
            NG1 = parameter.NG1 # Numero de generacion tipo 1
            NG2 = parameter.NG2 # Numero de generacion tipo 2
            NG3 = parameter.NG3 # Numero de generacion tipo 3
            S = parameter.S # Numero de fuentes
            NLoad = parameter.NLoad # Numero de cargas
            NStorage = parameter.NStorage # Numero de storage
            NS = parameter.NS # Numero de discretizaciones 
            NQP = parameter.NQP # Numero de discretizaciones para Q y P

            kw_W = float(parameter.kw_W) # Numero de discretizaciones para Q y P
            Omhs_Komhs = float(parameter.Omhs_Komhs) # Cambio de unidades de Omhs a kOmhs
            Vnom = ast.literal_eval(parameter.Vnom) #float(parameter.Vnom) # Voltaje nominal de referencia
            ke = float(parameter.ke) # costo US$/kW-year
            kI = float(parameter.kI) # costo US$/kW-year (Inversion Cost)

        # Limites para la corriente y el voltage (debería poner un limite para cada linea y para cada nodo)
        # Unidades de Corriente [A]
        IUBValue = 500
        ILBValue = -500
        VUBValue = 1.15*Vnom[0]
        VLBValue = 0.85*Vnom[0]

        print(f'Vnom: {Vnom}')
        print(f'type Vnom: {type(Vnom)}')
        # Crear un defaultdict de defaultdicts
        Bus = Dict()
        VUB = Dict()
        VLB = Dict()

        structure_given = True  # Establece si las posiciones de los nodos son dadas
        for bus in Busses:
            bus.p = ast.literal_eval(bus.p)
            bus.q = ast.literal_eval(bus.q)

            for p in range(0,P):
               
                Bus[int(bus.idNodo),"PD",p+1] = bus.p[p] # Al periodo le sumo 1 para que sea de 1 a P
                Bus[int(bus.idNodo),"QD",p+1] = bus.q[p] # Al periodo le sumo 1 para que sea de 1 a P

                VLB[int(bus.idNodo)] = VLBValue # Limite de Voltages
                VUB[int(bus.idNodo)] = VUBValue # Limite de Voltages

                # Inicializo el N_DG y 
                Bus[int(bus.idNodo),"N_DG", p+1] = 0 # Numero de DG en el bus i y el periodo p
                Bus[int(bus.idNodo),"fi", p+1] = {} # fi de cada DG conectado al bus i y el periodo p
       
        NodeDG = [[] for _ in range(0,P+1)]# [[],[]] #Dict() # Nodos dond existe DG
        NodeSB = [[] for _ in range(0,P+1)]# [[],[]] #Dict() # Nodos dond existe DG
        grid_bus_conection = {} #[[] for _ in range(0,P+1)]
        bus_grid_conection = {}
        Line = Dict()
        ZLine = Dict()
        IUB = Dict()
        ILB = Dict()
        ## Limits for Pg and Qg (Deberia ser para cada nodo DG)
        PgUB_val = 1e3
        PgLB_val = 0
        QgUB_val = 1e3
        QgLB_val = 0

        PgUB = Dict()
        PgLB = Dict()
        QgUB = Dict()
        QgLB = Dict()
        for linea in lineas:
            # Obtengo los nodos que conecta la linea
            nodoSource = Nodo.objects.filter(idred=red, pk=linea.source_id)
            nodoReceptor = Nodo.objects.filter(idred=red, pk=linea.receptor_id)
            i= int(nodoSource[0].idNodo)
            j =int(nodoReceptor[0].idNodo)
            # Si la linea conecta dos Busse (Tipo A)
            if linea.idsubtipo == "A":
                # Paso a una matriz
                linea.zOper = ast.literal_eval(linea.zOper)
                for p in range(0,P):
                    r = float(linea.r)
                    x = float(linea.x)
                    Line[i, j,p+1]= [r*Omhs_Komhs, x*Omhs_Komhs] # Los valores R y X de las lineas no están desplegados para p  
                    ZLine[i,j,p+1] = linea.zOper[p] # Al periodo le sumo 1 para que sea de 1 a P
                    IUB[i,j]=IUBValue; #Limite Superior sobre la corriente
                    ILB[i,j]=ILBValue; #Limite Superior sobre la corriente
                    
            # Si la linea conecta un bus y un DG, Load o Grid (Tipo A)
            elif linea.idsubtipo == "B":
                source_type = nodoSource[0].idtiponodo
                receptor_type = nodoReceptor[0].idtiponodo
                Type_Bus= TipoNodo.objects.get(pk=1)
                Type_DG1= TipoNodo.objects.get(pk=2)
                Type_DG2= TipoNodo.objects.get(pk=3)
                Type_DG3= TipoNodo.objects.get(pk=4)
                Type_Storage= TipoNodo.objects.get(pk=5)
                Type_Load= TipoNodo.objects.get(pk=6)
                Type_grid= TipoNodo.objects.get(pk=7)
                if source_type == Type_Bus and (receptor_type == Type_DG1 or receptor_type == Type_DG2 or receptor_type == Type_DG3 or receptor_type == Type_Storage):
                    
                    for p in range(0,P):
                        # si el nodo fuente es un bus y el nodo receptor es un DG (el bus es el set i)                    
                        Bus[i,"N_DG", p+1] = int(Bus[i,"N_DG", p+1]) + 1 # Agrego un DG asociado al nodo
                        #Bus[i,"fi", p+1] = { (nodoReceptor[0].nombre): textfield2float(nodoReceptor[0].fi)[0]   }

                        if Bus[i,"fi", p+1] is None or not Bus[i,"fi", p+1]:
                            # Si no existe o está vacío, lo creamos
                            Bus[i,"fi", p+1] = {}

                        Bus[i, "fi", p+1][nodoReceptor[0].idNodo] = textfield2float(nodoReceptor[0].fi)[0]
                        
                        #Codigo Anterior
                        #Bus[i,"fi", p+1].append(textfield2float(nodoReceptor[0].fi)[0]) # Agrego el fi del DG (el fi en la actualidad no está por periodos)
                        
                        N_DG =  int(Bus[i,"N_DG", p+1])
                        #Tomando los limites de cada DG
                        PgUB[i, nodoReceptor[0].idNodo, p+1] = nodoReceptor[0].pUB
                        PgLB[i, nodoReceptor[0].idNodo, p+1] = nodoReceptor[0].pLB
                        QgUB[i, nodoReceptor[0].idNodo, p+1] = nodoReceptor[0].qUB
                        QgLB[i, nodoReceptor[0].idNodo, p+1] = nodoReceptor[0].qLB

                        if i not in NodeDG[p+1]:
                            NodeDG[p+1].append(i)
                            
                elif receptor_type == Type_Bus and (source_type == Type_DG1 or source_type == Type_DG2 or source_type == Type_DG3 or source_type == Type_Storage):
                    for p in range(0,P):
                        # si el nodo receptor es un bus y el nodo fuente es un DG (el bus es el set j) 
                        Bus[j,"N_DG", p+1] = int(Bus[j,"N_DG", p+1]) + 1  # Agrego un DG asociado al nodo
                        
                        if Bus[j,"fi", p+1] is None or not Bus[j,"fi", p+1]:
                            # Si no existe o está vacío, lo creamos
                            Bus[j,"fi", p+1] = {}
                        
                        Bus[j,"fi", p+1][nodoSource[0].idNodo] = textfield2float(nodoSource[0].fi)[0]
                        #Codigo Anterior
                        #Bus[j,"fi", p+1].append(textfield2float(nodoSource[0].fi)[0]) # Agrego el fi del DG (el fi en la actualidad no está por periodos)
                        N_DG =  int(Bus[j,"N_DG", p+1])

                        #Tomando los limites de cada DG
                        PgUB[j, nodoSource[0].idNodo, p+1] = nodoSource[0].pUB
                        PgLB[j, nodoSource[0].idNodo, p+1] = nodoSource[0].pLB
                        QgUB[j, nodoSource[0].idNodo, p+1] = nodoSource[0].qUB
                        QgLB[j, nodoSource[0].idNodo, p+1] = nodoSource[0].qLB
                        

                        if j not in NodeDG[p+1]:
                            NodeDG[p+1].append(j)

                elif source_type == Type_Bus and (receptor_type == Type_grid):
                     for p in range(0,P):
                        if i not in NodeSB[p+1]:
                                NodeSB[p+1].append(i)
                        #source_bus_conection.append({(i, p): j})
                        bus_grid_conection[(i, p)] = j
                        grid_bus_conection[(j, p)] = i
                elif receptor_type == Type_Bus and (source_type == Type_grid):
                     for p in range(0,P):
                        if j not in NodeSB[p+1]:
                                NodeSB[p+1].append(j)
                        #source_bus_conection.append({(j, p): i})
                        bus_grid_conection[(j, p)] = i
                        grid_bus_conection[(i, p)] = j
 
        #for p in range(1,P+1):
        #    for nodesdgE in NodeDG[p]:
        #        N_DG = Bus[nodesdgE, "N_DG", p]# Obtengo cuantas dg hay en el nodo
        #        #for i in range(1, N_DG + 1):
        #        PgUB[nodesdgE,i, p] = PgUB_val
        #        PgLB[nodesdgE,i, p] = PgLB_val
        #        QgUB[nodesdgE,i, p] = QgUB_val
        #        QgLB[nodesdgE,i, p] = QgLB_val



        #print(SCRIPT_ROOT)

        dataFolder = './DGridDesign/script/DGridX/v1.00/Data/' + str(user.userName)
        os.makedirs(dataFolder, exist_ok=True)

        saveFolder = './DGridDesign/script/DGridX/v1.00/Solutions/' + str(user.userName)
        os.makedirs(saveFolder, exist_ok=True)

        saveFolderImg = saveFolder + '/Img'
        os.makedirs(saveFolderImg, exist_ok=True)


        #saveFolder = './DGridDesign/script/DGridX/v1.00/Data/'
        # Creo el nombre del Problema
        fecha_hora_actual = datetime.now()
        # Formatear la fecha y hora para usarla en el nombre del archivo
        ProblemName = 'u_'+ str(user.userName) + '_id_' + str(red.nombre) + '_' + fecha_hora_actual.strftime('%Y%m%d_%H%M%S') 
        
        #with open(dataFolder + "/" + ProblemName + '.jl', "w") as file: # As julia file
        with open(dataFolder + "/" + ProblemName + '.py', "w") as file:  # As Python file
            # Iterar sobre los elementos de Bus y escribir cada uno en el archivo
            #file.write(f'#!/usr/bin/julia\n')
            file.write(f'#%%\n')
            #file.write(f'ProblemName = {str(ProblemName)}\n')
            file.write(f'#====== Data =================#\n')
            file.write(f'N= {N}; #Number of Node\n')
            file.write(f'NP= {P}; #Number of Period\n')
            file.write(f'# Linearization\n')
            file.write(f'NS_= {NS}; #Number of Discretization Point for Voltage Linearization\n')
            file.write(f'NQP_= {NQP}; #Number of Discretization Point for P and Q Linearization\n')

            file.write(f'kw_W= {kw_W}; # Cambio de unidad de kW a W\n')
            file.write(f'Omhs_Komhs= {Omhs_Komhs}; # Cambio de unidad de kW a W\n')
            file.write(f'Vnom= {Vnom}; #kW\n')
            file.write(f'ke= {ke};  # US$/kW-year\n')
            file.write(f'kI= {kI};  # US$/kW-year (Inversion Cost)\n')
            file.write(f'Ndg_syst= ""; #Maxima cantidad de dg en la red\n') # Falta agregar en el backend
            #file.write(f'Bus=Dict()\n')
            file.write(f'Bus=dict()\n')
            # Para escribir en orden
            for key, value in Bus.items():
                i, j, p = key
                if j == "PD":
                    file.write(f'Bus[{i},"{j}",{p}]= {value}; ') 
                elif j == "QD":
                    file.write(f'Bus[{i},"{j}",{p}]= {value};\n') 


            for key, value in Bus.items():
                i, j, p = key
                if j == "N_DG": #and (value != [] and value != 0):
                    file.write(f'Bus[{i},"{j}",{p}]= {value};\n') 

            for key, value in Bus.items():
                i, j, p = key
                if j == "fi" and value != []:
                    file.write(f'Bus[{i},"{j}",{p}]= {value};\n') 

            #file.write(f'Line=Dict()\n')
            file.write(f'Line=dict()\n')
            for key, value in Line.items():
                i, j, p = key
                file.write(f'Line[{i},{j},{p}]= {value};\n') 
            #file.write(f'ZLine=Dict()\n')
            file.write(f'ZLine=dict()\n')
            for key, value in ZLine.items():
                i, j, p = key
                file.write(f'ZLine[{i},{j},{p}]= {value};\n')
            #file.write(f'NodeDG=Dict()\n') 
            file.write(f'NodeDG=dict()\n')
            for p in range(1,len(NodeDG)):
                file.write(f'NodeDG[{p}]= {NodeDG[p]};\n') 

            #file.write(f'NodeSB=Dict()\n') 
            file.write(f'NodeSB=dict()\n') 
            for p in range(1,len(NodeSB)):
                file.write(f'NodeSB[{p}]= {NodeSB[p]};\n') 

            #file.write(f'PgUB=Dict()\n') 
            file.write(f'PgUB=dict()\n') 
            for key, value in PgUB.items():
                i, j, p = key
                file.write(f'PgUB[{i},{j},{p}]= {value};\n') 

            #file.write(f'PgLB=Dict()\n') 
            file.write(f'PgLB=dict()\n') 
            for key, value in PgLB.items():
                i, j, p = key
                file.write(f'PgLB[{i},{j},{p}]= {value};\n') 
            #file.write(f'QgUB=Dict()\n') 
            file.write(f'QgUB=dict()\n') 
            for key, value in QgUB.items():
                i, j, p = key
                file.write(f'QgUB[{i},{j},{p}]= {value};\n') 
            #file.write(f'QgLB=Dict()\n') 
            file.write(f'QgLB=dict()\n') 
            for key, value in QgLB.items():
                i, j, p = key
                file.write(f'QgLB[{i},{j},{p}]= {value};\n') 
            #file.write(f'VLB=Dict()\n') 
            file.write(f'VLB=dict()\n') 
            for key, value in VLB.items():
                i = key
                file.write(f'VLB[{i[0]}]= {value};\n') 
            #file.write(f'VUB=Dict()\n') 
            file.write(f'VUB=dict()\n') 
            for key, value in VUB.items():
                i = key
                file.write(f'VUB[{i[0]}]= {value};\n') 
            #file.write(f'IUB=Dict()\n') 
            file.write(f'IUB=dict()\n') 
            for key, value in IUB.items():
                i, j = key
                file.write(f'IUB[{i},{j}]= {value};\n') 
            #file.write(f'ILB=Dict()\n') 
            file.write(f'ILB=dict()\n') 
            for key, value in ILB.items():
                i, j = key
                file.write(f'ILB[{i},{j}]= {value};\n') 

        # Creo el arrego para guardar las soluciones (como vacío)
        result_obj={}
        # Funciona
        script_path = BASE_DIR + '/DGridDesign/script/DGridX/v1.00/'
        run_Optimization = BASE_DIR + '/DGridDesign/script/DGridX/v1.00/run_Distributed_Generation.py'
        command = [sys.executable, run_Optimization, script_path, ProblemName, dataFolder, saveFolder]
        # Ejecutar el comando
        out = subprocess.run(command, shell=False, stdout=subprocess.PIPE) #, capture_output=True, text=True
        result_str= out.stdout.decode('utf-8').strip()

        #result = json.loads(result_str) # Convierto la solucion de string a dict
        # rint(result_str)
        result = ast.literal_eval(result_str)

        #print(result)
      
        #NewSolution = Solutions.objects.create(idred=red,
        #                                Obj=result["obj"],
        #                                time= result["execution_time"],
        #                                status= result["termination_status"],
        #                                SolverTermination= result["SolverTermination"],
        #                                flag_termination_status = result["flag_termination_status"])

        # Obtener todos los objetos Solutions
        #all_solutions = Solutions.objects.all()

        # Eliminar todos los objetos
        #all_solutions.delete()
                
        try:
            # Si existe la solucion asociada a la red cambio los valores
            NewSolution = Solutions.objects.get(idred=red)
            # Update existing solution
            NewSolution.Obj = result["obj"]
            NewSolution.power_losses = result["power_losses"]
            NewSolution.time = result["execution_time"]
            NewSolution.status = result["termination_status"]
            NewSolution.SolverTermination = result["SolverTermination"]
            NewSolution.flag_termination_status = result["flag_termination_status"]
            #NewSolution.PList = result["P"]
            #NewSolution.QList = result["Q"]
            #NewSolution.PsList = result["Ps"]
            #NewSolution.QsList = result["Qs"]
            #NewSolution.PdgList = result["Pdg"]
            #NewSolution.QdgList = result["Qdg"]
            NewSolution.save()
        except Solutions.DoesNotExist:
            # Si no existe solucion creo un
            # Create new solution
            NewSolution = Solutions.objects.create(
                idred=red,
                Obj=result["obj"],
                power_losses = result["power_losses"],
                time=result["execution_time"],
                status=result["termination_status"],
                SolverTermination=result["SolverTermination"],
                flag_termination_status=result["flag_termination_status"],
                #PList = result["P"],
                #QList = result["Q"],
                #PsList = result["Ps"],
                #QsList = result["Qs"],
                #PdgList = result["Pdg"],
                #QdgList = result["Qdg"]
            )
       
        for linea in lineas:
            if linea.idsubtipo == 'A':
                # Si la linea es del subtipo A (conecta bus con bus)
                I_value_list = [] # Corriente en la linea
                P_value_list = [] # Potencia Activa en la linea 
                Q_value_list = [] # Potencia Reactiva en la linea 
                Zp_value_list = [] # Sentido de circulacion positivo en la linea (True o false)
                ZLine_value_list = [] # Existencia de la linea por periodo linea 
                sentido_value_list = [] ## Sentido de circulacion
                source_id = linea.source_id # Nodo fuente
                receptor_id = linea.receptor_id # Nodo Receptor

                # Tomo los nodos fuentes y receptores
                nodoSource = Nodo.objects.filter(idred=red, pk=source_id)
                nodoReceptor = Nodo.objects.filter(idred=red, pk=receptor_id)
                
                for per in range(0,P):
                    # Tomo los valores de corriente, potencia, sentido positivo y existencia de la solucion
                    I_value_list.append(result["I"][(nodoSource[0].idNodo, nodoReceptor[0].idNodo, per+1)])
                    P_value_list.append(result["P"][(nodoSource[0].idNodo, nodoReceptor[0].idNodo, per+1)])
                    Q_value_list.append(result["Q"][(nodoSource[0].idNodo, nodoReceptor[0].idNodo, per+1)])
                    sentido_value_list.append(result["Zp"][(nodoSource[0].idNodo, nodoReceptor[0].idNodo, per+1)]) 
                    ZLine_value_list.append(result["ZLine"][(nodoSource[0].idNodo, nodoReceptor[0].idNodo, per+1)]) 

                # Guardo los valores en la linea
                linea.sentido = json.dumps(sentido_value_list)
                linea.I = json.dumps(I_value_list)
                linea.P = json.dumps(P_value_list)
                linea.Q = json.dumps(Q_value_list)
                linea.zLinep = json.dumps(ZLine_value_list)
                linea.save()
           
            else:  # Si la linea es del subtipo B (conecta dg/source o load con un bus)
                # Defino los sentidos de las lineas que no son tipo A (no conectan busses entre si)
                # Los sentidos los debo definir de manera de que vayan siempre hacia las cargas y de las generaciones a los nodos
                sentido_value_list = []
                source_id = linea.source_id
                receptor_id = linea.receptor_id
                nodoSource = Nodo.objects.filter(idred=red, pk=source_id)
                nodoReceptor = Nodo.objects.filter(idred=red, pk=receptor_id) 
                zLinepvalue_list=[True] * P
                zper_list=[True] * P

                if (nodoSource[0].idtiponodo == TipoNodo.objects.get(pk=6) or
                    (nodoReceptor[0].idtiponodo != TipoNodo.objects.get(pk=1) and 
                     nodoReceptor[0].idtiponodo != TipoNodo.objects.get(pk=6) )):
                  # Si el nodo source es una carga o el receptor es un DG1,DG2,DG3,storage o Grid el flujo debe ser negativo (contrario a como está conectado)
                    sentido_value_list=[False] * P
                    linea.sentido = json.dumps(sentido_value_list)
                    Pdg_value_list = []
                    Qdg_value_list = []
                    if (nodoReceptor[0].idtiponodo == TipoNodo.objects.get(pk=2) or
                        nodoReceptor[0].idtiponodo == TipoNodo.objects.get(pk=3) or
                        nodoReceptor[0].idtiponodo == TipoNodo.objects.get(pk=4) or
                        nodoReceptor[0].idtiponodo == TipoNodo.objects.get(pk=5)):

                        # Si el nodo source es un DG1, DG2, DG3 o Storage (ver las baterias si entran en Zdg)
                        # Tengo que activar la existencia del mimso y la linea asociada dependiendo de su existencia
                        for per in range(0,P):                            
                            Pdg_value_list.append(result["Pdg"][(nodoSource[0].idNodo, nodoReceptor[0].idNodo, per+1)])
                            Qdg_value_list.append(result["Qdg"][(nodoSource[0].idNodo, nodoReceptor[0].idNodo, per+1)])

                            if result["Zdg"][nodoSource[0].idNodo, nodoReceptor[0].idNodo, per+1] == False:
                                #Si la generacion no existe entonce no existe la linea ni el nodo
                                zLinepvalue_list[per] = False  
                                zper_list[per] = False  


                    for nodoreceptor in nodoReceptor:
                        if nodoreceptor.idtiponodo != TipoNodo.objects.get(pk=1) and nodoreceptor.idtiponodo != TipoNodo.objects.get(pk=6):
                            # Si el nodo receptor no es un bus o una carga (modifico el p y el q - ya que son generaciones)
                            nodoreceptor.zp = json.dumps(zper_list)  
                            nodoreceptor.p = json.dumps(Pdg_value_list) 
                            nodoreceptor.q = json.dumps(Qdg_value_list) 
                            nodoreceptor.save()
                            #nodoSource.pg = json.dumps(Pdg_value_list) 
                            #nodoSource.qg = json.dumps(Qdg_value_list) 

                    linea.zLinep = json.dumps(zLinepvalue_list)      
                    linea.save()

                elif ((nodoSource[0].idtiponodo != TipoNodo.objects.get(pk=1) and 
                     nodoReceptor[0].idtiponodo != TipoNodo.objects.get(pk=6) ) or
                     nodoReceptor[0].idtiponodo == TipoNodo.objects.get(pk=6)):
                  # Si el nodo fuente es un DG1,DG2,DG3,storage o Grid  o el receptor es load entonces el flujo es positivo 
                    sentido_value_list=[True] * P
                    linea.sentido = json.dumps(sentido_value_list)
                    Pdg_value_list = []
                    Qdg_value_list = []
                    if (nodoSource[0].idtiponodo == TipoNodo.objects.get(pk=2) or
                        nodoSource[0].idtiponodo == TipoNodo.objects.get(pk=3) or
                        nodoSource[0].idtiponodo == TipoNodo.objects.get(pk=4) or
                        nodoSource[0].idtiponodo == TipoNodo.objects.get(pk=5)):
                        # Si el nodo receptor es un DG1, DG2, DG3 o Storage (ver las baterias si entran en Zdg)
                        print(f"nodoSource[0].idNodo: {nodoSource[0].idNodo}")
                        #print(f"nodoSource[0].nombre: {nodoSource[0].nombre}")
                        print(f"nodoReceptor[0].idNodo: {nodoReceptor[0].idNodo}")
                        #print(f"nodoReceptor[0].nombre: {nodoReceptor[0].nombre}")
                        for per in range(0,P):
                            Pdg_value_list.append(result["Pdg"][(nodoReceptor[0].idNodo, nodoSource[0].idNodo, per+1)])
                            Qdg_value_list.append(result["Qdg"][(nodoReceptor[0].idNodo, nodoSource[0].idNodo, per+1)])

                            if result["Zdg"][nodoReceptor[0].idNodo, nodoSource[0].idNodo, per+1] == False:
                                #Si la generacion no existe entonce no existe la linea ni el nodo
                                zLinepvalue_list[per] = False  
                                zper_list[per] = False  

                        #print(f"Pdg_value_list: {Pdg_value_list}")

                    for nodosource in nodoSource:
                        if nodosource.idtiponodo != TipoNodo.objects.get(pk=1) and nodosource.idtiponodo != TipoNodo.objects.get(pk=6) :
                            # Si el nodo source no es un bus o una carga (modifico el p y el q - ya que son generaciones)
                            nodosource.zp = json.dumps(zper_list)  
                            nodosource.p = json.dumps(Pdg_value_list) 
                            nodosource.q = json.dumps(Qdg_value_list) 
                            nodosource.save()
                    
                    nodoSource.zLinep = json.dumps(zLinepvalue_list) 
                    linea.zLinep = json.dumps(zLinepvalue_list)     
                    linea.save()

        for bus in Busses:
            V_value_list = []
            for per in range(0,P):
                V_value_list.append(result["V"][(bus.idNodo, per+1)])

            zp_value_list=[True] * P
            bus.zp = json.dumps(zp_value_list) 
            bus.V = json.dumps(V_value_list) 
            bus.save()

        for load in Load:
            zp_value_list=[True] * P
            load.zp = json.dumps(zp_value_list) 
            load.save()      

        
        for grid in Grid:        
            Ps_value_list = []
            Qs_value_list = []
            busID = grid_bus_conection[(grid.idNodo, per)]
           
            for per in range(0, P):
               Ps_value_list.append(result["Ps"][(busID, per+1)])
               Qs_value_list.append(result["Qs"][(busID, per+1)])
            print("=================================")
            print(f"Ps_value_list: {Ps_value_list}")
            print(f"Qs_value_list: {Qs_value_list}")
            grid.p = json.dumps(Ps_value_list) 
            grid.q = json.dumps(Qs_value_list) 
            grid.save()


        # Convert DataFrames to dictionaries (optional for frontend compatibility)
        #SolutionsSerializer(ObtainedSolution, many=True) 
        # Devuelve una respuesta de éxito con la linea nueva
        return Response(
            {"message": f" {NewSolution} solucion obtenida."},
            status=status.HTTP_200_OK
        )


import ast

# Creo la clase Dict
class Dict:
    def __init__(self):
        self.data = {}

    def __getitem__(self, *key):
        if len(key) == 1 and isinstance(key[0], tuple):
            key = key[0]
        return self.data[key]

    def __setitem__(self, *key_value):
        *key, value = key_value
        if len(key) == 1 and isinstance(key[0], tuple):
            key = key[0]
        else:
            key = tuple(key)
        self.data[key] = value

    def items(self):
        return self.data.items()


    
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