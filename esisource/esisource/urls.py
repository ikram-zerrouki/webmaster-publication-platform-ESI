from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # Assurez-vous que ce chemin est correct
    path('api/', include('gestion_publications.urls')),  # Remplacez votre_app par le nom de votre application
    path('users/', include('users.urls')),

]

# Ajoutez ceci pour servir les fichiers médias en développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
   
 