import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/add-event", json={'creator': 'howie', 'start_time' : '08:00:00', 'end_time' : '13:00:00', 'description': '', 'title': 'coding', 'usernames': ['John,walkerdrury'], 'date': '2022-01-29'})

print(a.text)