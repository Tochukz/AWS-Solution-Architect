# Lesson 331: NAT Gateway - Hands On

### Description

This configuration demonstrates the use of a NAT Gateway to grant Internet access to EC2 instance in a private subnet.  
In a real-life production environment, we would have an NAT Gateway for each Subnet for high availability and fault-tolerance.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint NatGateway.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file NatGateway.yaml  --stack-name NatGateway --parameter-overrides file://parameters.json
```

**After Deployment**  
Get the `BastonPublicIp` and `PrivateInstanceIp` from the stack outputs.

```bash
$ aws cloudformation describe-stacks --stack-name NatGateway --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. SSH into the Bastion Host, using the `BastonPublicIp`, and make a directory in the home directory

```bash
$ ssh -i dev-simple-key.pem ec2-user@35.178.172.239
$ mkdir my-keys
```

2. Open another terminal and copy your private key into the newly created directory in the Bastion Host

```bash
$ scp -i dev-simple-key.pem dev-simple-key.pem ec2-user@35.178.172.239:~/my-keys/dev-simple-key.pem
```

3. Back to the Bastion Host terminal, use the copied private key to SSH into the private EC2 instance using the `PrivateInstanceIp`

```bash
$ ssh -i my-keys/dev-simple-key.pem ec2-user@10.0.28.175
```

4. Try to make a `curl` request inside the Private Instance

```bash
$ curl example.com
```

This should work because of the NAT instance grants access to the internet to Instances in the Private Subnet.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name NatGateway > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name NatGateway
```
