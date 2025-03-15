# Lambda Bridge

## Custom event from Lambda to Lambda

## Requirement

This solution demonstrates how two Lambda functions can communicate to each other using custom events.

## Solution

We create two Lambda Functions and an EventBrige Rule.  
One Lambda function triggers the event and the second Lambda function responds to the emitted event and logs it to the console.

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaBridge.yaml

```

Deploy the stack.

```bash
$ aws cloudformation deploy --template-file LambdaBridge.yaml --stack-name LambdaBridge --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**  
Invoke the first Lambda, `SimpleFuncA`

```bash
$ aws lambda invoke --function-name SimpleFuncA output.json
```

Go to the Lambda Console and check the logs for the second Lambda, `SimpleFuncB`.  
You should see logs shows that SimpleFuncB received the event emitted by SimpleFuncA and logged the event.  
A sample of the event received by SimpleFuncB on the logs looks like this:

```json
{
  "version": "0",
  "id": "11c96dca-4bb0-51ef-9fa7-fde800ee79f1",
  "detail-type": "CustomEvent",
  "source": "demo.simple_evt",
  "account": "314146339647",
  "time": "2025-03-15T18:02:50Z",
  "region": "eu-west-2",
  "resources": [],
  "detail": {
    "message": "Hello from Lambda A!"
  }
}
```

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaBridge
```
