t=int(input())
if(t>=1 and t<=1200):
    while t>0:
        a,b=int(input()),int(input())
        if(a>=1 and a<=100000 and b>=1 and b<=100000):
            if(a<1200):
                cost=b*a
                print("%.6f" % cost)
            else:
                cost=(b*a)-((b*a)/10)
                print("%.6f" % cost)
        else:
            print("Invalid Input")
    t=t-1
else:
    print("Invalid Input")