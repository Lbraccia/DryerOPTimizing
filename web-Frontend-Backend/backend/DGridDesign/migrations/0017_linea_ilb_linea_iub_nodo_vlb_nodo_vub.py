# Generated by Django 5.1.1 on 2025-02-26 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("DGridDesign", "0016_nodo_pg_nodo_ps_nodo_qg_nodo_qs_alter_nodo_p_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="linea",
            name="ILB",
            field=models.TextField(default="[]"),
        ),
        migrations.AddField(
            model_name="linea",
            name="IUB",
            field=models.TextField(default="[]"),
        ),
        migrations.AddField(
            model_name="nodo",
            name="VLB",
            field=models.TextField(default="[]"),
        ),
        migrations.AddField(
            model_name="nodo",
            name="VUB",
            field=models.TextField(default="[]"),
        ),
    ]
