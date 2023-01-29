import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/create-user", json={'username': 'ibrahimsemary', 'password': 'password2', 'first_name': 'Ibrahim', 'last_name': 'Semary', 'email': 'ibrahimsemary@tamu.edu'})

print(a.text)