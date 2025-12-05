import json
import boto3

eventbridge = boto3.client('events')

def handler(event, context):
  response = eventbridge.put_events(
    Entries=[
      {
        'Source': 'demo.simple_evt',
        'DetailType': 'CustomEvent',
        'Detail': json.dumps({"message": "Hello from Lambda A!"}),
        'EventBusName': 'default'
      }
    ]
  )
  return {"statusCode": 200, "body": json.dumps(response)}