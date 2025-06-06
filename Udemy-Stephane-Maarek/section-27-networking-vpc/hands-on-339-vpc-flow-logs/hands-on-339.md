# Lesson 339: VPC Flow Logs - Hands On

### Description

The configuration sets up a VPC Flow Log that delivers Logs to CloudWatch Log Group and S3 bucket as target destinations.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint VpcFlowLogs.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file VpcFlowLogs.yaml  --stack-name VpcFlowLogs --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**

1. List the S3 bucket objects to get the Log File deposited by the VPC logs

```bash
$ aws s3api list-objects --bucket vpc-logs-29-04-2024
```

2. Download the file from the S3 bucket to take a closer look

```bash
$ aws c3 cp s3://vpc-logs-29-04-2024/path/to/log-file.log.gz log-file.log.gz
```

Unzip the file to see the logs.

3. Go to CloudWatch console and inspect the Logs of the `/aws/vpc-flow-logs/SimpleDemo` log group.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name VpcFlowLogs > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
Empty the Log bucket

```bash
$ aws s3 rm s3://vpc-logs-29-04-2024 --recursive
```

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name VpcFlowLogs
```
