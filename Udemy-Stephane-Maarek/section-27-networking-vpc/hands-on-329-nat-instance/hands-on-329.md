# Lesson 329: NAT Instance - Hands On

### Description

This configuration demonstrates the use of a NAT Instance to grant Internet access to EC2 instance in a private subnet.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint NatInstance.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file NatInstance.yaml  --stack-name NatInstance --parameter-overrides file://parameters.json
```

**After Deployment**  
Get the `BastonPublicIp` and `PrivateInstanceIp` from the stack outputs.

```bash
$ aws cloudformation describe-stacks --stack-name NatInstance --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. SSH into the Bastion Host, using the `BastonPublicIp`, and make a directory in the home directory

```bash
$ ssh -i dev-simple-key.pem ec2-user@18.133.244.33
$ mkdir my-keys
```

2. Open another terminal and copy your private key into the newly created directory in the Bastion Host

```bash
$ scp -i dev-simple-key.pem dev-simple-key.pem ec2-user@18.133.244.33:~/my-keys/dev-simple-key.pem
```

3. Back to the Bastion Host terminal, use the copied private key to SSH into the private EC2 instance using the `PrivateInstanceIp`

```bash
$ ssh -i my-keys/dev-simple-key.pem ec2-user@10.0.19.92
```

4. Try to make a `curl` request inside the Private Instance

```bash
$ curl example.com
```

This should work because of the NAT instance grants access to the internet to Instances in the Private Subnet.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name NatInstance > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name NatInstance
```
