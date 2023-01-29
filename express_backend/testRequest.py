import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/remove-group", json={'groupsid':9})

print(a.text)