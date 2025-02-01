# Lesson 203: Creating ECS Service - Hands On

### Description

This template builds ontop of the `hands-on-202` template which created an ECS Cluster.   
Here we have split the resource into two stacks - `Network` and `EcsService`. where the `EcsService` stack consumes outputs imported from the `Network` stack.  
We have also added a few resources - Task Definition, ECS Service, Application LoadBalacer and related resources.

The ECS Cluster is configured to support both FARGATE and _AutoScalingGroup_ Capacity provider but the Task Container and ECS service uses the FARGATE launch type. For this reason, the _AutoScalingGroup_ capacity provider may be removed from the ECS Cluster.

### Operation

**Before deployment**  
The template used ECS Optimized AMI for the Launch Template.  
If your chosen region is not inlcuded in the _Images_ Mappings that list the AMIs, you can get the ECS optimized AMI for your region

```bash
$ aws ssm get-parameters --names /aws/service/ecs/optimized-ami/amazon-linux-2/recommended
```

Copy the AMI and add to the _Images_ map.

**Deployment**  
There are two template files `Network.yaml` and `EcsService.yaml`.  
The Stack created from the `Network` template will be a dependency for the Stack created from `EcsService` template beecause `EcsService` stack imports exported output from `Network` stack.  
For this reason, `Network` stack must be deployed successfully before `EcsService` stack is deployed.

Lint the templates

```bash
$ cfn-lint Network.yaml
$ cfn-lint EcsService.yaml
```

1. Deploy the Network Stack

```bash
$ aws cloudformation deploy --template-file Network.yaml  --stack-name Network --capabilities CAPABILITY_NAMED_IAM
```

2. Deploy the EcsService Stack

```bash
$ aws cloudformation deploy --template-file EcsService.yaml  --stack-name EcsService --capabilities CAPABILITY_NAMED_IAM
```

**Testing**  
Get the Application Load Balancer's DnsName from the ouputs

```bash
$ aws cloudformation describe-stacks --stack-name EcsService --query "Stacks[0].Outputs" --no-cli-pager
```

1. Use the DnsName to access the application using a Browser.
2. Go to the ECS Console and Update the ECS Service to increase it's _Desired tasks_ count. Select Cluster > Services > Select Service > Update Service > change Desired tasks from 1 to 2 > Update
3. After Updating the _Desired tasks_ count, the running tasks should increase to two.
4. When you refresh the Browser, the IP address that displays on the page should change indicating two different containers are used by the service.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcsService > events.json
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EcsService
$ aws cloudformation delete-stack --stack-name Network
```
