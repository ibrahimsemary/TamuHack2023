import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/add-event", json={'creator': 'walkerdrury', 'start_time' : '08:30:00', 'end_time' : '10:00:00', 'description': '', 'title': 'coding', 'usernames': ['ibrahimsemary',''], 'date': '2022-01-29'})

print(a.text)