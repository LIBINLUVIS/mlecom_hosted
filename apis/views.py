from . models import *
from .serializers import *
from django.http import HttpResponseRedirect,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,action
from .filters import  BookFilter
import pandas as pd
import numpy as np
from rest_framework import serializers,viewsets
import csv
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

fs=FileSystemStorage(location='tmp/')

@api_view(['GET'])
def login(request,pk):
    res={}
    user_data=userdata.objects.get(id=pk)
    userid=user_data.id
    location=user_data.Location
    age=user_data.Age
    res["id"]=userid
    res["Location"]=location
    res["Age"]=age
    # serializer=UserSerializer(user_data)
    return Response(res)




@api_view(['GET'])
def User_Rating(request,pk):
    data=[]
    res={}
    temp=[]
    user_rating=Rating.objects.all()
    for x in user_rating:
        if x.user_id==pk:
            serializer=RatingSerializer(x)
            data.append(serializer.data)

   
    for val in data:
        
        isbn=val["isbn"]
        try:
            books=Books.objects.get(ISBN=isbn)
            book_title=books.Book_title
            book_auth=books.Book_Author
            isbn=books.ISBN
            img_S=books.img_url_S
            img_M=books.img_url_M
            img_L=books.img_url_L
            res["book_title"]=book_title
            res["book_auth"]=book_auth
            res["book_isbn"]=isbn
            res["img_small"]=str(img_S)
            res["img_med"]=str(img_M)
            res["img_Lar"]=str(img_L)
            res["rating"]=val["rating"]
            res["User_id"]=val["user_id"]
            res_copy=res.copy()
            temp.append(res_copy)
        except:
            ''
        # except:
        #     return Response(temp)
 

    return Response(temp[0:10])

@api_view(['GET'])
def book(request,pk):

    res={}
    try:
        books=Books.objects.get(ISBN=pk)
        res["title"]=books.Book_title
        res["author"]=books.Book_Author
        res["publisher"]=books.Publisher
        res["year_publisher"]=books.Year_of_Publication
        res["img"]=str(books.img_url_L)
        
    except:
        return Response(res)
    return Response(res)
   

@api_view(['GET'])
def search(request):
    res={}
    temp=[]
    queryset = Books.objects.all()
    filterset = BookFilter(request.GET, queryset=queryset)
    if filterset.is_valid():
        queryset = filterset.qs 
    for x in queryset:
        res["id"]=x.id   
        res["Book_title"]=x.Book_title
        res["Book_Author"]=x.Book_Author
        res["ISBN"]=x.ISBN
        res["img"]=str(x.img_url_L)
        res_copy=res.copy()
        temp.append(res_copy)
    return Response(temp)


@api_view(['GET'])
def trending_books(request):
    temp=[]
    res={}
    ids=[271353,55785,103,27,57]
    for x in ids:
        book=Books.objects.get(id=x)
        res['title']=book.Book_title
        res['author']=book.Book_Author
        res['img']=str(book.img_url_L)
        res['isbn']=book.ISBN
        res['id']=book.id
        res_copy=res.copy()
        temp.append(res_copy)           
    return Response(temp)
    
    

class ApiView(ListAPIView):
    queryset=Books.objects.all()
    serializer_class=StoreSerializer
    pagination_class=PageNumberPagination





@api_view(['POST'])
def submitrating(request):
    data=request.data
    datas=Rating.objects.create(
        user_id=data['userid'],
        isbn=data['isbn'],
        rating=data['rating'] 
    )
    return Response('Rating added sucessfully')


@api_view(['POST'])
def savedata(request):
    data=request.data
    datas=savesearch.objects.create(
       userid=data['userid'],
       booktitle=data['Book_title']
    )

    return Response('search saved')



@api_view(['POST'])
def signup(request):
    data=request.data
    datas=userdata.objects.create(
        id=data['userid'],
        Location=data['location'],
        Age=data['age']
    )

    return Response('user created')

@api_view(['GET'])
def items(request):
    items=Cart.objects.filter(user_id=5)
    cartpro=CartSerializer(items,many=True)
    return Response(cartpro.data)

@api_view(['POST'])
def addcart(request):
    data=request.data
    userid=data['userid']
    bookid=data['Bookid']
    book_obj=Books.objects.all().get(id=bookid)
    instance=Cart.objects.create(
        user_id=userid,
        book=book_obj
    )
    return Response('added')

@api_view(['GET'])
def getitems(request,pk):
    books=Cart.objects.all()
    res=[]
    tmp={}
    cartitems=[]
    for x in books:
        if(x.user_id==pk):
            res.append(x.book)
            for i in res:
                title=i.Book_title 
                author=i.Book_Author
                img=i.img_url_L
                year_pub=i.Year_of_Publication
                publisher=i.Publisher
                isbn=i.ISBN 
                ID=i.id
                tmp['id']=x.id
                tmp['Qty']=x.quantity
                tmp['title']=title
                tmp['author']=author
                tmp['img']=str(img)
                tmp['yearofpub']=year_pub
                tmp['publisher']=publisher
                tmp['isbn']=isbn
                tmp['bookid']=ID
            tmpcopy=tmp.copy() 
            cartitems.append(tmpcopy)

    return Response(cartitems)

@api_view(['POST'])
def removecart(request,pk):
    data=request.data
    isbn=data['isbn']
    userid=pk
    cart=Cart.objects.all()
    for x in cart:
        if(x.user_id==userid and x.book.ISBN==isbn):
            x.delete()
    return Response('removed')

@api_view(['POST'])
def inccart(request,pk):
    item=Cart.objects.get(id=pk)
    data=request.data
    action=data['quantity']
    userid=data['user_id']
    res={}
    if(action=='add'):
        item.quantity=item.quantity+1
        updatedqty=item.quantity
        res['user_id']=userid
        res['quantity']=updatedqty
    if(action=='sub'):
        item.quantity=item.quantity-1
        updatedqty=item.quantity
        res['user_id']=userid
        res['quantity']=updatedqty
    ser=CountSerializer(instance=item,data=res) 
    if ser.is_valid():
        ser.save();
    if item.quantity<=0:
        item.delete();

    return Response(ser.data)

@api_view(['POST'])
def order(request,pk):
    tmp=[]
    data=request.data
    tmp.append(data)
    for x in tmp:
        for key,value in x.items():
            val=value
            for i in val:
                bookid=list(i.values())[0]
                Qty=list(i.values())[1]
                ordername=list(i.values())[2]
                address=list(i.values())[3]
                book_obj=Books.objects.get(id=bookid)
                instance=Orders.objects.create(
                    orders=book_obj,
                    user_id=pk, 
                    quantity=Qty,
                    order_user_name=ordername,
                    order_address=address
                )

    return Response('ordered')

@api_view(['POST'])
def emptycart(request,pk):
    tmp=[]
    data=request.data
    tmp.append(data)
    for x in tmp:
        for key,value in x.items():
            val=value
            for i in val:
                cartid=list(i.values())[0] 
                cart=Cart.objects.get(id=cartid)
                cart.delete()
    return Response('Removed')


@api_view(['GET'])
def userorders(request,pk):
    ordered_obj=[]
    res=[]
    tmp={}
    product_obj=Orders.objects.all()
    for x in product_obj:
        if(x.user_id==pk):
            ordered_obj.append(x)
            for i in ordered_obj:
                title=i.orders.Book_title
                author=i.orders.Book_Author
                img=i.orders.img_url_L
                tmp['title']=title
                tmp['author']=author
                tmp['img']=str(img)
                tmp['Qty']=x.quantity
                tmp['purchased']=x.created
                tmp['Status']=x.delevery_status
            tmp_copy=tmp.copy()
            res.append(tmp_copy)

    return Response(res) 
    


@api_view(['POST'])
def upload_data(request):
    file=request.FILES["file"]
    content =file.read()
    file_content=ContentFile(content)
    file_name=fs.save(
    "_tmp.csv" , file_content
    )
    tmp_file=fs.path(file_name)
    csv_file=open(tmp_file,errors="ignore")
    reader=csv.reader(csv_file)
    next(reader)
    book_list=[]

    for id_, row in enumerate(reader):
        (UserID,ISBN,BookRating
        )=row 
            
        book_list.append(
                Rating(
                 user_id=UserID,
                 isbn=ISBN,
                 rating=BookRating
                )
        )

        
    Rating.objects.bulk_create(book_list)

    return Response('uploaded')

# {11676,278582,209875,141444,187624} 
@api_view(['GET'])
def recommentation(request,pk):
    import joblib
    books=[]
    res1={}
    latest_orders=[]
    index_order=[]
    isbns=[]
    res={}
    final_recom=[]
    # Rating Recom
    cls=joblib.load("finalmodel.sav")
    val=cls.loc[cls['UserID']==pk]
    for i in val.Book:
        try:
            book=Books.objects.get(Book_title=i)
            books.append(book)
        except:
            ''
    if len(books)==0:
        t=['0380715899','043920352X','0971880107']
        for i in t:
            book=Books.objects.get(ISBN=i)
            res1['title']=book.Book_title
            res1['author']=book.Book_Author
            res1['isbn']=book.ISBN
            res1['id']=book.id
            res1['img']=str(book.img_url_L)
            res_copy=res1.copy()
            final_recom.append(res_copy)
    if len(books)!=0:
        for x in books:
            res1['title']=x.Book_title
            res1['author']=x.Book_Author
            res1['isbn']=x.ISBN
            res1['id']=x.id
            res1['img']=str(x.img_url_L)
            res_copy1=res1.copy()
            final_recom.append(res_copy1)

    # Purchase Recom
    cls=joblib.load("finalmodel1.sav")
    cls.fillna(0, inplace=True)
    book_sparse = csr_matrix(cls)
    model = NearestNeighbors(algorithm='brute')
    model.fit(book_sparse)

    try:
        user_order=Orders.objects.filter(user_id=pk).order_by('-id')[0]
        latest_orders.append(user_order.orders.ISBN)
        for i in range(len(cls)):
            if cls.index[i]==latest_orders[0]:
                index_order.append(i)
                break
    except:
        return Response(final_recom)
    print(index_order)
    try:
        distances, suggestions = model.kneighbors(cls.iloc[index_order[0], :].values.reshape(1, -1))
        for i in range(len(suggestions)):
            for x in cls.index[suggestions[i]]:
                if latest_orders[0] !=x:
                    isbns.append(x)
    except:
        return Response(final_recom) 

    for x in isbns:
        book=Books.objects.get(ISBN=x)
        res['title']=book.Book_title
        res['img']=str(book.img_url_L)
        res['author']=book.Book_Author
        res['isbn']=book.ISBN 
        res['id']=book.id
        res_copy=res.copy()
        final_recom.append(res_copy)

    
   
    return Response(final_recom)


 