import boto3

dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('Users')

response = table.scan() # using query() is more efficient that scan()
items = response['Items']
print("Items: ", items)

