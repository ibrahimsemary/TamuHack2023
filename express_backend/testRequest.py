import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/remove-user-group", json={'groupsid': 76, 'username' : 'howie'})

print(a.text)