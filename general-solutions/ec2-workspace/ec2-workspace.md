# CloudFront Proxy

## CloudFront Distribution for Frontend Asset and Proxy Server to Backend API

## Requirement

An EC2 instance running the latest Amazon Linux OS is required.  
This will be used to Build NodeJS application such as NestJS for a Linux supported build.

## Operation

**Pre Deployment**  
Create a keyPair if you have not already done so

```bash
$ aws ec2 create-key-pair --key-name DevSimpleKey --query 'KeyMaterial' --output text > dev-simple-key.pem
```

Make the private key file read only

```bash
$  chmod 400 dev-simple-key.pem
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint Ec2WorkSpace.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Ec2WorkSpace.yaml --stack-name Ec2WorkSpace --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**
Get the PublicIP from the stacks outputs

```bash
$ aws cloudformation describe-stacks --stack-name Ec2WorkSpace --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Ec2WorkSpace
```
