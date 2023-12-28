# entries/serializers.py
from rest_framework import serializers
from .models import DiaryEntry, Category, Tag



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class DiaryEntrySerializer(serializers.ModelSerializer):
    privacy = serializers.CharField(source='get_privacy_display', read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = DiaryEntry
        fields = ('id', 'user', 'title', 'content','privacy', 'categories',
                  'tags', 'created_at', 'updated_at')

    def create(self, validated_data):
        user = self.context['request'].user
        diary_entry = DiaryEntry.objects.create(user=user, **validated_data)
        return diary_entry
