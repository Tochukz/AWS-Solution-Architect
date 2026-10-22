# API Gateway to SQS Integration

## Requirement

A webhook service accepts POST request and processes payload coming from a third party service.  
The webhook service is hosted by a Lambda function.  
If the Lambda function fails processing a message, the message will be lost.  

A better solution is to send the message directly from the third party service to a queue and let the Lambda function pull the messages from the queue and remove messages after they have been successfully processed.  

## Solution

To address the concern discribed in the requirement, we configure an API Gateway to SQS integration so that POST payload from the third party API gets sends directly to the SQS Queue.  
We then use Event Source Mapping to integrate the SQS Queue with the Lambda function.  
The Lambda function will then be triggered any time a message is received by the queue.  
Only messages that have been successfully processed is removed from the Queue.  


## Operation
**Before Deployment**  
Package and deploy the Lambda handler code 
```bash
$ ./deploy-code.sh
```  

If the code is updated and dedeployed after deployment of the stack, you can update the Lambda function 
```bash 
$ aws lambda update-function-code \
    --function-name MessageProcessorFunc \
    --s3-bucket cloud-works \
    --s3-key v1.0.0/lambda-code-22-10.zip
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint ApiGatewayToSqs.yaml
```

Deploy the ApiGatewayToSqs stack
```bash
$ aws cloudformation deploy --template-file ApiGatewayToSqs.yaml --stack-name ApiGatewayToSqs --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  

Get the output of the ApiGateway stack
```bash
$ aws cloudformation describe-stacks --stack-name ApiGatewayToSqs --query "Stacks[0].Outputs" --no-cli-pager
```
**Testing**  

1. Normal processing of messages
Send a post request to the `ApiEndpoint` from the stack output.

```bash
$ curl -X POST "YOUR_API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "X-Tenant-Id: tenant-123" \
  -H "X-Event-Type: lab.result.created" \
  -d '{ "orderId": "12345", "status": "pending" }'
```
Check the Lambda function LogGroup to see the loggings of the received message.  
The POST request headers will become the SQS message attributes.  
See `sample-events.json` for the object structure, see the `messageAttributes` for the mapped request headers.     


2. Simulated failure
Send a post request with a message that will be used to simulate failure in the Lambda code
```bash 
$ curl -X POST "YOUR_API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "X-Tenant-Id: tenant-123" \
  -H "X-Event-Type: lab.result.created" \
  -d '{ "orderId": "12345", "status": "failed" }'
``` 
The Lambda function LogGroup will should the logging for the error raised.  

The event source will retry the Lambda function to reprocess the failed message 3 times total before it sends the message to it's dead letter queue.   

**Clean up**  

Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name ApiGatewayToSqs
```

__Learn More__  
