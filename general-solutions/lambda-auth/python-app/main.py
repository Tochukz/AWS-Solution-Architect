import boto3
import requests
from requests_aws4auth import AWS4Auth

session = boto3.Session()
credentials = session.get_credentials()
region = 'eu-west-2'

auth = AWS4Auth(credentials.access_key, credentials.secret_key, region, 'lambda',
                session_token=credentials.token)

url = 'https://b34dz6xi7uhr6z3u5xhvkt6fqu0bmjcq.lambda-url.eu-west-2.on.aws'
response = requests.get(url, auth=auth)

print(response.status_code, response.text)
