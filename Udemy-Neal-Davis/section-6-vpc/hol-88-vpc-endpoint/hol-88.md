# Create VPC Endpoint - HOL-86

### Description

This template configures A VPC Subnet of Gateway type that provide access to S3 service.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint VpcEndpoint.yaml
```

Deploy the VpcEndpoint stack

```bash
$ aws cloudformation deploy --template-file VpcEndpoint.yaml --stack-name VpcEndpoint --capabilities CAPABILITY_NAMES_IAM
```

**After deployment**

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name VpcEndoint > events.json
```

**Testing**

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name VpcEndpoint
```
