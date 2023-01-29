import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/add-event", json={'creator': 'ibrahimsemary', 'start_time' : '2022-02-12 10:00:00', 'end_time' : '2022-02-12T10:00:00.000Z', 'description': '', 'title': 'tester11', 'usernames': ['John']})

print(a.text)