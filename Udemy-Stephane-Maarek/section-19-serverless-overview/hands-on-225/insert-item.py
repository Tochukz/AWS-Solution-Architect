import boto3

dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('Users')
user = {
  'UserId': 1,
  'Firstname': 'Chucks',
  'Lastname': 'Nwachukwu',
  'Income': 120000
}
response = table.put_item(Item=user)

if response['ResponseMetadata']['HTTPStatusCode'] == 200 :
  print("Successfully inserted one item")
else: 
  print("Failed to insert item")