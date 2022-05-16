import moviepy.editor as mp
import moviepy
import tkinter as tk
from tkinter import filedialog

counter=0
fenster=tk.Tk()
fenster.withdraw()

dateien=filedialog.askopenfilenames(parent=fenster,title="Domenic´s pfad fenster")
name =input("bitte name eingeben\n:")
for datei in fenster.tk.splitlist(dateien):
    video = mp.VideoFileClip(datei)
    counter=counter+1
    zahl=str(counter)
    video.audio.write_audiofile(r"C:/Users/domen/Music/"+name+zahl+".mp3")
