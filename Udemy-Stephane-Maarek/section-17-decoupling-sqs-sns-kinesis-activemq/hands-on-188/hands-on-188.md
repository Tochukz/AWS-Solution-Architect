# Lesson 188: SQS - Fifo Queue

### Description

This template configures a Fifo Queue

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint FifoQueue.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file FifoQueue.yaml  --stack-name FifoQueue
```

**Testing**  
First, get the Queue URL from the Stack Outputs

```bash
$ aws cloudformation describe-stacks --stack-name FifoQueue --query "Stacks[0].Outputs" --no-cli-pager
```

Send a messages to the Queue

```bash
$ aws sqs send-message --queue-url https://sqs.eu-west-2.amazonaws.com/314146339647/SimpleQueue.fifo --message-body "Chucks Senior Developer" --message-deduplication-id 1 --message-group-id ChucksProgress
$ aws sqs send-message --queue-url https://sqs.eu-west-2.amazonaws.com/314146339647/SimpleQueue.fifo --message-body "Chucks Staff Enginer" --message-deduplication-id 2 --message-group-id ChucksProgress
$ aws sqs send-message --queue-url https://sqs.eu-west-2.amazonaws.com/314146339647/SimpleQueue.fifo --message-body "Chucks Principal Engineer" --message-deduplication-id 3 --message-group-id ChucksProgress
```

Receive messages from the Queue

```bash
$ aws sqs receive-message --queue-url  https://sqs.eu-west-2.amazonaws.com/314146339647/SimpleQueue.fifo --max-number-of-messages 10 --wait-time-seconds 20 > messages.json
```

Delete a message from the Queue

```bash
$ aws sqs delete-message  --queue-url  https://sqs.eu-west-2.amazonaws.com/314146339647/SimpleQueue.fifo  --receipt-handle <receipt-handle>
```

Delete all messages from the Queue

```bash
$ aws sqs purge-queue --queue-url  https://sqs.eu-west-2.amazonaws.com/314146339647/SimpleQueue.fifo
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name FifoQueue > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name FifoQueue
```
