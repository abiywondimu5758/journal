# entries/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import DiaryEntry, Category, Tag
from .serializers import DiaryEntrySerializer, CategorySerializer, TagSerializer
# from .permissions import IsPublicOrIsAuthenticated
# from django.shortcuts import get_object_or_404


class DiaryEntryListCreateView(generics.ListCreateAPIView):
    queryset = DiaryEntry.objects.all()
    serializer_class = DiaryEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DiaryEntry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class DiaryEntryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DiaryEntry.objects.all()
    serializer_class = DiaryEntrySerializer
    permission_classes = [IsAuthenticated]


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class TagListCreateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]


class TagDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]
