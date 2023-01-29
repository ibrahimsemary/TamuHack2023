import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/add-event", json={'creator': 'John','start_time': '12:00:00', 'end_time': '14:00:00', 'title': 'Cup Ramen Time', 'description': "",'date': '2022-01-30', 'groupsid': 83})

print(a.text)