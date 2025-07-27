from django.urls import path
from .views import ChangePasswordView, RegisterView, LoginView, UserCreateView, UserDeleteView, UserDetailView, UserListView, UserUpdateView, UserView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', UserView.as_view(), name='user-info'),
    path('create/', UserCreateView.as_view(), name='user-create'),
    path('update/<int:pk>/', UserUpdateView.as_view(), name='user-update'),
    path('delete/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),
    path('all/', UserListView.as_view(), name='user-list'),
    path('password/',ChangePasswordView.as_view(),name='user_pass'),
    path('<int:pk>/',UserDetailView.as_view(),name='user-detail')
]
