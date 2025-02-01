import threading
import requests

dns_name='NginxServerBalancer-1651106484.eu-west-2.elb.amazonaws.com'
server_url='http://' + dns_name

count=0
def load_page(): 
  global count
  count = count + 1
  print(f"Loading page {count}")
  response = requests.get(server_url)
  print(f"Status: {response.status_code}")
  threading.Timer(0.01, load_page).start()


for i in range(0, 100):
  load_page()