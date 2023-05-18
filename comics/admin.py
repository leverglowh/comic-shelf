from django.contrib import admin
from .models import Issue, Series, User, UserReadIssue

admin.site.register(User)
admin.site.register(Issue)
admin.site.register(Series)
admin.site.register(UserReadIssue)