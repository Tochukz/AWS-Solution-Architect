# ECS + API Gateway

## Requirement

We want to configure a containerized application that sits in an ECS container.  
The containerized application must only be accessible through an API Gateway endpoint.  

## Solution

To achieve the required configuration, we configure an internal ALB that direct traffic to the ECS Task.  
The ECS service that houses the tasks must sit in a private subnet and it's security group must only allow traffic coming from the ALB's security group.   
An API Gateway is configured and integrated to the ALB using a VPC Link connection type. 
The ALB's security group only allow trafic coming from the VPC Link's Security Group.    

```
API Gateway -> ALB -> ECS Service
```

## Out of scope  
This solution does not focus on scalability to so the `DesiredCount` for the ECS task is set to 1 and there is no Auto Scaling resource includes. 


## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Network.yaml
$ cfn-lint EcsService.yaml
$ cfn-lint ApiGateway.yaml
```

1. Deploy the Network stack

```bash
$ aws cloudformation deploy --template-file Network.yaml --stack-name Network
```

2. Deploy the EcsService stack 
```bash
$ aws cloudformation deploy --template-file EcsService.yaml --stack-name EcsService --capabilities CAPABILITY_NAMED_IAM
```

3. Deploy the ApiGateway stack
```bash
$ aws cloudformation deploy --template-file ApiGateway.yaml --stack-name ApiGateway
```

**After Deployment**  

Get the output of the ApiGateway stack 
```bash
$ aws cloudformation describe-stacks --stack-name ApiGateway --query "Stacks[0].Outputs" --no-cli-pager
```
**Testing**  

Use the `ApiEndpoint` stack output of the ApiGateway stack  to test the container application. 

**Clean up**  

Delete the stacks

```bash
$ ./delete-stacks.sh
```

__Learn More__  
