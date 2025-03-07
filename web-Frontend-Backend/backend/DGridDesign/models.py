from django.db import models

# Definir modelo para usuarios
class Usuario(models.Model):
    userName = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=50, unique=True)
    nombres = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    clave = models.CharField(max_length=128)
    habilitado = models.BooleanField(default=True)
    ultimaConexion = models.DateField()
    status = models.CharField(max_length=10)
    DuracionUltimaConexion = models.DurationField()
    Redes = models.IntegerField(default=0) # Redes asociadas con un usuario (tengo que agregar)

    def __str__(self):
        return self.email
    

# Definir modelo para redes
class Dryer(models.Model):
    nombre = models.CharField(max_length=50)
    fecha = models.DateField()
    hora = models.TimeField()
    idUser = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='redes')
    status = models.CharField(max_length=10)
    def __str__(self):
        return self.nombre

""" 
class Conexiones(models.Model):
    idUser = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='conexiones')
    conexiones = models.DateField()
    conexionTime = models.DateTimeField()
    duracion = models.DurationField()
"""

""" 
# Definir modelo para tipos de nodos
class TipoNodo(models.Model):
    detalle = models.CharField(max_length=50)
    def __str__(self):
        return self.detalle
 """

""" 
# Definir modelo para nodos
class Nodo(models.Model):
    idred = models.ForeignKey(Red, on_delete=models.CASCADE, related_name='NodeRed')
    idNodo = models.IntegerField()
    nombre = models.IntegerField()
    idtiponodo = models.ForeignKey(TipoNodo, on_delete=models.CASCADE, related_name='TipoNodo')
    idsubtiponodo = models.TextField()
    x = models.FloatField() # Posición x
    y = models.FloatField() # Posición y
    lat = models.FloatField() # Latitud del nodo
    lng = models.FloatField() # Longitud del nodo
    #Pinlat = models.FloatField() # Latitud del pin
    #Pinlng = models.FloatField() # Longitud del pin
    xPinL = models.TextField() # posicion relativa del pin
    yPinT = models.TextField() # posicion relativa del pin
    anguloPin = models.FloatField() #Angulo del pin
    # Tipo Escalar
    #p = models.FloatField() # potencia activa (tipo escalar)
    #q = models.FloatField() # potencia reactiva (tipo escalar)
    #fi = models.FloatField() # angulo de generacion (tipo escalar) 
    #pLB = models.FloatField() # limite inferior de la potencia activa (tipo escalar)
    #qLB = models.FloatField() # limite inferior de la potencia reactiva (tipo escalar)
    #pUB = models.FloatField() # limite superior de la potencia activa (tipo escalar)
    #qUB = models.FloatField() # limite superior de la potencia reactiva (tipo escalar)
    # Tipo Array
    p = models.TextField(help_text='Potencia Activa de las Cargas') # potencia activa (tipo arrays) - De las cargas
    q = models.TextField(help_text='Potencia Reactiva de las Cargas') # potencia reactiva (tipo arrays) - de las cargas
    ps = models.TextField(default='', help_text='Potencia Activa de las Grid') # potencia activa (tipo arrays) - de las grid
    qs = models.TextField(default='', help_text='Potencia Reactiva de las Grid') # potencia reactiva (tipo arrays) - de las grid
    pg = models.TextField(default='', help_text='Potencia Activa de las Generaciones') # potencia activa (tipo arrays) - de las generaciones
    qg = models.TextField(default='', help_text='Potencia Reactiva de las Generaciones') # potencia reactiva (tipo arrays) - de las generaciones
    
    fi = models.TextField() # angulo de generacion (tipo arrays) 
    pLB = models.TextField() # limite inferior de la potencia activa (tipo arrays)
    qLB = models.TextField() # limite inferior de la potencia reactiva (tipo arrays)
    pUB = models.TextField() # limite superior de la potencia activa (tipo arrays)
    qUB = models.TextField() # limite superior de la potencia reactiva (tipo arrays)
    z = models.BooleanField(default=True) # existencia del nodo (tipo arrays)
    zp = models.TextField(default='[]', help_text='Existencia del nodo en cada periodo obtenido de la optimizacion') # Para definir la existencia en cada período (Obtendio de la solucion)
    zOper = models.TextField(help_text='Existencia del nodo en cada periodo dado por el usuario') # actividad del nodo (tipo arrays) - Dado por el usuario
    V = models.TextField(default=0) # Voltages de cada nodo (tipo arrays)
    VLB = models.TextField(default='[10.761]') # limite inferior para el voltaje (tipo arrays)
    VUB = models.TextField(default='[14.559]') # limite superior para el voltaje (tipo arrays)
    #SolExistence = models.BooleanField(default=False)
    grid = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.nombre} ({self.idred.nombre})"
 """
""" 
# Definir modelo para lineas
class Linea(models.Model):
    idred = models.ForeignKey(Red, on_delete=models.CASCADE, related_name='LineaRed')
    nombre = models.IntegerField()
    idsubtipo = models.TextField()
    #r = models.FloatField() # Resistencia (tipo escalar)
    #x = models.FloatField() # Inductancia (tipo escalar)
    #z = models.FloatField() # z2 = r2+x2 (tipo escalar)
    r = models.TextField() # Resistencia (tipo arrays)
    x = models.TextField() # Inductancia (tipo arrays)
    z = models.TextField() # z2 = r2+x2 (tipo arrays)
    startX = models.FloatField() # Posicion en pixeles del inicio de la linea en x
    startY = models.FloatField() # Posicion en pixeles del inicio de la linea en y 
    endX = models.FloatField() # Posicion en pixeles del fin de la linea en x
    endY = models.FloatField() # Posicion en pixeles del fin de la linea en y 
    pinIdIni = models.CharField(max_length=50) # Pin de inicio de la linea
    pinIdEnd = models.CharField(max_length=50) # Pin de fin de la linea
    x1Original = models.FloatField() # Posicion Anterior en pixeles del inicio de la linea en x
    y1Original = models.FloatField() # Posicion Anterior en pixeles del inicio de la linea en y 
    x2Original = models.FloatField() # Posicion Anterior en pixeles del fin de la linea en x
    y2Original = models.FloatField() # Posicion Anterior en pixeles del fin de la linea en y 
    StartLat = models.FloatField() # Latitud del punto de inicio de la linea
    StartLng = models.FloatField() # Longitud del punto de inicio de la linea
    EndLat = models.FloatField()  # Latitud del punto de inicio de la linea
    EndLng = models.FloatField()  # Longitud del punto de inicio de la linea  
    source = models.ForeignKey(Nodo, on_delete=models.CASCADE, related_name='lineas_origen') #Nodo de origen
    receptor = models.ForeignKey(Nodo, on_delete=models.CASCADE, related_name='lineas_destino') # Nodo de destino
    #sentido = models.BooleanField(default=True) # Sentido de la linea
    sentido = models.TextField(default=True) # Corriente de las lineas (tengo que agregar)
    I = models.TextField(default=0) # Corriente de las lineas (tengo que agregar)
    P = models.TextField(default=0) # flujo de energíá activa en la linea
    Q = models.TextField(default=0) # flujo de energíá reactiva en la linea
    A = models.TextField(default=0) # flujo de energíá aparente en la linea
    zLine = models.BooleanField(default=True) # Existencia de la linea
    ILB = models.TextField(default='[-500]') # limite inferior para la corriente (tipo arrays)
    IUB = models.TextField(default='[500]') # limite superior para la corriente (tipo arrays)
    zLinep = models.TextField(default='[]', help_text='Existencia del nodo en cada periodo obtenido de la optimizacion') # Para definir la existencia en cada período (Obtendio de la solucion)
    zOper = models.TextField(help_text='Existencia del nodo en cada periodo dado por el usuario') # Operación de la linea (dada por el usuario)
    

    def __str__(self):
        return f"Línea de {self.source} a {self.receptor}"
    
 """
"""
"""""" 
# Definir modelo para lineas
class Solutions(models.Model):
    idred = models.ForeignKey(Dryer, on_delete=models.CASCADE, related_name='SolutionRed')
    Obj = models.FloatField();
    power_losses = models.FloatField(default= 0);
    time = models.FloatField();
    status= models.TextField();
    flag_termination_status= models.BooleanField(default=False, help_text="Optimal: Tue, Unfeasible/Unlimited/NonOptimal: False");
    SolverTermination = models.TextField();
    #PList= models.TextField(default='');
    #QList= models.TextField(default='');
    #PsList= models.TextField(default='');
    #QsList= models.TextField(default='');
    #PdgList= models.TextField(default='');
    #QdgList= models.TextField(default='');
    def __str__(self):
        return f"Problema: {self.idred} - Obj: {self.Obj}  - Status: {self.status}  - Solver Termination: {self.SolverTermination}"
     
"""
""" 
class UsuarioRed(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    red = models.ForeignKey(Red, on_delete=models.CASCADE)
    cargada = models.BooleanField(default=False)

    class Meta:
        unique_together = ('usuario', 'cargada')  # Solo un registro con cargada=True por usuario
 """