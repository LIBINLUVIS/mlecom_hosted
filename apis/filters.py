import django_filters
from .models import Books 
from django_filters import CharFilter



class BookFilter(django_filters.FilterSet):
    class Meta:
        model = Books
        fields = ['Book_title']
    temp=CharFilter(field_name='Book_title',lookup_expr='icontains',label='')


	