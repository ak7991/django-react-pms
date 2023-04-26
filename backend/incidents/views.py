from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from django.contrib.auth.models import User
from .serializers import IncidentSerializer
from .models import Incident

# Create your views here.
# Viewsets provides implementation for CRUD operations by default.W


class IncidentView(viewsets.ModelViewSet):
    serializer_class = IncidentSerializer

    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['client', 'status']

    def get_queryset(self):
        user = self.request.user
        queryset = Incident.objects.filter(user=user)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
