# Fanout

## Message fanout from SNS topic to Queue, Lambda and Step Function

## Requirement

This solution is for a real live scenerio for an application.

## Solution

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint SnsFanout.yaml
```

Deploy the SnsFanout stack.

```bash
$ aws cloudformation deploy --template-file SnsFanout.yaml --stack-name SnsFanout --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**
Add an email subscription to the SNS topic

```bash
$ aws sns subscribe --protocol email --topic-arn arn:aws:sns:eu-west-2:314146339647:MyStepFunctionSNSTopic --notification-endpoint truetochukz@gmail.com
```

**Testing**  
Public some messages to the SNS topic

1. Publish a single messages

```bash
$ aws sns publish --topic-arn arn:aws:sns:eu-west-2:314146339647:MyStepFunctionSNSTopic --message file://messages/book-1.json
```

2. Publish another single message

```bash
$ aws sns publish --topic-arn arn:aws:sns:eu-west-2:314146339647:MyStepFunctionSNSTopic --message file://messages/book-2.json
```

3. Publish a batch of messages

```bash
$ aws sns publish-batch --topic-arn arn:aws:sns:eu-west-2:314146339647:MyStepFunctionSNSTopic --publish-batch-request-entries
```

**Clean up**
Empty S3 bucket

````bash
$ aws s3 rm  s3://job-processor-04-2025/ --recursive

Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SnsFanout
````
