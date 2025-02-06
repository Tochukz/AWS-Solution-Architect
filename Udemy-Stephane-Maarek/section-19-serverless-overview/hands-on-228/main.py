import json

def handler(event, context):
  body = "Staff Engineer Chucks"
  statusCode = 200
  return {
    "statusCode": statusCode,
    "body": json.dumps(body),
    "headers": { 
    "Content-Type": "application/json"
    }
  }