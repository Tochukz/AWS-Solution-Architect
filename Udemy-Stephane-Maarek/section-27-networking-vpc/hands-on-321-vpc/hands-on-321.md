# Lesson 321: VPC - Hands On

### Description

This configuration creates a Custom VPC

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Vpc.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Vpc.yaml  --stack-name Vpc
```

**After Deployment**

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Vpc > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Vpc
```
