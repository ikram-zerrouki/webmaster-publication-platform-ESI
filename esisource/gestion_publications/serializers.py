from rest_framework import serializers
from .models import Publication, Medias

class MediaSerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = Medias
    #     fields = ['id', 'url', 'type']
    
    url = serializers.SerializerMethodField()

    class Meta:
        model = Medias
        fields = ['id', 'url', 'type']

    def get_url(self, obj):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.url.url)
        return obj.url.url


class PublicationSerializer(serializers.ModelSerializer):
    medias = MediaSerializer(many=True, read_only=True)
    media_files = serializers.ListField(
        child=serializers.FileField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Publication
        fields = ['id', 'contenu', 'type', 'date_planifiee',  # Changé type_publication en type et date_publication en date_planifiee
                  'statut', 'auteur_id', 'validateur_id', 
                  'date_validation', 'medias', 'media_files']
        read_only_fields = ['auteur_id', 'validateur_id', 'date_validation']

    def create(self, validated_data):
        # Extraire les fichiers média s'ils existent
        media_files = validated_data.pop('media_files', [])
        
        # Créer la publication
        publication = Publication.objects.create(**validated_data)
        
        # Créer les objets médias associés
        for media_file in media_files:
            Medias.objects.create(
                publication_id=publication,
                url=media_file
                # Le type sera déterminé automatiquement dans la méthode save() du modèle
            )
        
        return publication