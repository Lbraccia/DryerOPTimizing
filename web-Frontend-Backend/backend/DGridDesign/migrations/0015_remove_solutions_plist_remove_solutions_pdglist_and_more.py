# Generated by Django 5.1.3 on 2025-01-02 19:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        (
            "DGridDesign",
            "0014_solutions_plist_solutions_pdglist_solutions_pslist_and_more",
        ),
    ]

    operations = [
        migrations.RemoveField(
            model_name="solutions",
            name="PList",
        ),
        migrations.RemoveField(
            model_name="solutions",
            name="PdgList",
        ),
        migrations.RemoveField(
            model_name="solutions",
            name="PsList",
        ),
        migrations.RemoveField(
            model_name="solutions",
            name="QList",
        ),
        migrations.RemoveField(
            model_name="solutions",
            name="QdgList",
        ),
        migrations.RemoveField(
            model_name="solutions",
            name="QsList",
        ),
    ]
