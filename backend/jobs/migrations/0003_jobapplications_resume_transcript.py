# Generated by Django 4.2.5 on 2023-09-17 08:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_alter_jobapplications_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplications',
            name='resume_transcript',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]