# Lesson 196: Amazon Data FireHose - Hands On

### Description

This template configures a Kinesis Firehose Stream which has a Kinesis Data Stream delivery source and a S3 bucket delivery destination.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint FirehoseStream.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file FirehoseStream.yaml  --stack-name FirehoseStream --capabilities CAPABILITY_NAMED_IAM
```

**Testing**  
Write to the Kinesis Data Stream

```bash
$ aws kinesis put-record --stream-name DmStream --partition-key Chucks --data "Tech Lead " --cli-binary-format raw-in-base64-out
$ aws kinesis put-record --stream-name DmStream --partition-key Chucks --data "Cloud Architect " --cli-binary-format raw-in-base64-out
$ aws kinesis put-record --stream-name DmStream --partition-key Chucks --data "Staff Engineer " --cli-binary-format raw-in-base64-out
```

Wait for 60 seconds so that the data will be delivered to the S3 destination.  
Check the S3 destination

```bash
$ aws s3api list-objects --bucket firehose-delivery-destination --prefix demo-firehose/
```

Download the data object from S3

```bash
$ aws s3 cp s3://direhose-delivery-destination/demo-firehose/2025/01/29/05/DemoDeliveryStream-2-2025-01-29-05-58-41-6772d73f-a68f-4c7d-a24b-4965c16c6b64  data-stream.txt
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name FirehoseStream > events.json
```

**Cleanup**  
Empty the S3 bucket

```bash
$ aws s3 rm s3://firehose-delivery-destination/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name FirehoseStream
```
