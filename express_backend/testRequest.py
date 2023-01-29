import requests

#url = "http://localhost:4000"
url = "https://group-sync.onrender.com"
a = requests.post(url + "/add-user-groups", json={'groupid': '1', 'username': 'howie'})

print(a.text)