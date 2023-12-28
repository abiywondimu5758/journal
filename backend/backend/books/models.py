from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

class Book(models.Model):
    STATUS_CHOICES = [
        ('read', 'Read'),
        ('reading', 'Reading'),
        ('planning', 'Planning'),
    ]

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    genre = models.CharField(max_length=50)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='planning')
    current_page = models.PositiveIntegerField(blank=True, null=True)
    started_at = models.DateTimeField(blank=True, null=True)
    ended_at = models.DateTimeField(blank=True, null=True)
    plan_to_start = models.DateTimeField(blank=True, null=True)
    plan_to_end = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()

        if self.status == 'reading':
            if not self.started_at:
                self.started_at = timezone.now()
            if not self.plan_to_end:
                self.plan_to_end = timezone.now() + timezone.timedelta(days=30)

        if self.status == 'planning' and not self.plan_to_start:
            self.plan_to_start = timezone.now() + timezone.timedelta(days=7)

        if self.status != 'reading':
            self.current_page = None
            if not self.ended_at:
                self.ended_at = timezone.now()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
