from django.db import models
from django.contrib.auth.models import User

# Create your models here.


# class Client(models.Model):
#     name = models.CharField(max_length=128, null=True)
#     phone = models.CharField(max_length=20, null=True, blank=True)
#     email = models.EmailField(max_length=50, null=True)
#     # auto_now is for future dates (e.g. modify date)
#     date_created = models.DateField(auto_now_add=True)

#     user = models.ForeignKey(
#         User, null=True, blank=True, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.name

from datetime import datetime
import random

class Incident(models.Model):
    PRIORITY = (
        ('HIGH', 'HIGH'),
        ('MEDIUM', 'MEDIUM'),
        ('LOW', 'LOW')
    )

    # Create incident id according to spec
    def create_inc_id():
        prefix = "RMG"
        five_random_nums = str(random.randint(0, 99999)).ljust(5, "0")
        current_year = str(datetime.now().year)
        target = prefix + five_random_nums + current_year
        return target
    
    incident_id = models.CharField(max_length=12, unique=True, editable=False, default=create_inc_id)
    date_created = models.DateField(auto_now_add=True, null=False, blank=False)
    description = models.TextField(max_length=128, null=True, blank=True)
    priority = models.CharField(max_length=20, null=True, choices=PRIORITY)
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.CASCADE)
    closed_status = models.BooleanField(null=False, default=False)

    # def close_incident(self):
    #     if self.closed_status:
    #         non_editable_fields = ["date_created", "description", "priority", "user"]
    #         for field in non_editable_fields:
    #             self.__getattribute__(field).editable = False

    def __str__(self):
        return str(self.incident_id) + " - " + str(self.priority) + " - " + str(self.closed_status) + ' date: ' + datetime.strftime(self.date_created,"HH:MM:SS")


# class Todolist(models.Model):
#     STATUS = (
#         ('Pending', 'Pending'),
#         ('In Progress', 'In Progress'),
#         ('Done', 'Done')
#     )

#     task = models.CharField(max_length=128, null=True)
#     date_created = models.DateField(auto_now_add=True)
#     target_time = models.DateField()
#     status = models.CharField(max_length=20, null=True, choices=STATUS)

#     project = models.ForeignKey(Incident, null=True, on_delete=models.CASCADE)

#     def __str__(self):
#         return str(self.task) + " - " + str(self.project)
