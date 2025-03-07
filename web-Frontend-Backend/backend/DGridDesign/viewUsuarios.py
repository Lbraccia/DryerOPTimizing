from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from .models import Usuario
from .serializer import UsuarioSerializer, DryerSerializer

#====================================================================#
#=============== Funciones para los Usuarios ========================#
#====================================================================#
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    # Funcion filtrar los valores de acuerdo a la idUser
    @action(detail=False, methods=['post'])  # Acción personalizada para manejar POST
    def filtrar(self, request):
        # Obtiene el valor 'idred' del cuerpo de la solicitud
        idUser = request.data.get('idUser')
       
        # Verifica si se proporcionó 'idred'
        if idUser is None:
            return Response({"error": "idUser is required"}, status=status.HTTP_400_BAD_REQUEST)

        #Usuario = Usuario.objects.get(pk=idUser)
        if idUser != None:
           # Filtra todos los parametros para una idred
           usuario = Usuario.objects.filter(idUser=idUser)


        serializer = DryerSerializer(usuario, many=True)        
        # Devuelve una respuesta de éxito con el nodo filtrado
        return Response(
                {"message": serializer.data},
            status=status.HTTP_200_OK
        )