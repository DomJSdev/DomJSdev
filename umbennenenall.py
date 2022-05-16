import os

def renamebilder (path,neuname,number):
    datei = []
    liste=os.listdir(path)
    os.chdir(path)
    count=number
    for x in liste:
        if x.endswith(".jpg"or ".jpeg" or ".JPEG"):
            datei.append(x)
            datei.sort()
    for i in datei:
        os.rename(i,neuname+str(count)+".jpg")
        count+=1

def renamepython (path,neuname,number):
    datei = []
    liste=os.listdir(path)
    os.chdir(path)
    count=number
    for x in liste:
        if x.endswith(".py"):
            datei.append(x)
            datei.sort()
    for i in datei:
        os.rename(i,neuname+str(count)+".py")
        count+=1

def renamepdf (path,neuname,number):
    datei = []
    liste=os.listdir(path)
    os.chdir(path)
    count=number
    for x in liste:
        if x.endswith(".pdf"):
            datei.append(x)
            datei.sort()
    for i in datei:
        os.rename(i,neuname+str(count)+".pdf")
        count+=1


neuname=input("dateiname:")
path=input("Ornder/:")
print("befehle: jpg, py, pdf")
dateityp=input("welchen dateityp:")



if dateityp == "jpg":
    renamebilder(path, neuname, 1)
elif dateityp == "py":
    renamepython(path,neuname,1)
elif dateityp == "pdf":
    renamepdf(path,neuname,1)
else:
    print("nicht ausführbar")

os.path.exists("datei.txt")