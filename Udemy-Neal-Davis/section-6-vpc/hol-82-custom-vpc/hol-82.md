# Create a Custom VPC - HOL-82

### Description

This template creates a custom VPC with it's associated resources, including public and private subnets, internet gateway and a route table.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint CustomVpc.yaml
```

Deploy the CustomVpc stack

```bash
$ aws cloudformation deploy --template-file CustomVpc.yaml --stack-name CustomVpc
```

**After deployment**

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name SCP > events.json
```

**Testing**
Get the public IP from the stack Outputs

```bash
$ aws cloudformation describe-stacks --stack-name CustomVpc --query "Stacks[0].Outputs" --no-cli-pager
```

Use the public IP to access the Web service with a Browser using the HTTP protocol e.g http://3.8.122.108.

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CustomVpc
```
