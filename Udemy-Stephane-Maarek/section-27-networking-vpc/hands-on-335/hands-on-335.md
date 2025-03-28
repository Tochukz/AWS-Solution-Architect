# Lesson 335: VPC Peering - Hands On

### Description

The templates configures VPC Peering between two VPCs in the same region - the default VPC and a Custom VPC.

There are three templates

1. _DefaultVpc_: configures an EC2 instance in the Default VPC
2. _CustomVpc_: configures a custom VPC, related resources and EC2 instance in the custom VPC
3. _VpcPeering_: configures the peering between the Custom VPC and the Default VPC

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Default.yaml
$ cfn-lint CustomVpc.yaml
$ cfn-lint VpcPeering.yaml
```

1. Deploy the `DefaultVpc` stack

```bash
$ aws cloudformation deploy --template-file DefaultVpc.yaml  --stack-name DefaultVpc
```

2. Deploy the `CustomVpc` stack

```bash
$ aws cloudformation deploy --template-file CustomVpc.yaml  --stack-name CustomVpc
```

3. Deploy the `VpcPeering` stack

```bash
$ aws cloudformation deploy --template-file VpcPeering.yaml  --stack-name VpcPeering
```

**After Deployment**

1. Get the `DefaultEc2PublicIp` and `DefaultEc2PrivateIp` from the `DefaultVpc` stack outputs.

```bash
$ aws cloudformation describe-stacks --stack-name DefaultVpc --query "Stacks[0].Outputs" --no-cli-pager
```

2. Get the `SimpleEc2PublicIp` and `SimpleEc2PrivateIp` from the `CustomVpc` stack

```bash
$ aws cloudformation describe-stacks --stack-name CustomVpc --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. SSH into the `SimpleEc2`, using the `SimpleEc2PublicIp`

```bash
$ ssh -i dev-simple-key.pem ec2-user@18.130.168.6
```

2. On another terminal SSH into the `DefaultEc2` using the `DefaultEc2PublicIp`

```bash
$ ssh -i dev-simple-key.pem ec2-user@18.130.195.119
```

3. From the `SimpleEc2` terminal, make a curl request using the `DefaultEc2PrivateIp`, i.e the Private IP address of the `DefaultEc2`

```bash
$ curl 172.31.47.141
```

4. From the `DefaultEc2` make a curl request using the `SimpleEc2PrivateIp` i.e the Private IP address of the `SimpleEc2`

```bash
$ curl
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name CustomVpc > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name VpcPeering
$ aws cloudformation delete-stack --stack-name CustomVpc
$ aws cloudformation delete-stack --stack-name DefaultVpc
```
