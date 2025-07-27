from rest_framework.permissions import BasePermission, SAFE_METHODS

# Admin uniquement
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return  request.user.role == 'admin'

# Éditeur ou Admin
class IsEditorOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return  request.user.role in ['editeur', 'admin']

# Rédacteur uniquement
class IsRedacteur(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'redacteur'

# Soit propriétaire du compte, soit admin
class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj or request.user.role == 'admin'
