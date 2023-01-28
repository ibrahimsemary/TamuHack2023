import requests

#url = "http://localhost:4000"
url = "https://group-sync.onrender.com"
a = requests.post(url + "/authenticate", json={'username': 'walkerdrury', 'password': 'password1'})

print(a.text)