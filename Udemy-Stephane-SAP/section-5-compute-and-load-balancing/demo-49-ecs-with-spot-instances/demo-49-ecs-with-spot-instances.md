# Lesson 49: Amazon ECS - Elastic Container Service

## Demo 49: ECS Service with EC2 Spot Instances

### Description

The example explores ECS Service running on EC2 Spot instances.
### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint EcsSpotInstances.yaml.yaml.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EcsSpotInstances.yaml.yaml.yaml  --stack-name EcsSpotInstances.yaml.yaml
```

**After Deployment**



**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcsSpotInstances.yaml.yaml > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EcsSpotInstances.yaml.yaml
```
