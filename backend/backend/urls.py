from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views as api_views

api_router = routers.DefaultRouter()
api_router.register(r'project', api_views.ProjectView, 'project')
api_router.register(r'users', api_views.UserView, 'users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', api_views.CustomAuthToken.as_view()),
    path('api/', include(api_router.urls))
]
