# Lesson 337: VPC Endpoint - Hands On

### Description

This configuration sets up a VPC endpoint to allows EC2 instance on a private subnet to access S3 service.  
No NAT instance or NAT gateway is configured.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint VpcEndpoint.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file VpcEndpoint.yaml  --stack-name VpcEndpoint --parameter-overrides file://parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the `BastonPublicIp` and `PrivateInstanceIp` from the stack outputs.

```bash
$ aws cloudformation describe-stacks --stack-name VpcEndpoint --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. SSH into the Bastion Host, using the `BastonPublicIp`, and make a directory in the home directory

```bash
$ ssh -i dev-simple-key.pem ec2-user@18.132.207.235
$ mkdir my-keys
```

2. Open another terminal and copy your private key into the newly created directory in the Bastion Host

```bash
$ scp -i dev-simple-key.pem dev-simple-key.pem ec2-user@18.132.207.235:~/my-keys/dev-simple-key.pem
```

3. Back to the Bastion Host terminal, use the copied private key to SSH into the private EC2 instance using the `PrivateInstanceIp`

```bash
$ ssh -i my-keys/dev-simple-key.pem ec2-user@10.0.16.33
```

4. Confirm that `curl` request to the public internet is not allowed in the private EC2 instance

```bash
$ curl google.com
```

5. Confirm that S3 service is accessible from the private EC2 instance

```bash
$ aws s3 ls
```

This should stall for a while and eventually fail.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name VpcEndpoint > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name VpcEndpoint
```
