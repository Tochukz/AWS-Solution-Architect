# Lesson 49: Amazon ECS - Elastic Container Service

## Demo 49: Run Batch Processing / Scheduled Tasks

### Description

The example explores how ECS can we used for Batch processing or running Scheduled Tasks.  
We Schedule an EC2 task for run on On-demand and/or Spot instances.   

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint EcsBatchProcessing.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EcsBatchProcessing.yaml  --stack-name EcsBatchProcessing
```

**After Deployment**



**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcsBatchProcessing > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EcsBatchProcessing
```
