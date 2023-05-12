from django.contrib import admin

from .models import User, Comic, UserComic

class UserComicInline(admin.TabularInline):
    model = UserComic
    extra = 9 # how many rows to show

class UserAdmin(admin.ModelAdmin):
    inlines = (UserComicInline,)

admin.site.register(User, UserAdmin)
admin.site.register(Comic)
admin.site.register(UserComic)