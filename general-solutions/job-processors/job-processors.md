# Job Processors

## Processing long running processes using Queues, Step Functions and Lambda functions.

## Requirement

This solution is for a real live scenerio for an application.

## Solution

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Workers.yaml
$ cfn-lint Managers.yaml
```

1. Deploy the Workers stack.

```bash
$ aws cloudformation deploy --template-file Workers.yaml --stack-name Workers --capabilities CAPABILITY_NAMED_IAM
```

2. Deploy the Managers stack

```bash
$ aws cloudformation deploy --template-file Managers.yaml --stack-name Managers --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**  
Manually triggger the Scheduled event

```bash
# Get the ARN of the event
$ aws events list-rules --name-prefix Daily7AmTrigger
# Trigger an event
$ aws events put-events --entries file://scheduled-event.json
```

**Clean up**
Empty S3 bucket

```bash
$ aws s3 rm  s3://job-processor-04-2025/ --recursive
```

Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Managers
$ aws cloudformation delete-stack --stack-name Workers
```
