from django.db import models

class Listeners(models.Model):
    listeners_surname = models.CharField(max_length=30)
    listeners_name = models.CharField(max_length=30)
    listeners_patronymic = models.CharField(max_length=30)
    listeners_date_of_birth = models.DateField()
    listeners_telephone = models.CharField(max_length=11)
    listeners_e_mail = models.CharField(max_length=50)
    listeners_password = models.CharField(max_length=64)

    class Meta:
        db_table = "listeners"

class Academic_subjects(models.Model):
    academic_subjects_name = models.CharField(max_length=100)

    class Meta:
        db_table = "academic_subjects"

class Teachers(models.Model):
    teachers_surname = models.CharField(max_length=30)
    teachers_name = models.CharField(max_length=30)
    teachers_patronymic = models.CharField(max_length=30)
    teachers_telephone = models.CharField(max_length=11)
    teachers_e_mail = models.CharField(max_length=50)
    teachers_qualification = models.CharField(max_length=100)
    teachers_work_experience = models.CharField(max_length=100)
    teachers_academic_subjects_id = models.ForeignKey(Academic_subjects, on_delete=models.CASCADE, related_name="teachers_academic_subjects_id_fk")

    class Meta:
        db_table = "teachers"

class Journal_of_academic_performance(models.Model):
    journal_of_academic_performance_listeners_id = models.ForeignKey(Listeners, on_delete=models.CASCADE, related_name="journal_of_academic_performance_listeners_id_fk")
    journal_of_academic_performance_teachers_id = models.ForeignKey(Teachers, on_delete=models.CASCADE, related_name="journal_of_academic_performance_teachers_id_fk")
    journal_of_academic_performance_lesson_price = models.IntegerField()
    journal_of_academic_performance_score_for_test_1 = models.IntegerField()
    journal_of_academic_performance_score_for_test_2 = models.IntegerField()
    journal_of_academic_performance_score_for_test_3 = models.IntegerField()
    journal_of_academic_performance_score_for_exam = models.IntegerField()

    class Meta:
        db_table = "journal_of_academic_performance"
