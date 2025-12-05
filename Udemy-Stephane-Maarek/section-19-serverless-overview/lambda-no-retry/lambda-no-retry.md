# Lambda Retry

## Disabled Invocation Lambda Retry by Event Bridge

## Requirement

This configuration stops the Event Bridge from invoking Lambda function the second time if there is a failure or timeout on the first try.  
We do this by setting the `MaximumRetryAttempts` to zero in the Event Bridge rule.  
We also add `DeadLetterConfig` to the Lambda function and a _Lambda Destination_ resource (i.e `AWS::Lambda::EventInvokeConfig`).

`DeadLetterConfig` and _Lambda Destination_ are similar but Lambda Destination provides more details including the lambda context and error which the DeadLetterConfig does not collect. The DeadLetterConfig only provides details about the EventBridge event.

See `sample-lambda-deadletter-result.json` for the details collected by the `DeadLetterConfig` and `sample-lambda-destination-result.json` for the details collected by the Lambda Destination resource.

## Solution

Create a Lambda Function and and a scheduled Event Bridge rule to invoke the Lambda function at a given time.

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaNoRetry.yaml
```

Deploy the stack.

```bash
$ aws cloudformation deploy --template-file LambdaNoRetry.yaml --stack-name LambdaNoRetry --capabilities CAPABILITY_NAMED_IAM --parameter-overrides "Email=yourmail@gmail.com"
```

**After Deployment**

**Testing**  
Wait for the Lambda function to be invoked at the scheduled time.  
Wait for 3 minutes and check the logs again to confirm that the Lambda was not invoked a second time.

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaNoRetry
```
