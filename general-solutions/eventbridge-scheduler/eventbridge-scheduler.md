# EventBridge Scheduler

## Requirement

Schedule a message to be sent into an SQS Queue at a later time using EventBridge Scheduler.  
The message should then be picked up by a Lambda function and processed.  
The Lambda function is triggered by the SQS Queue using EventSource Mapping configuration.

Here we demonstrate two types of scheduling:

1. One-time scheduling: Send a message to the SQS queue after a specified delay (e.g., 30 minutes).
2. Recurring scheduling: Send a message to the SQS queue at regular intervals (e.g., every 30 minutes).

## Operation

**Pre Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint EventBridgeScheduler.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EventBridgeScheduler.yaml --stack-name EventBridgeScheduler --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**  
Wait for the Time specified in the DateTime parameter (in UTC format) to see the one-time scheduled message being processed by the Lambda function.  
Go to the LogGroup `/aws/lambda/DelayedProcessor` to see the logs from the Lambda function.

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EventBridgeScheduler
```
