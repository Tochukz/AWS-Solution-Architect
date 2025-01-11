# Lesson 146: S3 Event Notifications - Hands On

### Description

This template configures Event Notification for a S3 bucket.
The Event Notification Configuration send messages to an SQS Queue when ever a object is PUT into the bucket with a specific pprefix is surfix.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint S3EventNotification.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3EventNotification.yaml  --stack-name S3EventNotification
```

**Testing**
Put files with the targeted prefix and suffix in the S3 bucket

```bash
$ aws s3 cp profile/developer.jpeg s3://event-notif-bucket-01-25/profile/developer.jpeg
$ aws s3 cp profile/winner-ha.png s3://event-notif-bucket-01-25/profile/winner-ha.png
```

Put files that does not match the targeted prefix and/or suffix in the S3 bucket

```bash
$ aws s3 cp profile/developer.txt s3://event-notif-bucket-01-25/profile/developer.txt
$ aws s3 cp profile/developer.jpeg s3://event-notif-bucket-01-25/user/developer.jpeg
```

Check if the S3 bucket events were sent to the SQS Queue

```bash
$ aws sqs receive-message --queue-url https://sqs.eu-west-2.amazonaws.com/314146339647/S3EventMessages  --max-number-of-messages 10 --wait-time-seconds 20 > messages.json
```

**Note**: To avoid the _Visibility Timeout_ effect, make sure no other client is viewing the messages at the same time. For example, if the messages are viewed on the SQS console you may become invisible to AWS CLI `sqs receive-message` operation .

Only events of objects whose extension and prefix matches the rules of the Event Notification Filter should be found in the Queue.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3EventNotification > events.json
```

**Cleanup**  
Delete all the objects in the bucket

```bash
$ aws s3 rm s3://event-notif-bucket-01-25/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3EventNotification
```
