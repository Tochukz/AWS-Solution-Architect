# Lesson 202: Creating ECS Cluster - Hands On

### Description

This template configures an ECS Cluster with a Fargate and EC2 Capacity Provider.  
Capacity Provider are used in capacity provider strategies to facilitate cluster auto scaling.

With the Fargate and ECS Capacity providers in place, the ECS Cluster will be able to support FARGATE and EC2 Launch types.

### Operation

**Debfore deployment**  
The template used ECS Optimized AMI for the Launch Template.  
If your chosen region is not inlcuded in the _Images_ Mappings that list the AMIs, you can get the ECS optimized AMI for your region

```bash
$ aws ssm get-parameters --names /aws/service/ecs/optimized-ami/amazon-linux-2/recommended
```

Copy the AMI and add to the _Images_ map.

**Deployment**  
Lint the template

```bash
$ cfn-lint EcsCluster.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EcsCluster.yaml  --stack-name EcsCluster --capabilities CAPABILITY_NAMED_IAM
```

**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcsCluster > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EcsCluster
```

**ECS Cluster from ECS Console**  
When you create an ECS Cluster using the ECS Console, a Stack is created containing the ECS Cluster and all its related resources including the LaunchTemplate, AutoScalingGroup etc.  
The `console-template.yaml` file shows a sample of the generated template and `console-template.json` is the JSON format of the same template.
