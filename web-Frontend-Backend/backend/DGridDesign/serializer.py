from .models import Usuario, Dryer #, Conexiones, TipoNodo, Nodo, Linea,  Solutions, Parameters
from rest_framework import serializers

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Usuario
        fields = '__all__'

class DryerSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Dryer
        fields = '__all__'
        
""" 
class ConexionesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Conexiones
        fields = '__all__'
 """
""" class TipoNodoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TipoNodo
        fields = '__all__' """


""" 
class NodoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Nodo
        fields = '__all__'   
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super(NodoSerializer, self).__init__(*args, **kwargs)
        
        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)
    
class LineaSerializer(serializers.ModelSerializer): 
    # Nuevos serializadores para tomar el nombre del nodo fuente y receptor
    
    source_id = serializers.SerializerMethodField()
    receptor_id = serializers.SerializerMethodField()
    source_nombre = serializers.SerializerMethodField()
    receptor_nombre = serializers.SerializerMethodField()
    class Meta: 
        model = Linea
        fields = '__all__'
        # Agrego los nombre de los nodos fuentes y receptor
        extra_kwargs = {
            'source_id': {'read_only': True},
            'receptor_id': {'read_only': True},
            'source_nombre': {'read_only': True},
            'receptor_nombre': {'read_only': True},
        }
    # Tomo los nodos fuentes y receptores
    def get_source_id(self, obj):
        return obj.source.idNodo

    def get_receptor_id(self, obj):
        return obj.receptor.idNodo
    
    def get_source_nombre(self, obj):
        return obj.source.nombre

    def get_receptor_nombre(self, obj):
        return obj.receptor.nombre
    

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super(LineaSerializer, self).__init__(*args, **kwargs)
        
        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)
 """
""" 
class ParametersSerializer(serializers.ModelSerializer):
    
    class Meta: 
        model = Parameters
        fields = '__all__'

    
    

class SolutionsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Solutions
        fields = '__all__'
     """