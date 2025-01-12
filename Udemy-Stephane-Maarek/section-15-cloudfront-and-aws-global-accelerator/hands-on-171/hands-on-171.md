# Lesson 108: AWS Global Accelerator - Hand One

### Description

This template configures a Global Accelerator.

Global Accelerator is a service that improves the availability and performance of your applications with local or global users.
It provides static IP addresses that act as a fixed entry point to your application endpoints in a single or multiple AWS Regions,
and uses the AWS global network to optimize the path from your users to your applications.

### Operation

**Deployment**

Lint the template

```bash
$ cfn-lint GlobalChildEc2.yaml
$ cfn-lint GlobalAccelerator.yaml
```

Upload the child templates to S3

```bash
$ aws s3 cp GlobalChildEc2.yaml s3://chucks-workspace-storage/templates/GlobalChildEc2.yaml
```

Deploy the the stack

```bash
$ aws cloudformation deploy --template-file GlobalAccelerator.yaml --stack-name GlobalAccelerator
```

**Testing**
Get eht Accelerator DNS name from the stack output

```bash
$  aws cloudformation describe-stacks --stack-name GlobalAccelerator --query "Stacks[0].Outputs" --no-cli-pager
```

Use the DNS name on a Browser to access the application.

**Debug Errors**
In the case of error during deployment, checkout the stack events leading to the failure

```bash
$ aws cloudformation describe-stack-events --stack-name GlobalAccelerator
```

**Cleanup**
To delete the stack

```
$ aws cloudformation delete-stack --stack-name GlobalAccelerator
```

**Useful Command**
