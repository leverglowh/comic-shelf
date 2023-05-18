from django.contrib.auth.models import AbstractUser
from django.db.models import F
from django.db import models
class Series(models.Model):
    def __str__(self):
        return f"{self.id}"

class Issue(models.Model):
    series_fk = models.ForeignKey(Series, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.series_fk.id} #{self.id}"

class User(AbstractUser):
    read_issues = models.ManyToManyField(Issue, through='UserReadIssue', blank=True)

    def __str__(self):
        return f"{self.username}"

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            # "read_comics": [comic.serialize() for comic in read_comics_sorted]
            "read_comics": get_read_comics(self, limit=10)
        }

class UserReadIssue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}: {self.issue}"

def get_read_comics(user, limit = 10):
    series_issues = (
        Issue.objects
        .filter(userreadissue__user=user)
        .order_by('userreadissue__date')
        .values(series=F('series_fk__id'), issue=F('id'), date=F('userreadissue__date'))
        .distinct()
    )

    user_read_comics = []
    current_series = None
    current_series_data = None

    for issue in series_issues:
        if limit > 0 and len(user_read_comics) == limit:
            break
        if issue['series'] != current_series:
            current_series = issue['series']
            current_series_data = {
                'series': current_series,
                'issues': [],
                'date': issue['date']
            }
            user_read_comics.append(current_series_data)

        current_series_data['issues'].append(issue['issue'])
    
    return user_read_comics
