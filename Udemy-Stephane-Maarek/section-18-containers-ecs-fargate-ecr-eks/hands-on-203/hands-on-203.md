# Lesson 202: Creating ECS Service - Hands On

### Description

This template build ontop the `hands-on-202/EcsCluster.yaml` template.  
Here we have split the resource into two stacks and added TaskDefinition resource.

### Operation

**Before deployment**  
The template used ECS Optimized AMI for the Launch Template.  
If your chosen region is not inlcuded in the _Images_ Mappings that list the AMIs, you can get the ECS optimized AMI for your region

```bash
$ aws ssm get-parameters --names /aws/service/ecs/optimized-ami/amazon-linux-2/recommended
```

Copy the AMI and add to the _Images_ map.

**Deployment**  
There are two template Network.yaml and EcsService.yaml.  
The Stack created from the Network template will be a dependency for the Stack created from EcsService template.
For this reason, _Network_ stack must be deployed successfully before _EcsService_ stack.

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
$ aws cloudformation deploy --template-file EcsService.yaml  --stack-name EcsService
```

**Testing**

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

**ECS Cluster from ECS Console**  
When you create an ECS Cluster using the ECS Console, a Stack is created containing the ECS Cluster and all its related resources including the LaunchTemplate, AutoScalingGroup etc.  
The `console-template.yaml` file shows a sample of the generated template and `console-template.json` is the JSON format of the same template.
