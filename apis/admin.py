from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(userdata)
admin.site.register(Books)
admin.site.register(Rating)
admin.site.register(savesearch)
admin.site.register(Cart)
admin.site.register(Orders)