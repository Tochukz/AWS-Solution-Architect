# VPC Flow Logs - HOL-96

### Description

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint VpcFlowLogs.yaml
```

Deploy the VpcFlowLogs stack

```bash
$ aws cloudformation deploy --template-file VpcFlowLogs.yaml --stack-name VpcFlowLogs --capabilities CAPABILITY_NAMED_IAM
```

**After deployment**  
Get the Public IP from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name VpcFlowLogs --query "Stacks[0].Outputs" --no-cli-pager
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name VpcFlowLogs > events.json
```

**Testing**  
SSH into the EC2 instance using the PublicIp from the stack output.

1. While in the EC2 instance, do a `ping` and `curl` command

```bash
$ ping google.com
$ curl amazon.com
```

Wait for about 10 minutes.  
2. Open the VPC console, locate the default VPC and select it.  
Under the VPC details, select the Flow logs tab and navigate to the log Destination using the link provided.

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name VpcFlowLogs
```
