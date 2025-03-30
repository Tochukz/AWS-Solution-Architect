# Lesson 347: IPv6 FOR VPC- Hands On

### Description

This configuration creates a VPC with IPv6 Enabled.
This will make our EC2 instances get assigned an IPv6 address when they are launched.  
Take note that we use the _EgressOnlyInternetGateway_ to route outbound IPv6 traffic while preventing inbound traffic to the private subnet.  
The _EgressOnlyInternetGateway_ resource works the same way for IPv6 as _NAT Gateway_ works for IPv4.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint IPv6Vpc.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file IPv6Vpc.yaml  --stack-name IPv6Vpc
```

**After Deployment**

**Testing**

1. Go to the EC2 Console and look for the Ec2Instance created.  
   You should find that an IPv6 address was assigned to the Ec2 instance.
2. Check the Route Table and see if the IPv6 destination has a _local_ target in one of it's route.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name IPv6Vpc > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name IPv6Vpc
```
