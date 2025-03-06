# Create VPC Endpoint - HOL-86

### Description

This template configures A VPC Endpoint of _Gateway_ type that allows an EC2 instance to access S3 services through a private connection.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint VpcEndpoint.yaml
```

Deploy the VpcEndpoint stack

```bash
$ aws cloudformation deploy --template-file VpcEndpoint.yaml --stack-name VpcEndpoint --capabilities CAPABILITY_NAMED_IAM
```

**After deployment**  
Get the Public IP from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name VpcEndpoint --query "Stacks[0].Outputs" --no-cli-pager
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name VpcEndpoint > events.json
```

**Testing**  
SSH into the EC2 instance using the PublicIp from the stack output.

1. While in the EC2 instance, do S3 List operation

```bash
$ aws s3 ls
$ aws s3 ls chucks-workspace-storage
```

This should work.  
2. Update the VpcEndpoint Policy to _Effect_ from `Allow` to `Deny` and then redeploy the stack.  
3. Try the S3 List operation again in the EC2 terminal

```bash
$ aws s3 ls # This still works unexpectedly @todo Find out why
$ aws s3 ls chucks-workspace-storage # This throws an error "...explicit deny in a VPC endpoint policy"
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name VpcEndpoint
```
