import requests

url = "http://localhost:4000"
#url = "https://group-sync.onrender.com"
a = requests.post(url + "/add-group", json={'creator': 'Walker', 'title' : 'Class', 'description' : 'CSCE 430 class BABY', 'usernames': ['howie','walkerdrury']})

print(a.text)