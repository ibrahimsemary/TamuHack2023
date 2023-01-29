import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/add-user-event", json={'eventid': 87, 'username': 'howie', 'groupsid': 112})

print(a.text)