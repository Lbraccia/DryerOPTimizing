# Generated by Django 5.1.3 on 2024-12-01 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("DGridDesign", "0004_linea_a_linea_p_linea_q"),
    ]

    operations = [
        migrations.AlterField(
            model_name="linea",
            name="sentido",
            field=models.TextField(default=True),
        ),
    ]
