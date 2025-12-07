# Lesson 50: Amazon ECR - Elastic Container Registry

## Demo 50: ECR Basic Scanning

### Description

This example configures an ECR repository with basic Scanning enabled.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint EcrBasicScanning.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EcrBasicScanning.yaml  --stack-name EcrBasicScanning
```

**After Deployment**



**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcrBasicScanning > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EcrBasicScanning
```
