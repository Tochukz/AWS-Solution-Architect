import boto3
import json

def handler(event, context):
    s3_client = boto3.client('s3')
    rekognition_client = boto3.client('rekognition')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('ImageAnalysisResults')  # Replace with your table name

    bucket_name = event['Records'][0]['s3']['bucket']['name']
    object_key = event['Records'][0]['s3']['object']['key']

    response = rekognition_client.detect_labels(
        Image={'S3Object': {'Bucket': bucket_name, 'Name': object_key}},
        MaxLabels=10
    )

    labels = [{'Confidence': label['Confidence'], 'Name': label['Name']} for label in response['Labels']]
    table.put_item(
        Item={
            'ImageName': object_key,
            'Labels': json.dumps(labels)
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps('Image processed successfully!')
    }
