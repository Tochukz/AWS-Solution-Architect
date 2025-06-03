# Lesson 185: SQS - Standard Queue Hands On

### Description

This template configures a Standard Queue

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint StandardQueue.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file StandardQueue.yaml  --stack-name StandardQueue
```

**Testing**  
First, get the Queue URL from the Stack Outputs

```bash
$ aws cloudformation describe-stacks --stack-name StandardQueue --query "Stacks[0].Outputs" --no-cli-pager
```

Send a messages to the Queue

```bash
$ aws sqs send-message --queue-url https://sqs.eu-west-2.amazonaws.com/314146339647/DemoStandardQueue --message-body file://message.json
$ aws sqs send-message --queue-url https://sqs.eu-west-2.amazonaws.com/314146339647/DemoStandardQueue --message-body file://message.xml
$ aws sqs send-message --queue-url https://sqs.eu-west-2.amazonaws.com/314146339647/DemoStandardQueue --message-body 'Hello Architect!' --message-attributes file://attributes.json
```

Receive messages from the Queue

```bash
$ aws sqs receive-message --queue-url  https://sqs.eu-west-2.amazonaws.com/314146339647/DemoStandardQueue --max-number-of-messages 10 --wait-time-seconds 20 > messages.json
```

Delete a message from the Queue

```bash
$ aws sqs delete-message  --queue-url  https://sqs.eu-west-2.amazonaws.com/314146339647/DemoStandardQueue --receipt-handle <receipt-handle>
```

Delete all messages from the Queue

```bash
$ aws sqs purge-queue --queue-url  https://sqs.eu-west-2.amazonaws.com/314146339647/DemoStandardQueue
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name StandardQueue > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name StandardQueue
```
