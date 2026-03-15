from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('USER', 'User'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='USER')

    def __str__(self):
        return f"{self.username} - {self.role}"

class LearningPath(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='learning_path')
    # Using 'apps.curriculum.Chapter' to avoid circular import if necessary, 
    # though users doesn't import from curriculum yet.
    current_chapter = models.ForeignKey('curriculum.Chapter', on_delete=models.SET_NULL, null=True, blank=True)
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Progress for {self.user.username}"
