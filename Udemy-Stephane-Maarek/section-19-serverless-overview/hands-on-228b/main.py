import json

def handler(event, context):
  body = "Staff Engineer Chucks"
  return {
    "statusCode": 200,
    "body": json.dumps(body),
    "headers": { 
      "Content-Type": "application/json"
    }
  }

result=handler({}, {})
print(result)