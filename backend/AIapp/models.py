from django.db import models
from django.utils import timezone

class AIapp_model(models.Model):
    name = models.CharField(max_length=100)
    question = models.TextField()
    ai_response = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name}: {self.question[:30]}"
