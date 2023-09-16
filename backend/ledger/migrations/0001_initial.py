# Generated by Django 4.2.5 on 2023-09-16 10:32

from django.db import migrations, models
import django_extensions.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transactions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('transaction_type', models.CharField(choices=[('employee_hired', 'Employee Hired'), ('employee_discharged', 'Employee Discharged'), ('employee_reviewed', 'Employee Reviewed')], max_length=32)),
                ('blockchain_transaction_id', models.CharField(max_length=64)),
                ('company_wallet_id', models.CharField(max_length=64)),
                ('candidate_wallet_id', models.CharField(max_length=64)),
                ('gas_fee', models.FloatField()),
            ],
            options={
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
    ]
