# SQS to Lambda

## Lambda Function Subscribed to SQS Queue

## Requirement

We want our Lambda function to be subscribe to a SQS Queue.

## Solution

We have created a _Lambda EventSourceMapping_ resource that maps SQS Queue messages to the desired Lambda function. This way, the Lambda function is subscribed to the Queue as an event source, thus allowing the Lambda function to be triggered automatically whenever messages are available in the queue.

**Key Points:**  
**Event Source Mapping**: Lambda uses an event source mapping to poll the SQS queue and invoke the function with messages.  
**Trigger Mechanism**: Lambda automatically polls the SQS queue (using long polling) and processes messages in batches.

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint SqsToLambda.yaml

```

Deploy the stack.

```bash
$ aws cloudformation deploy --template-file SqsToLambda.yaml --stack-name SqsToLambda --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**  
Send a batch of messages to the queue

```bash
$ aws sqs send-message-batch --queue-url https://sqs.eu-west-2.amazonaws.com/314146339647/DemoQueue --entries  file://books.json
```

The messages will be picked up by the Lamba quickly and processed.  
The messages are then automatically deleted from the Queue.  
When you check the Lambda logs, you can see the logged messages.  
The `sample-event-messages` file contains a sample of the `event` object sent as argument to the Lambda handler.  
**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SqsToLambda
```
