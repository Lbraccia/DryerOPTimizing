from rest_framework import routers
from django.urls import path, include
from .viewsets import UsuarioViewSet, DryerViewSet 
#from .viewsets import SolutionsViewSet, NodoViewSet, LineaViewSet, SolutionsViewSet, ParametersViewSet
from .views import DGridDesign

router = routers.SimpleRouter()
router.register('Usuario', UsuarioViewSet, basename='Usuario')
router.register('Dryer', DryerViewSet, basename='Dryer')
#router.register('Conexiones', ConexionesViewSet, basename='Conexiones')
#router.register('TipoNodo', TipoNodoViewSet, basename='TipoNodo')

#router.register('Nodo', NodoViewSet, basename='Nodo')
#router.register('Linea', LineaViewSet, basename='Linea')
#router.register('Solution', SolutionsViewSet, basename='Solution')
#router.register('Parameters', ParametersViewSet, basename='Parameters')

urlpatterns = router.urls

urlpatterns += [
#    path('Nodo/createNodo/', NodoViewSet.as_view({'post': 'createNodo'}), name='nodos-create'),
#    path('Nodo/delete/', NodoViewSet.as_view({'post': 'delete'}), name='nodos-delete'),
#    path('Nodo/filtrar/', NodoViewSet.as_view({'post': 'filtrar'}), name='nodos-filtrar'),
#    path('Nodo/Nodos_conectados/', NodoViewSet.as_view({'post': 'Nodos_conectados'}), name='nodos-conectados'),
#    path('Nodo/change/', NodoViewSet.as_view({'post': 'change'}), name='nodos-change'),
#    path('Linea/createLine/', NodoViewSet.as_view({'post': 'createLine'}), name='lineas-create'),
#    path('Linea/delete/', NodoViewSet.as_view({'post': 'delete'}), name='lineas-delete'),
#    path('Linea/filtrar/', NodoViewSet.as_view({'post': 'filtrar'}), name='lineas-filtrar'),
#    path('Linea/change/', NodoViewSet.as_view({'post': 'change'}), name='lineas-change'),
#    path('Linea/check/', NodoViewSet.as_view({'post': 'check'}), name='lineas-check'),
#    path('Parametro/createParameter/', ParametersViewSet.as_view({'post': 'createParameters'}), name='parametros-create'),
#    path('Parametro/change/', ParametersViewSet.as_view({'post': 'change'}), name='parametros-change'),
#    path('Parametro/filtrar/', ParametersViewSet.as_view({'post': 'filtrar'}), name='parametros-filtrar'),
    path('Dryer/createDryer/', DryerViewSet.as_view({'post': 'createDryer'}), name='dryer-create'),
    path('Dryer/change/', DryerViewSet.as_view({'post': 'change'}), name='dryer-change'),
    path('Dryer/filtrar/', DryerViewSet.as_view({'post': 'filtrar'}), name='dryer-filtrar'),
    path('Dryer/delete/', DryerViewSet.as_view({'post': 'delete'}), name='dryer-delete'),
    path('Dryer/lastCreatedRed/', DryerViewSet.as_view({'post': 'lastCreatedDryer'}), name='dryer-lastCreatedDryer'),
#    path('Solutions/DGDesign/', SolutionsViewSet.as_view({'post': 'Design'}), name='solution-design'),
#    path('Solutions/filtrar/', SolutionsViewSet.as_view({'post': 'filtrar'}), name='solution-filtrar'),
    # Falta crear filtrar delete y change para usuarios
]