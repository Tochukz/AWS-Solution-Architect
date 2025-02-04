# Lesson 225: Amazon DynamoDB - Hands On

### Description

This template creates a DynamoDB table.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint DynamoDb.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file DynamoDb.yaml  --stack-name DynamoDb
```

**Testing**
Insert an item into the DynamoDB table

```bash
$ python insert-item.py
```

Read all items from the DynamoDB table

```bash
$ python get-items.py
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name DynamoDb > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name DynamoDb
```
