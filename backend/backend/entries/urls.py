# entries/urls.py
from django.urls import path
from .views import (DiaryEntryListCreateView, DiaryEntryDetailView,     CategoryListCreateView,
                    CategoryDetailView,
                    TagListCreateView,
                    TagDetailView)

urlpatterns = [
    path('entries/', DiaryEntryListCreateView.as_view(), name='diary-entry-list'),
    path('entries/<int:pk>/', DiaryEntryDetailView.as_view(),
         name='diary-entry-detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(),
         name='category-detail'),
    path('tags/', TagListCreateView.as_view(), name='tag-list'),
    path('tags/<int:pk>/', TagDetailView.as_view(), name='tag-detail'),
    # Add other views/URLs as needed
]
