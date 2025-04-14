# Lesson 163: S3 Access Points

### Description

S3 Access Point can be used to provide different levels of access to specific prefixes within an S3 bucket for different IAM user groups.  
For example, you can grant read/write permission for all objects with the prefix `/finance` to users that belongs to the Finance IAM groups while users that belong to the Sales IAM group is granted permission for all objects with the `/sales` prefix.

In this template we configure S3 Access Point for three groups with as follows
Group | Prefix | Policy Permission
----------|----------|-------------------
Finance | /finance | Read/Write
Sales | /sales | Read/Write
Analytics | /finance <br> /sales | Readonly

S3 Access Point allows you to maintain a simple S3 bucket policy while granting adavanced permission to various Users, Groups and Roles in your account.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint S3AccessPoints.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3AccessPoints.yaml  --stack-name S3AccessPoints --parameter-overrides file://private-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**Post Deployment**
Get the ARNs and Alias of all the Access Points from the Stack Outputs

```bash
$ aws cloudformation describe-stacks --stack-name S3AccessPoints --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3AccessPoints > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3AccessPoints
```
