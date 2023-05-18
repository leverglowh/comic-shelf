
from django.urls import path

from . import views
app_name="comics"
urlpatterns = [
    # API Routes
    path('api/login', views.CustomAuthToken.as_view()),
    path("api/user/<str:username>", views.user, name="user"),
    path("api/user/<str:username>/comics", views.user_comics, name="user_comics"),
    path("api/read", views.read_comic, name="read_comic"),
]
