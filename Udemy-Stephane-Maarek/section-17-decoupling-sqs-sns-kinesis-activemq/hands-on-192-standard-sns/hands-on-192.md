# Lesson 192: SNS - Hands On

### Description

This template configures a Standard SNS Topic with one SQS Queue subscription.  

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint StandardSns.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file StandardSns.yaml  --stack-name StandardSns
```

**Testing**  
Get the TopicArn and the QueueUrl from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name StandardSns --query "Stacks[0].Outputs" --no-cli-pager
```

Add more subscription to the Topic.  
Subscribe to the SNS topic via email

```bash
$ aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:314146339647:JobRoles --protocol email --notification-endpoint bbdchucks@gmail.com
```

Email subcription requires a confirmation. Go to your email and accept the confirmation email sent to you.

Subscribe to the SNS topic via SMS

```bash
$ aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:314146339647:JobRoles --protocol sms --notification-endpoint +27633641007
```

Public a message

```bash
$ aws sns publish --topic-arn arn:aws:sns:eu-west-2:314146339647:JobRoles --subject 'New Role' --message 'Staff Engineer at SovTech'
```

Check you email and SMS to see if the published message is being delivered.  
Also check the Queue

```bash
$ aws sqs receive-message --queue-url https://sqs.eu-west-2.amazonaws.com/314146339647/JobRoles --max-number-of-messages 10 --wait-time-seconds 20 > messages.json
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name StandardSns > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name StandardSns
```
