import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
import os

class ResponsiveApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Responsive Tkinter UI")
        self.root.geometry("800x600")
        
        # Ana çerçeve (responsive)
        self.main_frame = ttk.Frame(root)
        self.main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Image Label
        self.image_frame = ttk.Frame(self.main_frame)
        self.image_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        self.image_label = ttk.Label(self.image_frame)
        self.image_label.pack(fill=tk.BOTH, expand=True)
        
        # Listbox
        self.listbox_frame = ttk.Frame(self.main_frame)
        self.listbox_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        ttk.Label(self.listbox_frame, text="Liste:").pack(anchor=tk.W)
        
        scrollbar = ttk.Scrollbar(self.listbox_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.listbox = tk.Listbox(self.listbox_frame, yscrollcommand=scrollbar.set)
        self.listbox.pack(fill=tk.BOTH, expand=True)
        scrollbar.config(command=self.listbox.yview)
        
        # Örnek veri
        items = [f"Öğe {i+1}" for i in range(10)]
        for item in items:
            self.listbox.insert(tk.END, item)
        
        # Butonlar çerçevesi
        self.button_frame = ttk.Frame(self.main_frame)
        self.button_frame.pack(fill=tk.X, padx=5, pady=10)
        
        self.btn1 = ttk.Button(self.button_frame, text="Buton 1", command=self.button1_click)
        self.btn1.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)
        
        self.btn2 = ttk.Button(self.button_frame, text="Buton 2", command=self.button2_click)
        self.btn2.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)
        
        self.btn3 = ttk.Button(self.button_frame, text="Buton 3", command=self.button3_click)
        self.btn3.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)
        
        # Pencere yeniden boyutlandırılırken responsive davranış
        self.root.bind("<Configure>", self.on_resize)
        
        # Varsayılan görüntü yükle
        self.load_default_image()
    
    def load_default_image(self):
        try:
            # Örnek bir görüntü oluştur (255x200)
            img = Image.new('RGB', (255, 200), color='lightblue')
            self.photo = ImageTk.PhotoImage(img)
            self.image_label.config(image=self.photo)
        except Exception as e:
            self.image_label.config(text=f"Görüntü yüklenemedi: {e}")
    
    def on_resize(self, event):
        # Pencere boyutu değiştiğinde responsive davranış
        pass
    
    def button1_click(self):
        selection = self.listbox.curselection()
        if selection:
            print(f"Seçilen: {self.listbox.get(selection[0])}")
    
    def button2_click(self):
        print(f"Listbox içeriği: {self.listbox.get(0, tk.END)}")
    
    def button3_click(self):
        self.listbox.delete(0, tk.END)
        items = [f"Yeni Öğe {i+1}" for i in range(5)]
        for item in items:
            self.listbox.insert(tk.END, item)

if __name__ == "__main__":
    root = tk.Tk()
    app = ResponsiveApp(root)
    root.mainloop()
