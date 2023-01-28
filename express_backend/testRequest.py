import requests

url = "http://localhost:4000"
#url = "https://tyson-express.onrender.com"
a = requests.post(url + "/authenticate", json={'username': 'walkerdrury', 'password': 'password1'})

#a = requests.get("http://localhost:4000/get-ingredients/orange chicken")
print(a.text)