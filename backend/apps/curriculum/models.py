from django.db import models
from apps.subjects.models import Subject

class Chapter(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='chapters')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    order_num = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject.name} - {self.title}"

class Lesson(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    order_num = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.chapter.title} - {self.title}"
