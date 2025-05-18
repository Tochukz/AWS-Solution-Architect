import json

def handler(event, context):
    print('LogEC2StopInstance')
    print('Received event:', json.dumps(event, separators=(',', ':')))
    return {
        'statusCode': 200,
        'body': 'Finished'
    }
