# Configure Cross Regional VPC Peering - HOL-86

### Description

These templates are used to demonstrate VPC peering between two VPCs in different AWS regions.  
Here we have 5 template which deploys 5 stacks to two regions.

Care must be taken to deploy the stacks in the appropriate order and region

| Order | Stack          | Region    |
| ----- | -------------- | --------- |
| 1     | Vpc1           | eu-west-1 |
| 2     | Vpc2           | eu-west-2 |
| 3     | VpcPeering     | eu-west-1 |
| 4     | Network1Update | eu-west-1 |
| 5     | Network2Update | eu-west-2 |

Our example demonstrate the peering between VPCs in `eu-west-1` and `eu-west-2` regions with the former serving as the _Requester_ VPC and the later the _Accepter_ VPC.

After the Vpc Peering, a connection can be established between EC2 instances in the different VPCs using the EC2 instance private IP addresses.

### Operation

**Before deployment**  
Create KeyPair in each region if you don't already have one

```bash
$ aws ec2 create-key-pair --key-name EuWest1Key  --query 'KeyMaterial' --region eu-west-1 --output text > eu-west-1.pem
```

Make the private key file read only

```bash
$  chmod 400 eu-west-1.pem
```

**Deployment**

Lint the templates

```bash
$ cfn-lint Vpc1.yaml
$ cfn-lint Vpc2.yaml
$ cfn-lint VpcPeering.yaml
$ cfn-lint Network1Update.yaml
$ cfn-lint Network2Update.yaml
```

1. Deploy the Vpc1 stack in `eu-west-1`

```bash
$ aws cloudformation deploy --template-file Vpc1.yaml --stack-name Vpc1  --parameter-overrides file://parameters.json --region eu-west-1
```

2. Deploy the Vpc2 stack in `eu-west-2`

```bash
$ aws cloudformation deploy --template-file Vpc2.yaml --stack-name Vpc2 --parameter-overrides file://parameters.json --region eu-west-2
```

3. Get the Outputs from the Vpc1 stack

```bash
$ aws cloudformation describe-stacks --stack-name Vpc1 --query "Stacks[0].Outputs" --no-cli-pager --region eu-west-1 > output1.json
```

Use the output values to update the `RequesterVpcId` and `RequesterRouteTableId` values in the `parameters.json` file.

4. Get the outputs from the Vpc2 stack

```bash
$ aws cloudformation describe-stacks --stack-name Vpc2 --query "Stacks[0].Outputs"  --no-cli-pager --region eu-west-2 > output2.json
```

Use the output values to update the `AccepterVpcId` and `AccepterRouteTableId` values in the `parameters.json` file.

5. Deploy the VpcPeering stack in `eu-west-1` region (i.e Requester region)

```bash
$ aws cloudformation deploy --template-file VpcPeering.yaml --stack-name VpcPeering --parameter-overrides file://parameters.json --region eu-west-1
```

6. Get the `VpcPeeringConnectionId` from the VpcPeering stack output

```bash
$ aws cloudformation describe-stacks --stack-name VpcPeering --query "Stacks[0].Outputs" --no-cli-pager --region eu-west-1 > output3.json
```

Use the `VpcPeeringConnectionId` value to update the value in `parameters.json` file.

7. Accept the VPC peering request for the Accepter VPC in the `eu-west-2` region

```bash
# To view the VPC peering request if you don't already have the VPC peering connection Id
$ aws ec2 describe-vpc-peering-connections --region eu-west-2
# Accepts the connection request (Not needed for same account VPC peering)
$ aws ec2 accept-vpc-peering-connection --vpc-peering-connection-id <VpcPeeringConnectionId> --region eu-west-2
```

8. Deploy the Network1Update stack in `eu-west-1` region

```bash
$ aws cloudformation deploy --template-file Network1Update.yaml --stack-name Network1Update  --parameter-overrides file://parameters.json --region eu-west-1
```

9. Deploy the Network2Update stack in `eu-west-2` region

```bash
$ aws cloudformation deploy --template-file Network2Update.yaml --stack-name Network2Update --parameter-overrides file://parameters.json --region eu-west-2
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
$ aws cloudformation delete-stack --stack-name Network2Update --region eu-west-2
$ aws cloudformation delete-stack --stack-name Network1Update --region eu-west-1
$ aws cloudformation delete-stack --stack-name VpcPeering --region eu-west-1
$ aws cloudformation delete-stack --stack-name Vpc2 --region eu-west-2
$ aws cloudformation delete-stack --stack-name Vpc1 --region eu-west-1
```
