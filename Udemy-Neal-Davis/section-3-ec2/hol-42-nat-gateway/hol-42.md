# Private Subnet with NAT Gateway - HOL-42

### Description

This template extends HOL-40 which demonstrates the use of a Bastion host.  
Here to make the EC2 instance in the private subnet to have internet access through the use of an NAT Gateway.
This provides a one-directional traffic for only outbound requests for the private instance.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint NatGateway.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file NatGateway.yaml --stack-name NatGateway
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name NatGateway > events.json
```

**Testing**

1. Get the PubliIp, PrivateIp and PrivateInstanceId from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name NatGateway --query "Stacks[0].Outputs" --no-cli-pager
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
7. While in the SSH terminal of the private instance, try curling an external website to confirm that the instance does allows outbound traffic.

```bash
$ curl google.com
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name NatGateway
```
