# ECS + API Gateway

## Requirement

We want to configure a containerizes API that sits in an ECS container.  
The containersized application should be scalable. 
It must only be accessible through an API Gateway endpoint. 

## Solution

To achieve the required configuration, we configure an internal ALB the direct traffic the the ECS Task. 
An API Gateway in then place in front of the ALB.  
All traffic must go through the API Gateway to the to the API inside of the ECS container.  

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Network.yaml
$ cfn-lint EcsService.yaml
```

1. Deploy the Network stack

```bash
$ aws cloudformation deploy --template-file Network.yaml --stack-name Network
```

2. Deploy the EcsService stack 
```bash
$ aws cloudformation deploy --template-file EcsService.yaml --stack-name EcsService --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  

Get the output of the EcsService stack 
```bash
$ aws cloudformation describe-stacks --stack-name EcsService --query "Stacks[0].Outputs" --no-cli-pager
```
**Testing**  

Use the `DnsName` stack output of the EcsService stack  to test the container application. 

**Clean up**  

Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EcsService
$ aws cloudformation delete-stack --stack-name Network
```

__Learn More__  
