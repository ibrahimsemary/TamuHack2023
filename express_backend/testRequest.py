import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/add-event", json={'creator': 'walkerdrury', 'start_time' : '08:30:00', 'end_time' : '13:45:00', 'description': '', 'title': 'coding', 'usernames': ['ibrahimsemary',''], 'date': '2022-01-29', 'groupsid': 1})

print(a.text)