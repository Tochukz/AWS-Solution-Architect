# Private Subnet and Bastion Host - HOL-40

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

1. Get the PubliIp, PrivateIp and PrivateInstanceId from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name BastionHost --query "Stacks[0].Outputs" --no-cli-pager
```

2. Use the public IP to SSH into the Bastion Host (i.e the public instance)

```bash
$ ssh -i dev-simple-key.pem ec2-user@3.8.137.18
```

3. On another terminal, copy your private key into the Bastion Host

```bash
$ scp -i dev-simple-key.pem dev-simple-key.pem ec2-user@3.8.137.18:~/dev-simple-key.pem
```

4. From the SSH terminal of the Bastion Host, use the private key to SSH into the private instance

```bash
$ ssh -i dev-simple-key.pem ec2-user@10.0.85.230
```

5. While in the SSH terminal of the private instance, check it's instance Id

```bash
$ curl http://169.254.169.254/latest/meta-data/instance-id
```

6. Confirm that the instance Id obtained from the SSH terminal is the same as the PrivateInstanceId from the stack Output.
7. While in the SSH terminal of the private instance, try curling an external website to confirm that the instance does NOT allow outbound requests.  

```bash
$ curl google.com
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name BastionHost
```
