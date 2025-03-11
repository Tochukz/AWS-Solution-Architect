import os
import json
import boto3

sfn_client = boto3.client('stepfunctions')

def handler(event, context):
  try:
    print('context', context)
    state_machine_arn = os.environ.get('STATE_MACHINE_ARN')

    if not state_machine_arn:
      raise ValueError("STATE_MACHINE_ARN environment variable is not set.")

    input = json.dumps(event) 
    
    response = sfn_client.start_execution(
      stateMachineArn=state_machine_arn,
      input=input
    )

    print("State Machine execution started:", response['executionArn'])

    return {
      'statusCode': 200,
      'body': json.dumps({
        'message': 'State Machine execution started successfully!',
        'executionArn': response['executionArn']
      })
    }
  except Exception as e:
    print("Error starting State Machine execution:", str(e))

    return {
      'statusCode': 500,
      'body': json.dumps({
        'message': 'Failed to start State Machine execution.',
        'error': str(e)
      })
    }


handler({}, {})