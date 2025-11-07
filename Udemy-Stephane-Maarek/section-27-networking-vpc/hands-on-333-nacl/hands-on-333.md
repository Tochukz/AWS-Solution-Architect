# Lesson 333: NACL and Security Group - Hands On

### Description

This examples creates a Network Access Control List and Security Group Resource.
By default a _Network Access Control List_ created without any rule will have:

- Outbound rule denying all traffic
- Inbound rule denying all traffic

By default a _Security Group_ created without any rile will have:

- Outbound rule that allow all traffic only.
- No inbound rule at all.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint NaClAndSecGroup.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file NaClAndSecGroup.yaml  --stack-name NaClAndSecGroup
```

**After Deployment**

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name NaClAndSecGroup > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name NaClAndSecGroup
```
