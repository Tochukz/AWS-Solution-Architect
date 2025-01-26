# Launching Amazon EC2 Instances - HOL-27

### Description

This template demonstrates the use of a Bastion Host.

A Bastion host is an EC2 instance in a Public Subnet which is used to access another EC2 instance in a Private subnet in the same VPC. The EC2 instance in the private subnet cannot be directly accessed from outside of the VPC.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint BastionHost.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file BastionHost.yaml --stack-name BastionHost
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name BastionHost > events.json
```

**Testing**
Get the PubliIp, PrivateIp and PrivateInstanceId from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name BastionHost --query "Stacks[0].Outputs" --no-cli-pager
```

Use the public IP to SSH into the Bastion Host (a public instance)

```bash
$ ssh -i dev-simple-key.pem ec2-user@3.8.137.18
```

On another terminal, copy your private key into the Bastion Host

```bash
$ scp -i dev-simple-key.pem dev-simple-key.pem ec2-user@3.8.137.18:~/dev-simple-key.pem
```

From the SSH terminal of the Bastion Host, use the private key to SSH into the private instance

```bash
$ ssh -i dev-simple-key.pem ec2-user@10.0.85.230
```

While in the SSH terminal of the private instance, access it's instance Id

```bash
$ curl http://169.254.169.254/latest/meta-data/instance-id
```

Confirm that the instance Id obtained from the SSH terminal is the same as the PrivateInstanceId from the stack Output.

**Cleanup**  
To delete the stacks and snapshot

```bash
$ aws cloudformation delete-stack --stack-name BastionHost
```
