# Lesson 17: CloudTrail Solution Architect Pro

## Demo 17: CloudTrail Security Alert

### Description

This solution sends out a notification to subscribers of a SNS topic when certain API calls are captured on CloudTrail.  

For example, we can send out a SNS notification to all subscribers of an SNS topic whenever the `TerminateInstances` API call occurs on the AWS account.  

You can see an example an identical solution implemented using Pulumi here [GitHub Tochukz/security-monitoring](https://github.com/Tochukz/Pulumi/tree/master/sample-projects/security-monitoring).  

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint CloudTrailSecurityAlert.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CloudTrailSecurityAlert.yaml  --stack-name CloudTrailSecurityAlert --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**
Get the PublicIP for the EC2 instance from the output

```bash
$ aws cloudformation describe-stacks --stack-name CloudTrailSecurityAlert --query "Stacks[0].Outputs"
```

**Testing**


**Debug Errors**
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name CloudTrailSecurityAlert > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CloudTrailSecurityAlert
```
