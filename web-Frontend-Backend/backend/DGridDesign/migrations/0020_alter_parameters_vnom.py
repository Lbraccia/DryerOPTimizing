# Generated by Django 5.1.3 on 2025-02-27 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "DGridDesign",
            "0019_parameters_ilbg_parameters_iubg_parameters_vlbg_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="parameters",
            name="Vnom",
            field=models.CharField(default="[12.66]", max_length=10),
        ),
    ]
