from django.shortcuts import render

def welcome(request):
    return render('interface/welcome.html')
