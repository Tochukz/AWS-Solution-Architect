import json
import logging 

logger = logging.getLogger()
logger.setLevel(logging.INFO)
  
def handler(event, context):
  logger.info("Received event: %s", json.dumps(event))

  for record in event.get("Records", []):
    message_body = record["body"]

    try: 
      payload = json.loads(message_body)
    except json.JSONDecodeError: 
      payload = message_body 

    if isinstance(payload, dict) and payload.get("status") == "failed":
      raise ValueError(f"Message status: {payload['status']}")
    
    logger.info("Processing SQS message: %s", payload)

  return {"statusCode": 200}


# if __name__ == "__main__":
#   logging.basicConfig()

#   event = {"Records": [{"body": json.dumps({"hello": "world"})}]}  
#   print(handler(event, None))

#   # errorEvent = {"Records": [{"body": json.dumps({"status": "failed"})}]}
#   # print(handler(errorEvent, None))