from django.urls import path
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet
from .views import TaskViewSet, api_tasks_view

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')


urlpatterns = [
    path('', views.task_list, name='task_list'),
    path('task/new/', views.task_create, name='task_create'),
    path('task/<int:pk>/edit/', views.task_update, name='task_update'),
    path('task/<int:pk>/delete/', views.task_delete, name='task_delete'),
    path('api/', include(router.urls)), 
    path("api-tasks/", api_tasks_view, name="api_tasks"), 
]
