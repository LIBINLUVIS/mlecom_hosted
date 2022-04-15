from django.urls import path
from . import views
from .views import(
    ApiView,
)

urlpatterns = [
    path('api/login/<int:pk>/',views.login, name='login'), 
    path('api/user_rating/<int:pk>/',views.User_Rating, name='Rating'), 
    path('api/book/<str:pk>/',views.book,name='books'),
    path('api/search/',views.search,name='search'),
    path('api/list',ApiView.as_view(),name='list'),
    path('api/trending/',views.trending_books,name='trending'),
    path('api/submitrating/',views.submitrating,name='submitrating'),
    path('api/savesearch/',views.savedata,name='savesearch'),
    path('api/signup/',views.signup,name="signup"),
    path('api/items/',views.items,name='items'),
    path('api/addcart/',views.addcart,name='addcart'),
    path('api/getitems/<int:pk>/',views.getitems,name='getitem'),
    path('api/remove/<int:pk>/',views.removecart,name='removecart'),
    path('api/inccartcount/<int:pk>/',views.inccart,name='inccart'),
    path('api/saveorder/<int:pk>/',views.order,name='order'),
    path('api/emptycart/<int:pk>/',views.emptycart,name='emptycart'),
    path('api/userorders/<int:pk>/',views.userorders,name='userorders'),
    path('api/recommentation/<int:pk>/',views.recommentation,name='recommentation'),
    path('api/upload',views.upload_data,name='upload'),  
]   
 