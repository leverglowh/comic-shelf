from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class User(AbstractUser):
    read_comics = models.ManyToManyField("Comic", through="UserComic", blank=True, related_name="read_by_users")
    groups = models.ManyToManyField(Group, related_name="auth_users")
    user_permissions = models.ManyToManyField(Permission, related_name="auth_users")


class UserComic(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comics")
    comic = models.ForeignKey("Comic", on_delete=models.CASCADE, related_name="user_comics_read")
    series = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)


class Comic(models.Model):
    series = models.IntegerField()