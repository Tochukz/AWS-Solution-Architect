# Lesson 247: Athena - Hands On

### Description

Amazon Athena allows querying structured data stored in Amazon S3 using SQL .

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Athena.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Athena.yaml  --stack-name Athena
```

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Athena > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Athena
```
