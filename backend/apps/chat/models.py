from django.db import models
from django.conf import settings
from apps.subjects.models import Subject

class Message(models.Model):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('assistant', 'Assistant'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='messages')
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True, related_name='messages')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()
    tokens_used = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.role} - {self.created_at}"
