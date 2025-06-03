# Lesson 211: AWS App Runner - Hands On

### Description

This template deploy an App Runner Service using a docker image from ECR Public Repository.  
App Runner allows you to use a Docker Registrey or Code Repository as you application source.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint AppRunner.yaml
```

Deploy the Stack

```bash
$ aws cloudformation deploy --template-file AppRunner.yaml  --stack-name AppRunner
```

**Testing**  
Get the Service Url from the stack Outputs

```bash
$ aws cloudformation describe-stacks --stack-name AppRunner --query "Stacks[0].Outputs" --no-cli-pager
```

Use a Browser to access the application using the Service Url.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name AppRunner > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name AppRunner
```
