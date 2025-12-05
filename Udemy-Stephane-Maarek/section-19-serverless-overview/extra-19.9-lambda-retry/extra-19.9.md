# Extra 19.9: Lambda Retry

## Testing Lambda Retry by Event Bridge

## Requirement

It is possible that a Lambda function may be invoked a second and third time by Event Bridge if it fails or timeout on the first try.  
This configuration is made to test that assertion.  

## Solution
Create a Lambda Function and and a scheduled Event Bridge rule to invoke the Lambda function at a given time.
## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaRetry.yaml

```

Deploy the stack.

```bash
$ aws cloudformation deploy --template-file LambdaRetry.yaml --stack-name LambdaRetry --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**  
Wait for the Lambda function to be invoked at the scheduled time.  
Check the logs to see if the function was invoked multiple time.

I can see that the Lambda function output the same log text the console 3 times. This confirms that the Event bridge invokes the Lambda function 3 times - 1 invocation and 2 retries.

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaRetry
```
