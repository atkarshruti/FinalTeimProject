import requests

url = f'http://127.0.0.1:3000/instagram'

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code} - {response.json()['error']}")