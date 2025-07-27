from django.contrib import admin

from gestion_publications.models import Publication
class PublicationAdmin(admin.ModelAdmin):
    list_display = ['titre', 'auteur', 'statut']
    exclude = ['auteur']  # ne pas afficher dans le formulaire

    def save_model(self, request, obj, form, change):
        if not obj.auteur:
            obj.auteur = request.user
        super().save_model(request, obj, form, change)


admin.site.register(Publication)
