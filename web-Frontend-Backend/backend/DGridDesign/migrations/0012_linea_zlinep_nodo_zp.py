# Generated by Django 5.1.3 on 2024-12-14 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("DGridDesign", "0011_rename_idusuario_conexiones_iduser_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="linea",
            name="zLinep",
            field=models.TextField(default="[]"),
        ),
        migrations.AddField(
            model_name="nodo",
            name="zp",
            field=models.TextField(default="[]"),
        ),
    ]
