# CloudTrail Security Monitorying

## A CloudWatch Filter for CloudTail Logs

## Requirement

We need to setup a monitoring configuration that triggers alarms when there are multiple failed authentication attemps.  
This is made to detect brute-force attach attempts.   

## Operation

**Pre Deployment**  

**Deployment**  
Lint the templates

```bash
$ cfn-lint FailedLoginMonitor.yaml.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file FailedLoginMonitor.yaml --stack-name FailedLoginMonitor --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

Get the `SnsTopicArn` form the stack outputs 
```bash
$ aws cloudformation describe-stacks --stack-name FailedLoginMonitor --query "Stacks[0].Outputs" --no-cli-pager
```

Subscribe the the topic using your email 
```bash
$ aws sns subscribe --topic-arn <value> --protocol email --endpoint-url my-email@yahoo.com
```

Go to your email address and coonfirm the subscription.  

**Testing**

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Ec2WorkSpace
```
