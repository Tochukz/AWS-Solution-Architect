# Lesson 228: API Gateway Basics - Hands On

### Description

This template configures an API Gateway with a Lambda function backend.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint ApiGateway.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file ApiGateway.yaml  --stack-name ApiGateway
```

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name ApiGateway > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name ApiGateway
```
