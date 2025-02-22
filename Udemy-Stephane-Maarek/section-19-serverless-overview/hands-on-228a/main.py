import json

def handler(event, context):
  body = [{"name": "Chucks Nwachukwu"}, {"name": "James Brown"}]
  return {
    "statusCode": 200,
    "body": json.dumps(body),
    "headers": { 
      "Content-Type": "application/json"
    }
  }

result=handler({}, {})
print(result)