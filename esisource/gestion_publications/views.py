# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from .models import Publication, Medias
from .serializers import PublicationSerializer, MediaSerializer

class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context
    
    def perform_create(self, serializer):
        # Set the current user as the author if authenticated
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(auteur_id=user)
    
    def perform_update(self, serializer):
        # Si l'utilisateur est un validateur et change le statut à 'valide'
        data = self.request.data
        if 'statut' in data and data['statut'] == 'valide':
            serializer.save(validateur_id=self.request.user, date_validation=timezone.now())
        else:
            serializer.save()
    
    @action(detail=True, methods=['delete'])
    def delete_media(self, request, pk=None):
        """
        Supprimer un média spécifique d'une publication
        """
        publication = self.get_object()
        media_id = request.data.get('media_id')
        
        if not media_id:
            return Response({"error": "ID du média requis"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            media = Medias.objects.get(id=media_id, publication_id=publication)
            media.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Medias.DoesNotExist:
            return Response({"error": "Média non trouvé"}, status=status.HTTP_404_NOT_FOUND)