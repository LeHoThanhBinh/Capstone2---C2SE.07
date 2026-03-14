from django.urls import path
from .views import RegisterView, LoginView, UserRoleView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('me', UserRoleView.as_view(), name='user_me'),
]
