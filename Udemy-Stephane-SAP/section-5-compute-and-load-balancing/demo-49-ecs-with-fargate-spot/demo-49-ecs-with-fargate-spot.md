# Lesson 49: Amazon ECS - Elastic Container Service

## Demo 49: ECS Service with Fargate Spot

### Description

The example explores ECS Service with tasks running on  _FARGATE_SPOT_.  

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint EcsFargateSpot.yaml.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EcsFargateSpot.yaml.yaml  --stack-name EcsFargateSpot.yaml
```

**After Deployment**



**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcsFargateSpot.yaml > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EcsFargateSpot.yaml
```
