import requests

url = "http://localhost:4000"
#url = "https://tyson-express.onrender.com"
a = requests.post(url + "/add-event", json={'creator': 'walkerdrury', 'start_time': '2022-01-01', 'end_time': '2022-01-01', 'description': 'hw'})

#a = requests.get("http://localhost:4000/get-ingredients/orange chicken")
print(a.text)