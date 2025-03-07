# Generated by Django 5.0.4 on 2024-09-22 23:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Red",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.CharField(max_length=50)),
                ("fecha", models.DateField()),
                ("hora", models.TimeField()),
                ("status", models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name="TipoNodo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("detalle", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Usuario",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("userName", models.CharField(max_length=50, unique=True)),
                ("email", models.CharField(max_length=50, unique=True)),
                ("nombres", models.CharField(max_length=50)),
                ("apellido", models.CharField(max_length=50)),
                ("clave", models.CharField(max_length=128)),
                ("habilitado", models.BooleanField(default=True)),
                ("ultimaConexion", models.DateField()),
                ("status", models.CharField(max_length=10)),
                ("DuracionUltimaConexion", models.DurationField()),
            ],
        ),
        migrations.CreateModel(
            name="Parameters",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("P", models.IntegerField()),
                ("idKey", models.IntegerField()),
                ("N", models.IntegerField()),
                ("NG1", models.IntegerField()),
                ("NG2", models.IntegerField()),
                ("NG3", models.IntegerField()),
                ("S", models.IntegerField()),
                ("NLoad", models.IntegerField()),
                ("NStorage", models.IntegerField()),
                ("NLine", models.IntegerField()),
                ("Nnodos", models.IntegerField()),
                (
                    "Layer",
                    models.TextField(
                        help_text="Capa de la layer (Regular, Satelital, Relieve, None) #"
                    ),
                ),
                ("centerLat", models.FloatField()),
                ("centerLng", models.FloatField()),
                ("zoom", models.FloatField()),
                ("zoomScale", models.FloatField()),
                (
                    "ColorLine",
                    models.CharField(
                        help_text="Color en formato hexadecimal, incluyendo el #",
                        max_length=10,
                    ),
                ),
                ("WidthLine", models.FloatField()),
                (
                    "ColorNode",
                    models.CharField(
                        help_text="Color en formato hexadecimal, incluyendo el #",
                        max_length=10,
                    ),
                ),
                ("WidthNode", models.FloatField()),
                (
                    "pinColor",
                    models.CharField(
                        help_text="Color en formato hexadecimal, incluyendo el #",
                        max_length=10,
                    ),
                ),
                ("NS", models.FloatField()),
                ("NQP", models.FloatField()),
                ("kw_W", models.FloatField()),
                ("Omhs_Komhs", models.FloatField()),
                ("Vnom", models.FloatField()),
                ("ke", models.FloatField()),
                ("kI", models.FloatField()),
                (
                    "idred",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="ParametersRed",
                        to="DGridDesign.red",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Nodo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("idNodo", models.IntegerField()),
                ("nombre", models.IntegerField()),
                ("idsubtiponodo", models.TextField()),
                ("x", models.FloatField()),
                ("y", models.FloatField()),
                ("lat", models.FloatField()),
                ("lng", models.FloatField()),
                ("xPinL", models.TextField()),
                ("yPinT", models.TextField()),
                ("anguloPin", models.FloatField()),
                ("p", models.TextField()),
                ("q", models.TextField()),
                ("fi", models.TextField()),
                ("pLB", models.TextField()),
                ("qLB", models.TextField()),
                ("pUB", models.TextField()),
                ("qUB", models.TextField()),
                ("z", models.BooleanField(default=True)),
                ("zOper", models.TextField()),
                ("grid", models.BooleanField(default=False)),
                (
                    "idred",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="NodeRed",
                        to="DGridDesign.red",
                    ),
                ),
                (
                    "idtiponodo",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="TipoNodo",
                        to="DGridDesign.tiponodo",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Linea",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.IntegerField()),
                ("idsubtipo", models.TextField()),
                ("r", models.TextField()),
                ("x", models.TextField()),
                ("z", models.TextField()),
                ("startX", models.FloatField()),
                ("startY", models.FloatField()),
                ("endX", models.FloatField()),
                ("endY", models.FloatField()),
                ("pinIdIni", models.CharField(max_length=50)),
                ("pinIdEnd", models.CharField(max_length=50)),
                ("x1Original", models.FloatField()),
                ("y1Original", models.FloatField()),
                ("x2Original", models.FloatField()),
                ("y2Original", models.FloatField()),
                ("StartLat", models.FloatField()),
                ("StartLng", models.FloatField()),
                ("EndLat", models.FloatField()),
                ("EndLng", models.FloatField()),
                ("sentido", models.BooleanField(default=True)),
                ("zLine", models.BooleanField(default=True)),
                ("zOper", models.TextField()),
                (
                    "receptor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="lineas_destino",
                        to="DGridDesign.nodo",
                    ),
                ),
                (
                    "source",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="lineas_origen",
                        to="DGridDesign.nodo",
                    ),
                ),
                (
                    "idred",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="LineaRed",
                        to="DGridDesign.red",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Solutions",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("Obj", models.FloatField()),
                ("time", models.FloatField()),
                ("status", models.IntegerField()),
                ("SolverTermination", models.IntegerField()),
                (
                    "idred",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="SolutionRed",
                        to="DGridDesign.red",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="red",
            name="idusuario",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="redes",
                to="DGridDesign.usuario",
            ),
        ),
        migrations.CreateModel(
            name="Conexiones",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("conexiones", models.DateField()),
                ("conexionTime", models.DateTimeField()),
                ("duracion", models.DurationField()),
                (
                    "idusuario",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="conexiones",
                        to="DGridDesign.usuario",
                    ),
                ),
            ],
        ),
    ]
