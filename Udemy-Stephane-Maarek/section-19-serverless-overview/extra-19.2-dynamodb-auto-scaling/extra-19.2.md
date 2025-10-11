# Lesson 19.2: DynamoDB Auto Scaling

### Description

This example shows how th provisioned throughput for a DynamoDB can be auto scaled based on the traffic.  
The example provisions a DynamoDB table with read and write capacity auto scaling enabled.  
It also creates the necessary IAM roles and policies to allow Application Auto Scaling to modify the provisioned throughput of the DynamoDB table.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint DynamoDbAutoScaling.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file DynamoDbAutoScaling.yaml  --stack-name DynamoDbAutoScaling --capabilities CAPABILITY_IAM
```

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name DynamoDbAutoScaling > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name DynamoDbAutoScaling
```
