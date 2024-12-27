# Lesson 110: Routing Policy - Latency

### Description

This template configures a _Latency Based Routing Policy_.
The Latency based routing policy direct traffic to the endpoint with the lowest network latency for the user.  
Here we direct traffic to the EC2 instance in the region closest to the user.

Note that you can also manage multiple records such as _latency based routes_ using `AWS::Route53::RecordSetGroup` for better organization.

### Operation

**Deployment**  
Upload the child templates to S3

```bash
$ aws s3 cp LatencyChildEc2.yaml s3://chucks-workspace-storage/templates/LatencyChildEc2.yaml
```

Lint all templates

```bash
$ cfn-lint LatencyChildEc2.yaml
$ cfn-lint RegionalEc2.yaml
$ cfn-lint LatencyPolicy.yaml
```

There are three stacks to deploy

1. Deploy first EC2 instance to eu-west-1

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name EuWest1Ec2 --region eu-west-1
```

2. Deploy second EC2 instance to eu-west-3

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name EuWest3Ec2 --region eu-west-3
```

3. Get the public IP of the EC2 instances to be used for the `EuWest1Ec2Ip` and `EuWest3Ec2Ip` parameters in `LatencyPolicy.yaml`

```bash
$ aws cloudformation describe-stacks --stack-name EuWest1Ec2 --query "Stacks[0].Outputs" --region eu-west-1 --no-cli-pager
$ aws cloudformation describe-stacks --stack-name EuWest3Ec2 --query "Stacks[0].Outputs" --region eu-west-3 --no-cli-pager
```

4. Copy the values of the public IP from 3 to the default values for `EuWest1Ec2Ip` and `EuWest3Ec2Ip` parameters in `LatencyPolicy.yaml`

Now deploy `LatencyPolicy`

```bash
$ aws cloudformation deploy --template-file LatencyPolicy.yaml  --stack-name LatencyPolicy --region eu-west-2
```

**Testing**
Use the domain to access the route: http://latency.goodguys.click

Use the `dig` utility to gain insight into the route

```bash
$ dig latency.goodguys.click
```

**Debug Errors**
In the case of error during deployment, checkout the stack events

```

$ aws cloudformation describe-stack-events --stack-name LatencyPolicy

```

**Cleanup**
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EuWest1Ec2 --region eu-west-1
$ aws cloudformation delete-stack --stack-name EuWest3Ec2 --region eu-west-3
$ aws cloudformation delete-stack --stack-name LatencyPolicy --region eu-west-2
```
