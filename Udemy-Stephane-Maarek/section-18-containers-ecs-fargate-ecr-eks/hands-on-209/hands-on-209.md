# Lesson 209: Amazon EKS - Hands On

### Description

This template configures an EKS Cluster and a Node group.

### Operation

**Deployment**  
There are two template files `Network.yaml` and `EksCluster.yaml`.  
The Stack created from the `Network` template will be a dependency for the Stack created from `EksCluster` template because `EksCluster` stack imports exported output from `Network` stack.  
For this reason, `Network` stack must be deployed successfully before `EksCluster` stack is deployed.

Lint the templates

```bash
$ cfn-lint Network.yaml
$ cfn-lint EksCluster.yaml
```

1. Deploy the Network Stack

```bash
$ aws cloudformation deploy --template-file Network.yaml  --stack-name Network
```

2. Deploy the EksCluster Stack

```bash
$ aws cloudformation deploy --template-file EksCluster.yaml  --stack-name EksCluster --capabilities CAPABILITY_NAMED_IAM
```

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EksCluster > events.json
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EksCluster
$ aws cloudformation delete-stack --stack-name Network
```
