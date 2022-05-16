from tkinter import filedialog
from PyPDF2  import PdfFileReader, PdfFileWriter
import tkinter as tk
import os
import shutil

def merge_pdfs(name):
    pdf_schreiben= PdfFileWriter()
    fenster = tk.Tk()
    fenster.withdraw()
    dateien=filedialog.askopenfilenames(parent=fenster,title="Domenic´s pfad fenster")
    for datei in fenster.tk.splitlist(dateien):

        pdf_lesen=PdfFileReader(datei)
        for seite in range(pdf_lesen.getNumPages()):
            pdf_schreiben.addPage(pdf_lesen.getPage(seite))
    print("PDF`s werden zusammen geführt")
    with open(name,"wb") as out:
        pdf_schreiben.write(out)
        print("PDF-Datei erfolgreich erstellt")
        out.close()
        pfad1=os.getcwd()+"/"+name
        pfad2 = os.sep.join(os.getcwd().split(os.sep)[:-1])
        pfad3 = [pfad2]
        pfad3.append("/" + name)
        zeichen = ""
        pfad4 = zeichen.join(pfad3)
        shutil.move(pfad1,pfad4)
        print(pfad4)

print("bitte den gewünschten Dateinamen \nfür das PDF eingeben")
dateiname=input(":")+".pdf"
merge_pdfs(dateiname)