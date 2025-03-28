# Lesson 323: Internet Gateway and Route Table - Hands On

### Description

This configuration builds on `hands-on-323` by adding internet gateway, route table and an EC2 instance to the custom VPC.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint InternetGateway.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file InternetGateway.yaml  --stack-name InternetGateway
```

**After Deployment**
Get the PublicIP of the EC2 instance from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name InternetGateway --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

Use the PublicIP and private key to SSH into the EC2 instance

```bash
$ ssh -i ../../ ec2-user@18.171.183.93
```

While you are inside the EC2 instance, make a `curl` request

```bash
$ curl google.com
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name InternetGateway > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name InternetGateway
```
