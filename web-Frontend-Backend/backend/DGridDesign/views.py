from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Dryer #Nodo, Linea, Red, TipoNodo, Solutions
from .serializer import UsuarioSerializer, DryerSerializer # ConexionesSerializer, TipoNodoSerializer
#from .serializer import NodoSerializer, LineaSerializer, ParametersSerializer, SolutionsSerializer
from django.forms.models import model_to_dict

import requests
from subprocess import run, PIPE, STDOUT
from django.http import JsonResponse
import numpy as np
import os
 

def DGridDesign(request):

    return JsonResponse({'status' : 0})

    """
        data = request.get('http://localhost:8000/DGridDesign/v1.0.0/DGridDesign/1/')
    data_json = data.json()
    url = 'http://localhost:8000/DGridDesign/v1.0.0/DGridDesign/2/'
    files = {'files': open(RutaName, 'rb')}
    r = request.put(url, files=files)

    titulo_json= data_json["Titulo"]
    funcional_json= data_json["funcional"]
    estructura_json= data_json["estructura"]
    Nu_json= data_json["Nu"]
    Ny_json= data_json["Ny"]
    Np_json= data_json["Np"]
    RGA_lo_json= data_json["RGA_lo"]
    RGA_ub_json= data_json["RGA_ub"]
    M_json= data_json["M"]
    qmin_json= data_json["qmin"]
    qmax_json= data_json["qmax"]
    epsilon_json= data_json["epsilon"]
    Titulo= str(data_json["Titulo"])
    funcional_str= str(data_json["funcional"])
    estructura_str= str(data_json["estructura"])
    Nu_str= str(data_json["Nu"])
    Ny_str= str(data_json["Ny"])
    Np_str= str(data_json["Np"])
    RGA_lo_str= str(data_json["RGA_lo"])
    RGA_ub_str= str(data_json["RGA_ub"])
    M_str = str(data_json["M"])
    qmin_str= str(data_json["qmin"])
    qmax_str= str(data_json["qmax"])
    epsilon_str= str(data_json["epsilon"])
    
    N_y_u = Nu_json * Ny_json
    G = np.zeros((int(Ny_json)+1,int(Nu_json)+1))
    y_s = np.zeros((int(Ny_json)+1,int(Nu_json)+1))
    par_z_y =  np.zeros((int(Ny_json)+1))
    par_z_u =  np.zeros((int(Nu_json)+1))
   
    for i in range(1,int(N_y_u+1)): 
        path = 'http://localhost:8000/api/v1.0.0/CSDG/' + str(i) + '/'
        data = requests.get(path)
        data_json = data.json()
        gij_json= data_json["gij"]
        i_json= data_json["i"] # las i de la base de datos están relacionadas con las salidas
        j_json= data_json["j"] # las j de la base de datos están relacionadas con las entradas
        par_z_y_json = data_json["par_z_y"]
        par_z_u_json = data_json["par_z_u"]

        if np.absolute(gij_json) <= float(epsilon_json):
            G[int(i_json),int(j_json)] = 0
        else:
            G[int(i_json),int(j_json)] = gij_json

        if int(j_json) == 1:        
           if int(par_z_y_json) == 1:
              par_z_y[int(i_json)] = 1
           else:
              par_z_y[int(i_json)] = -1        


        if int(i_json) == 1:
           if int(par_z_u_json) == 1:
              par_z_u[int(j_json)] = 1
           else:
              par_z_u[int(j_json)] = -1 


    #print(G)
    #print(par_z_y)
    #print(par_z_u)


    N_p_u = Np_json * Nu_json
    D = np.zeros((int(Nu_json)+1,int(Np_json)+1))
    d_s = np.zeros((int(Nu_json)+1,int(Np_json)+1))

    for i in range(1,int(N_p_u+1)): 
        path = 'http://localhost:8000/api/v1.0.0/CSDD/' + str(i) + '/'
        data = requests.get(path)
        data_json = data.json()
        dij_json= data_json["dij"]
        i_json= data_json["i"] #las i de la base de datos están relacionadas con las perturbaciones
        j_json= data_json["j"] #las j de la base de datos están relacionadas con las entradas 

        if np.absolute(dij_json) <= float(epsilon_json):
            D[int(i_json),int(j_json)] = 0
        else:
            D[int(i_json),int(j_json)] = dij_json

    #print(D)

    x=np.ones(int(Ny_json+1))
    y_s=np.diag(x)
    x=np.ones(int(Np_json+1))
    d_s=np.diag(x)

    #print(y_s)          
    #print(d_s)

    C_ssd_y = 1 # Establece si se usa el SSD basado en las desviaciones de las salidas no controladas (1: Si / 0: No)
    C_ssd_u = 0 # Establece si se usa el SSD basado en las desviaciones de las entradas usadas como manipuladas (1: Si / 0: No)

    if funcional_json == 'SSDNLE':
        C_net = 1
    else:
        C_net = 0

    if estructura_json == 'Desc':
        par_CS = 1
    elif estructura_json == 'Spar':
        par_CS = 2
    elif estructura_json == 'Full':
        par_CS = 3
    else:
        print("Estructrucra incorrecta")

    if par_CS==1:
        struc = 1
    else:
        struc = max(int(Ny_json),int(Nu_json))

    np.savez(SCRIPT_ROOT + '//scriptCSD//Datos' , cardM=int(Ny_json), cardN=int(Nu_json), cardP=int(Np_json), cardSP=int(Ny_json), 
        G=G, D=D, qmin=int(qmin_json), qmax=int(qmax_json), C_ssd_y=C_ssd_y, C_ssd_u=C_ssd_u, C_net=C_net, par_CS=par_CS, struc=struc,
        parRGA_lb=RGA_lo_str, parRGA_ub=RGA_ub_str, M = M_json, par_z_y=par_z_y, par_z_u=par_z_u, y_s=y_s, d_s=d_s, Titulo=Titulo)

    result_obj={}

    out = run([sys.executable, SCRIPT_ROOT + '//scriptCSD//SSD_NLE_RGA_onelevel.py'],shell=False,stdout=PIPE) #,streams_json,streamsUtilities_json 
        #.decode() quita el b (relacionado a byte de stdout) .strip() quita el /n 

    result= out.stdout.decode('utf-8').strip()
    result_str=result.replace("{","").replace("}","").split(",")
    result_obj["status"] = "Optimal Solution"
    result_obj["SSD_y"] = result_str[0].split(":")[1]
    result_obj["SSD_u"] = result_str[1].split(":")[1]
    result_obj["SSD"] = result_str[2].split(":")[1]
    result_obj["NLE"] = result_str[3].split(":")[1]
    result_obj["obj"] = result_str[4].split(":")[1]
    result_obj["RGAn"] = result_str[5].split(":")[1]
    result_obj["saveFolder"] = result_str[6].split(":")[1]
    result_obj["imgName"] = result_str[7].split(":")[1]
    result_obj["flagStatus"] = result_str[8].split(":")[1]
    result_obj["por_SSD"] = result_str[9].split(":")[1]
    result_obj["por_NLE"] = result_str[10].split(":")[1]  
    result_obj["RGA"] = result.split(":")[-3].replace("{","").replace("}","").replace("array(","").replace(")","").replace("\n","").replace("[","").replace("]","").replace(", 'znet_des'", "")
    result_obj["znet_des"] = result.split(":")[-2].replace("{","").replace("}","").replace("array(","").replace(")","").replace("\n","").replace("[","").replace("]","").replace(", 'z_net'", "")
    result_obj["znet"] = result.split(":")[-1].replace("{","").replace("}","").replace("array(","").replace(")","").replace("\n","").replace("[","").replace("]","")

    RutaName = result_obj["saveFolder"].split("'")[1] 
    RutaName = RutaName + "/"
    RutaName = RutaName + result_obj["imgName"].split("'")[1] + '.png'
    with open(RutaName, "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read())
    base64_string = encoded_image.decode(ENCODING)
    #raw_data = {result_obj["imgName"]: base64_string}
    #json_data = dumps(base64_string, indent=1)
    #raw_data = {result_obj["imgName"]: base64_string}
    #json_data = dumps(raw_data, indent=2)
    # files = {'image': open(RutaName, "rb") as image_file}



    with open(RutaName, "rb") as image_file:
        #files = image_file
        files = {
            'files': image_file,
            'Content-Type': 'image/png'
            }

    print(files)
    """



    """
    return JsonResponse({
                        'status' : 0, #result_obj["status"]
                        'SSD_y' :result_obj["SSD_y"],
                        'SSD_u' :result_obj["SSD_u"],
                        'SSD' :result_obj["SSD"],
                        'NLE' : result_obj["NLE"],
                        'RGAn' : result_obj["RGAn"],
                        'obj' : result_obj["obj"],
                        'RGA' : result_obj["RGA"],
                        'znet' : result_obj["znet"], 
                        'znet_des' : result_obj["znet_des"],      
                        'por_SSD': result_obj["por_SSD"],      
                        'por_NLE': result_obj["por_NLE"],      
                        'saveFolder' : result_obj["saveFolder"],                     
                        'imgName' : result_obj["imgName"],
                        'flagStatus' :  result_obj["flagStatus"],
                        'imagen': base64_string
                        })   
    
    """
  
