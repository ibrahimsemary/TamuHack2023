import requests

url = "http://localhost:4000"
#url = "https://tyson-express.onrender.com"
a = requests.post(url + "/add-group", json={'username': 'walkerdrury', 'title': 'Gym', 'description': ''})

#a = requests.get("http://localhost:4000/get-ingredients/orange chicken")
print(a.text)