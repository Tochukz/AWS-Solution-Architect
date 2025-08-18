# Lambda Retry

## Testing Lambda Retry by Event Bridge

## Requirement

This configuration is a variation of `lambda-no-retry` where we disable the retry behavior of the Lambda function when it fails.  
The Lambda function is invoked by an Event Bridge rule at a scheduled time, and if it fails, it sends a notification to an SNS topic without retrying the invocation.  
In this example, we do not use the Lambda `DeadLetterConfig`, we only use the Lambda Destination configuration (i.e `AWS::Lambda::EventInvokeConfig`) to send the failure notification to an SNS topic we then use the _Fanout Technique_ to push the failure notification to an SQS queue and an email address.

## Solution

Create a Lambda Function and and a scheduled Event Bridge rule to invoke the Lambda function at a given time.

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaNoRetry2.yaml
```

Deploy the stack.

```bash
$ aws cloudformation deploy --template-file LambdaNoRetry2.yaml --stack-name LambdaNoRetry2 --capabilities CAPABILITY_NAMED_IAM --parameter-overrides "Email=yourmail@gmail.com"
```

**After Deployment**

**Testing**  
Wait for the Lambda function to be invoked at the scheduled time.  
Wait for 3 minutes and check the logs again to confirm that the Lambda was not invoked a second time.

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaNoRetry2
```
