from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import *
from django.core.mail import send_mail

def registration_get_data(data: dict) -> list[str, str, str, str, str, str, str]:
    """
    Вспомогательная функция, которая вытаскивает данные из запроса, и возвращает их как переменные
    Args: data - словарь данных
    Return: несколько переменных
    """
    surname = data.get("surnameReg")
    name = data.get("nameReg")
    patronymic = data.get("patronymicReg")
    birthDate = data.get("birthDateReg")
    phone = data.get("phoneReg")
    email = data.get("emailReg")
    password = data.get("passwordReg")
    return surname, name, patronymic, birthDate, phone, email, password

def payment_get_data(data: dict) -> list[str, list, list]:
    """
    Вспомогательная функция, которая вытаскивает данные из запроса, и возвращает их как переменную и списки
    Args: data - словарь данных
    Return: переменная и списки
    """
    email = data.get("emailUserInSystem")
    lessons_list = data.get("lessonsData")
    title_list = []
    price_list = []
    for i in range(len(lessons_list)):
        title = lessons_list[i].get("newTitle")
        title = title.split()
        title_list.append(title[len(title) - 1])
        price = lessons_list[i].get("newPrice")
        price_list.append(price)
    return email, title_list, price_list

def email_sending(title_list: list, price_list: list, email: str) -> None:
    """
    Вспомогательная функция, которая отправляет письмо с информацией о курсах
    Args: title_list - список названий курсов
    Return: отсутствует
    """
    from_email = "anton-ivanov-080203@mail.ru"
    subject = "Информационное письмо"
    output_message = "Большое спасибо, что решили приобрести курсы у ТехноКод!\n"
    for i in range(len(title_list)):
        teacher = Teachers.objects.get(teachers_academic_subjects_id = Academic_subjects.objects.get(academic_subjects_name = title_list[i]).id)
        if price_list[i] == 4500 or price_list[i] == 6000 or price_list[i] == 7500:
            tmp_str = f"По продвинутому курсу {title_list[i]} Вашим преподавателем будет {teacher.teachers_surname} {teacher.teachers_name} {teacher.teachers_patronymic}, почта для связи: {teacher.teachers_e_mail}.\n"
        else:
            tmp_str = f"По курсу {title_list[i]} Вашим преподавателем будет {teacher.teachers_surname} {teacher.teachers_name} {teacher.teachers_patronymic}, почта для связи: {teacher.teachers_e_mail}.\n"
        output_message += tmp_str
    output_message += "Приятной учёбы!"
    send_mail(subject, output_message, from_email, [email])  #нужно обернуть почту в список, потому что так ожидает синтаксис
    print(output_message)

@csrf_exempt
def handle_registration(request: dict) -> dict:
    """
    Функция, которая отвечает за регистрацию пользователей
    Args: request - словарь значений
    Return: ответ в виде словаря
    """
    if request.method == "POST":
        data = json.loads(request.body)
        print(f"Данные регистрации: {data}")
        surname, name, patronymic, birthDate, phone, email, password = registration_get_data(data)
        print(f"Полученные данные: {surname}, {name}, {patronymic}, {birthDate}, {phone}, {email}, {password}")
        listener = Listeners.objects.filter(listeners_e_mail=email)
        if not listener:
            listener = Listeners(
                listeners_surname = surname,
                listeners_name = name,
                listeners_patronymic = patronymic,
                listeners_date_of_birth = birthDate,
                listeners_telephone = phone,
                listeners_e_mail = email,
                listeners_password = password
            )
            listener.save()
            return JsonResponse({"message": "Данные регистрации успешно получены и обработаны!"}, status=200)
        else:
            return JsonResponse({"message": "Данные регистрации были успешно получены и обработаны, но такой пользователь уже существует!"}, status=201)
    else:
        return JsonResponse({"message": "Разрешены только POST-запросы для регистрации!"}, status=400)

@csrf_exempt
def handle_authorization(request: dict) -> dict:
    """
    Функция, которая отвечает за авторизацию пользователя
    Args: request - словарь значений
    Return: ответ в виде словаря
    """
    if request.method == "POST":
        data = json.loads(request.body)
        print(f"Данные авторизации: {data}")
        email = data.get("emailAut")
        password = data.get("passwordAut")
        print(f"Полученные данные: {email}, {password}")
        listener = Listeners.objects.filter(listeners_e_mail=email, listeners_password=password)
        if listener:
            return JsonResponse({"message": "Данные авторизации успешно получены и обработаны!"}, status=200)
        else:
            return JsonResponse({"message": "Данные авторизации успешно получены и обработаны, но запись не была найдена!"}, status=201)
    else:
        return JsonResponse({"message": "Разрешены только POST-запросы для авторизации!"}, status=400)

@csrf_exempt
def handle_payment(request: dict) -> dict:
    """
    Функция, которая отвечает за оплату пользователя
    Args: request - словарь значений
    Return: ответ в виде словаря
    """
    if request.method == "POST":
        data = json.loads(request.body)
        print(f"Данные оплаты: {data}")
        email, title_list, price_list = payment_get_data(data)
        print(title_list)
        print(price_list)
        for i in range(len(title_list)):
            listener_instance = Listeners.objects.get(listeners_e_mail = email)
            teacher_instance = Teachers.objects.get(teachers_academic_subjects_id = Academic_subjects.objects.get(academic_subjects_name = title_list[i]).id)
            journal = Journal_of_academic_performance(
                journal_of_academic_performance_listeners_id = listener_instance,
                journal_of_academic_performance_teachers_id = teacher_instance,
                journal_of_academic_performance_lesson_price = price_list[i],
                journal_of_academic_performance_score_for_test_1 = 0,
                journal_of_academic_performance_score_for_test_2 = 0,
                journal_of_academic_performance_score_for_test_3 = 0,
                journal_of_academic_performance_score_for_exam = 0
            )
            journal.save()
        email_sending(title_list, price_list, email)
        return JsonResponse({"message": "Данные оплаты успешно получены и обработаны!"}, status=200)
    else:
        return JsonResponse({"message": "Разрешены только POST-запросы для оплаты!"}, status=400)
