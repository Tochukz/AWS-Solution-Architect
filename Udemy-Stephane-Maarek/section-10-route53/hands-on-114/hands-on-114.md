# Lesson 114: Routing Policy - Failover

### Description

The template configures a FailOver Routing policy.  
The Route53 record sets respond with the IP for a primary EC2 instance if it is healthy, otherwise, it responds with the IP of a seconary EC2 instance.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint RegionalEc2.yaml
$ cfn-lint FailoverPolicy.yaml
```

There are three stacks to deploy

1. Deploy the primary EC2 instance in eu-west-2

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name PrimaryEc2 --region eu-west-2
```

2. Deploy the secondary EC2 instance in eu-west-1

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name SecondaryEc2 --region eu-west-1
```

3. Get the public IP of the EC2 instances to be used for the `PrimaryIp` and `SecondaryIp` parameters in `FailoverPolicy.yaml`

```bash
$ aws cloudformation describe-stacks --stack-name PrimaryEc2 --query "Stacks[0].Outputs"  --no-cli-pager --region eu-west-2
$ aws cloudformation describe-stacks --stack-name SecondaryEc2 --query "Stacks[0].Outputs"  --no-cli-pager --region eu-west-1
```

4. Copy the values of the public IP for the `PrimaryIp` and `SecondaryIp` parameters in `parameters.json`

Now deploy `FailoverPolicy`

```bash
$ aws cloudformation deploy --template-file FailoverPolicy.yaml  --stack-name FailoverPolicy --region eu-west-2 --parameter-overrides file://parameters.json
```

**Testing**

1. Use the browser to visit the url - http://failover.goodguys.click.
2. Stop the primary EC2 instance and wait for a while.
3. Go back and refresh the browser to see if the content from the secondary EC2 instance is being served.
4. Start the primary EC2 instance again and wait for a while.
5. When you stop and start EC2 instance, the public IP changes. Update the `parameters.json` with the new Primary IP address and redeploy the `FailoverPolicy` stack.
6. Go back and refresh the browser to see if the content from the primary EC2 instance returns once again.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```
$ aws cloudformation describe-stack-events --stack-name FailoverPolicy
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name PrimaryEc2 --region eu-west-2
$ aws cloudformation delete-stack --stack-name SecondaryEc2 --region eu-west-1
$ aws cloudformation delete-stack --stack-name FailoverPolicy --region eu-west-2
```
