# Lesson 159: S3 Access Logs - Hands On

### Description

This template configures Logging for an S3 Bucket. The access logs for the S3 bucket in saved in another S3 bucket.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint S3AccessLogs.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3AccessLogs.yaml  --stack-name S3AccessLogs
```

**Post Deployment**

**Testing**  
Copy files into the main bucket.

```bash
$ aws s3 cp data/users.json s3://main-bucket-01-25/users.json
```

Wait for a while (like hours) and then check the access logs bucket to see if log file have been created

```bash
$ aws s3api list-objects --bucket access-logs-bucket-01-25 --prefix logs
```

You can download the log file to look at it

```bash
$ aws s3 cp s3://access-logs-bucket-01-25/logs/2025-01-11-00-26-41-98B362F6645AA32C logs.txt
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3AccessLogs > events.json
```

**Cleanup**  
Delete all the objects in the buckets

```bash
$ aws s3 rm s3://main-bucket-01-25/ --recursive
$ aws s3 rm s3://access-logs-bucket-01-25/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3AccessLogs
```
