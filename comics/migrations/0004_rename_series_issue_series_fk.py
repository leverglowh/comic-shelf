# Generated by Django 4.1.7 on 2023-05-17 23:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comics', '0003_issue_series_userreadissue_remove_usercomic_comic_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='issue',
            old_name='series',
            new_name='series_fk',
        ),
    ]
