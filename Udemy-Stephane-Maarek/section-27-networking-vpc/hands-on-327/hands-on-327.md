# Lesson 327: Bastion Host - Hands On

### Description

This configuration demonstrates the use of Bastion host to access an EC2 instance in a private subnet.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint BastionHost.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file BastionHost.yaml  --stack-name BastionHost --parameter-overrides file://parameters.json
```

**After Deployment**  
Get the `BastonPublicIp` and `PrivateInstanceIp` from the stack outputs.

```bash
$ aws cloudformation describe-stacks --stack-name BastionHost --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. SSH into the Bastion Host, using the `BastonPublicIp`, and make a directory in the home directory

```bash
$ ssh -i dev-simple-key.pem ec2-user@18.135.27.17
$ mkdir my-keys
```

2. Open another terminal and copy your private key into the newly created directory in the Bastion Host

```bash
$ cp -i dev-simple-key.pem dev-simple-key.pem ec2-user@18.135.27.17:~/my-keys/dev-simple-key.pem
```

3. Back to the Bastion Host terminal, use the copied private key to SSH into the private EC2 instance using the `PrivateInstanceIp`

```bash
$ ssh -i my-keys/dev-simple-key.pem ec2-user@10.0.18.105
```

4. Confirm that `curl` request to the public internet is not allowed in the private EC2 instance

```bash
$ curl google.com
```

This should stall for a while and eventually fail.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name BastionHost > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name BastionHost
```
