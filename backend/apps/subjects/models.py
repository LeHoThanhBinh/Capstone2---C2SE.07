from django.db import models

class Subject(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)
    icon_url = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
