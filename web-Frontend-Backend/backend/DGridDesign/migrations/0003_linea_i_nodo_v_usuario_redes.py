# Generated by Django 5.1.3 on 2024-11-30 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("DGridDesign", "0002_red_status_usuario_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="linea",
            name="I",
            field=models.TextField(default=0),
        ),
        migrations.AddField(
            model_name="nodo",
            name="V",
            field=models.TextField(default=0),
        ),
        migrations.AddField(
            model_name="usuario",
            name="Redes",
            field=models.IntegerField(default=0),
        ),
    ]
