"""
URL configuration for Computer_Lessons project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from project_core.views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path("registration/", handle_registration, name="handle_registration"),
    path("authorization/", handle_authorization, name="handle_authorization"),
    path("payment/", handle_payment, name="handle_payment"),
]
