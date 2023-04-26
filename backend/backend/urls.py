"""pms URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views as api_views
from incidents import views as incident_views  # import apps

api_router = routers.DefaultRouter()
api_router.register(r'client', api_views.ClientView, 'client')
api_router.register(r'project', api_views.ProjectView, 'project')
api_router.register(r'todos', api_views.TodolistView, 'todos')
api_router.register(r'users', api_views.UserView, 'users')

incident_router = routers.DefaultRouter()
incident_router.register(r'list', incident_views.IncidentView, 'list')
# incident_router.register(r'create', incident_views.IncidentCreateView, 'create')
# incident_router.register(r'edit', incident_views.IncidentEditView, 'edit')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', api_views.CustomAuthToken.as_view()),
    path('api/', include(api_router.urls)),
    path('incident/', include(incident_router.urls)),
]
