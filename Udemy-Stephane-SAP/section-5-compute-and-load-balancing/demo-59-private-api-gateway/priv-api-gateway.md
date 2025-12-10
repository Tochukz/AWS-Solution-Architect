# Lesson 59: API Gateway - Part 2

## Demo 59: Private API Gateway

### Description


### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint EcrEnhancedScanning.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EcrEnhancedScanning.yaml  --stack-name EcrEnhancedScanning
```

**After Deployment**



**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcrEnhancedScanning > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EcrEnhancedScanning
```
