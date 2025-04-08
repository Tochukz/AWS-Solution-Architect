# Lesson 360: AWS Backup - Hands On

### Description

This configuration configures a backup plan.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Backup.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Backup.yaml  --stack-name Backup --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Backup > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Backup
```
