import boto3
from botocore.exceptions import WaiterError

def wait_until_instance_stopped(ec2_client, instance_id):
    waiter = ec2_client.get_waiter('instance_stopped')
    try:
        waiter.wait(InstanceIds=[instance_id])
    except WaiterError as e:
        print(f"Error waiting for instance to stop: {e}")

def handler(event, context):
    instance_id = event['instanceId']
    ec2_client = boto3.client('ec2')
    
    try:
        ec2_client.stop_instances(InstanceIds=[instance_id])
        wait_until_instance_stopped(ec2_client, instance_id)
        
        ec2_client.modify_instance_attribute(InstanceId=instance_id, InstanceType={'Value': 't2.micro'})
    
        ec2_client.start_instances(InstanceIds=[instance_id])
        
        return 'Instance resizing complete.'
    
    except Exception as e:
        return f'Error resizing instance: {e}'
    

# Test event JSON: {"instanceId": "<instance-ID>"}