from django.db import models
from django.conf import settings
from apps.subjects.models import Subject

class Quiz(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    difficulty = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=50, blank=True, null=True)
    order_num = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quiz.title} - {self.question_text[:50]}"

class QuizSubmission(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_submissions')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='submissions')
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - {self.score}"
