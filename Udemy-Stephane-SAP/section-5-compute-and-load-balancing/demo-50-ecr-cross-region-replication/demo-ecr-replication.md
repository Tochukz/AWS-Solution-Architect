# Lesson 50: Amazon ECR - Elastic Container Registry

## Demo 50: ECR Cross Region Replication

### Description

This example configures cross region replication for an ECR repository. 

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint EcrReplication.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EcrReplication.yaml  --stack-name EcrReplication
```

**After Deployment**



**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcrReplication > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EcrReplication
```
