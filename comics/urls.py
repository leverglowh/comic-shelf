
from django.urls import path

from . import views
app_name="comics"
urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    # path("following", views.following, name="following"),
    # path("profile/<str:username>", views.profile, name="profile"),

    # API Routes
    # path("api/posts/<str:type>", views.posts, name="posts"),
    # path("api/posts/<str:type>/<str:username>", views.posts, name="posts_of_user"),
    # path("api/post", views.new_post, name="new_post"),
    # path("api/post/<int:post_id>", views.post, name="post"),
    # path("api/post/like/<int:post_id>", views.like_post, name="like_post"),
    # path("api/user/<str:username>", views.user, name="user"),
    # path("api/user/follow/<str:username>", views.follow, name="follow"),
]
