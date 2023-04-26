from django.db import models
from api.models import Client

# class Priority


# Create your models here.
class Incident(models.Model):
    incident_id = models.UUIDField(primary_key=True, unique=True)
    reporter_name = models.ForeignKey(Client, on_delete=models.DO_NOTHING)
    reported_on = models.DateField(auto_created=True)
    
    # High/Med/Low
    class Priority(models.TextChoices):
        HIGH = "HIGH",
        MEDIUM = "MEDIUM",
        LOW = "LOW"
    priority = models.CharField(
        max_length=6,
        choices=Priority.choices,
        default=Priority.MEDIUM,
    )
    # True means incident is resolved
    closed_status = models.BooleanField(null=False, default=False)
