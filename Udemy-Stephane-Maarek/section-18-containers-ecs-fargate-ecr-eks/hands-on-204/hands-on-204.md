# Lesson 204: Amazon ECS Auto Scaling

### Description

This template builds ontop of the `hands-on-203` templates which configures an Application Load Balancer on an ECS Task.  
Here we update the ECS Cluster to only support FARGATE capacity provider and no longer _AutoScalingGroup_ capacity provider.  
We than add Application Auto Scaling to increases the number of ECS Task based on the _ALB Request Count Per Target_.  
In production the Scaling Policy may be based on _ECS Service Average CPU Utilization_ rather than _ALB Request Count Per Target_.

### Operation

**Deployment**  
There are two template files `Network.yaml` and `EcsAutoScaling.yaml`.  
The Stack created from the `Network` template will be a dependency for the Stack created from `EcsAutoScaling` template beecause `EcsAutoScaling` stack imports exported output from `Network` stack.  
For this reason, `Network` stack must be deployed successfully before `EcsAutoScaling` stack is deployed.

Lint the templates

```bash
$ cfn-lint Network.yaml
$ cfn-lint EcsAutoScaling.yaml
```

1. Deploy the Network Stack

```bash
$ aws cloudformation deploy --template-file Network.yaml  --stack-name Network --capabilities CAPABILITY_NAMED_IAM
```

2. Deploy the EcsAutoScaling Stack

```bash
$ aws cloudformation deploy --template-file EcsAutoScaling.yaml  --stack-name EcsAutoScaling --capabilities CAPABILITY_NAMED_IAM
```

**Testing**  
Get the Application Load Balancer's DnsName from the ouputs

```bash
$ aws cloudformation describe-stacks --stack-name EcsAutoScaling --query "Stacks[0].Outputs" --no-cli-pager
```

1. Use the DnsName to access the application using a Browser.
2. Go to the ECS Console and Update the ECS Service to increase it's _Desired tasks_ count. Select Cluster > Services > Select Service > Update Service > change Desired tasks from 1 to 2 > Update
3. After Updating the _Desired tasks_ count, the running tasks should increase to two.
4. When you refresh the Browser, the IP address that displays on the page should change indicating two different containers are used by the service.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcsAutoScaling > events.json
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EcsAutoScaling
$ aws cloudformation delete-stack --stack-name Network
```
