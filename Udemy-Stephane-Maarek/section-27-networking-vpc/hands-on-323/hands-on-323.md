# Lesson 323: Subnet - Hands On

### Description

This configuration builds on `hands-on-321` by adding for subnets - 2 prvate and 2 public subnets to the custom VPC.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Subnet.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Subnet.yaml  --stack-name Subnet
```

**After Deployment**

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Subnet > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Subnet
```
