# Lesson 113: Route 53 - Health Checks Hand on

### Description

This template configures 3 health check for 3 EC2 instances each in a different region.  
It then configures a Calculated health check that monitors the status of the other 3 health checks.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint RegionalEc2.yaml
$ cfn-lint HealthCheck.yaml
```

There are three stacks to deploy

1. Deploy first EC2 instance to eu-west-1

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name EuWest1Ec2 --region eu-west-1
```

2. Deploy second EC2 instance to eu-west-2

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name EuWest2Ec2 --region eu-west-2
```

3. Deploy third EC2 instance to eu-west-3

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name EuWest3Ec2 --region eu-west-3
```

4. Get the public IP of the EC2 instances to be used for the `EuWest1Ec2Ip` and `EuWest3Ec2Ip` parameters in `HealthCheck.yaml`

```bash
$ aws cloudformation describe-stacks --stack-name EuWest1Ec2 --query "Stacks[0].Outputs" --region eu-west-1 --no-cli-pager
$ aws cloudformation describe-stacks --stack-name EuWest2Ec2 --query "Stacks[0].Outputs" --region eu-west-2 --no-cli-pager
$ aws cloudformation describe-stacks --stack-name EuWest3Ec2 --query "Stacks[0].Outputs" --region eu-west-3 --no-cli-pager
```

5. Copy the values of the public IP from 3 to the default values for `EuWest1Ec2Ip`, `EuWest2Ec2Ip` and `EuWest3Ec2Ip` parameters in `HealthCheck.yaml`

Now deploy `HealthCheck`

```bash
$ aws cloudformation deploy --template-file HealthCheck.yaml  --stack-name HealthCheck --region eu-west-2
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

$ aws cloudformation describe-stack-events --stack-name HealthCheck

```

**Cleanup**
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EuWest1Ec2 --region eu-west-1
$ aws cloudformation delete-stack --stack-name EuWest2Ec2 --region eu-west-2
$ aws cloudformation delete-stack --stack-name EuWest3Ec2 --region eu-west-3
$ aws cloudformation delete-stack --stack-name HealthCheck --region eu-west-2
```
