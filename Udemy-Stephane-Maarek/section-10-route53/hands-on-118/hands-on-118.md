# Lesson 118: Routing Policy - Multi Value

### Description

The template configures a Multi-Value Routing policy.  
A Multi-Value Routing Policy is different from a Simple Routing with multiple value.
This is because a simple routing with multiple value will send all the values regardless of the health status of the resources,
whereas, the Multi-Value Routing will only send values whose resources are in the healthy state provided that a Healthcheck is configured for the _RecordSet_.

Note that you can't create multivalue answer alias records.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint RegionalEc2.yaml
$ cfn-lint MultiValuePolicy.yaml
```

There are four stacks to deploy

1. Deploy the first EC2 instance to eu-west-1

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name Instance1 --region eu-west-1
```

2. Deploy the second EC2 instance to eu-west-2

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name Instance2  --region eu-west-2
```

3. Deploy the third EC2 instance to eu-west-3

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name Instance3 --region eu-west-3
```

4. Get the public IP of the EC2 instances to be used for the `Instance1Ip`, `Instance2Ip` and `Instance3Ip` parameters in `MultiValuePolicy.yaml`

```bash
$ aws cloudformation describe-stacks --stack-name Instance1 --query "Stacks[0].Outputs"  --no-cli-pager --region eu-west-1
$ aws cloudformation describe-stacks --stack-name Instance2 --query "Stacks[0].Outputs"  --no-cli-pager --region eu-west-2
$ aws cloudformation describe-stacks --stack-name Instance3 --query "Stacks[0].Outputs"  --no-cli-pager --region eu-west-3
```

5. Copy the values of the public IP for the `Instance1Ip`, `Instance2Ip` and `Instance3Ip` parameters in `parameters.json`

Now deploy `MultiValuePolicy`

```bash
$ aws cloudformation deploy --template-file MultiValuePolicy.yaml  --stack-name MultiValuePolicy --region eu-west-2 --parameter-overrides file://parameters.json
```

**Testing**

1. Use the browser to visit the domain - http://multivalue.goodguys.click.
2. Each time you refresh your browser, a different EC2 instance may be served.
3. Stop the instance that is being served and wait for a while
4. Refresh the browser to see if the content changes.
5. Stop the new instance that is being served and wait for a while
6. Refresh the browser to see if the content changes again.

Alternative testing using `nslookup` utility

```bash
$ nslookup multivalue.goodguys.click
```

This should return all the Addresses of the 3 EC2 instances as values.  
Stop one EC2 instance and wait for a while, then redo `nslookup` again to see if the number of returned addresses has changed from 3 to 2.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```
$ aws cloudformation describe-stack-events --stack-name MultiValuePolicy
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Instance1 --region eu-west-1
$ aws cloudformation delete-stack --stack-name Instance2 --region eu-west-2
$ aws cloudformation delete-stack --stack-name Instance3 --region eu-west-3
$ aws cloudformation delete-stack --stack-name MultiValuePolicy --region eu-west-2
```
