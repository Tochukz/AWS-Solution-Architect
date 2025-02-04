import threading
import requests
dns_name = 'AppLoadBalancer-977078372.eu-west-2.elb.amazonaws.com' 
website_url = 'http://' + dns_name

max_request = 100000
request_count = 0

def make_request():
  global request_count
  request_count = request_count + 1
  print(f"Making Request {request_count}")
  if (request_count > max_request):
    return

  response = requests.get(website_url)
  if response.status_code == 200 : 
    print(f"Html: {response.text}")

  threading.Timer(2, make_request).start()

make_request()
