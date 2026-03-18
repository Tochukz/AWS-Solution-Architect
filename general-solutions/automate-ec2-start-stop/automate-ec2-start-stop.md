# EventBridge Scheduler

## Requirement

We need to configure 

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
Wait for the Time specified in the `DateTime` parameter (in UTC format) to see the one-time scheduled message being processed by the Lambda function.  
Go to the LogGroup `/aws/lambda/DelayedProcessor` to see the logs from the Lambda function.

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EventBridgeScheduler
```
