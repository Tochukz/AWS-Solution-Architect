# COnfigure VPC Peering - HOL-86

### Description

These templates are used to demonstrate VPC peering between two VPCs in the same region.

After the Vpc Peering, a connection can be established between EC2 instances in the different VPCs using the EC2 instance private IP addresses.

### Operation

**Before deployment**  
Create KeyPair if you don't already have one

```bash
$ aws ec2 create-key-pair --key-name DevSimpleKey  --query 'KeyMaterial' --output text > dev-simple-key.pem
```

Make the private key file read only

```bash
$  chmod 400 dev-simple-key.pem
```

**Deployment**

Lint the templates

```bash
$ cfn-lint Vpc1.yaml
$ cfn-lint Vpc2.yaml
$ cfn-lint VpcPeering.yaml
```

1. Deploy the Vpc1 stack

```bash
$ aws cloudformation deploy --template-file Vpc1.yaml --stack-name Vpc1
```

2. Deploy the Vpc2 stack

```bash
$ aws cloudformation deploy --template-file Vpc2.yaml --stack-name Vpc2
```

3. Get the Outputs from the Vpc1 stack

```bash
$ aws cloudformation describe-stacks --stack-name Vpc1 --query "Stacks[0].Outputs" --no-cli-pager
```

Use the output values to update the `RequesterVpcId`, `RequesterRouteTableId` and `RequesterCidrBlock` value in the `parameters.json` file.

4. Get the outputs from the Vpc2 stack

```bash
$ aws cloudformation describe-stacks --stack-name Vpc2 --query "Stacks[0].Outputs"  --no-cli-pager
```

Use the output values to update the `AccepterVpcId`, `AccepterRouteTableId` and `AccepterCidrBlock` of the `parameters.json` file.

5. Deploy the `VpcPeering` stack

```bash
$ aws cloudformation deploy --template-file VpcPeering.yaml --stack-name VpcPeering  --parameter-overrides file://parameters.json
```

**After deployment**

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name Vpc1 > events.json
```

**Testing**  
Get the PublicIp and PrivateIp for the EC2 instances in the different VPCs.

Try to connect from Vpc1 to Vpc2

1. SSH into the EC2 instance in Vpc1
2. Ping the PrivateIp of the EC2 instance in Vpc2
3. Curl the PrivateIp of the EC2 instance in Vpc2

To ping

```bash
$ ping 10.1.1.153
```

To Curl

```bash
$ curl 10.1.1.153
```

Try to connect from Vpc2 to Vpc1

1. SSH into the EC2 instance in Vpc2
2. Ping the PrivateIp of the EC2 instance in Vpc1
3. Curl the PrivateIp of the EC2 instance in Vpc1

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name VpcPeering
$ aws cloudformation delete-stack --stack-name Vpc2
$ aws cloudformation delete-stack --stack-name Vpc1
```
