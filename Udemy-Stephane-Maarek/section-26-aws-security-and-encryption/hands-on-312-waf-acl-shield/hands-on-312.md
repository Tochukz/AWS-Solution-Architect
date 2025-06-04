# Lesson 312: WafAcl and Shield - Hands On

### Description

The template configures a Web Application Firewall (WafAcl) Access Control List (ACL).

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint WafAcl.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file WafAcl.yaml  --stack-name WafAcl
```

**After Deployment**  
Get the `SecretArn` and `DbEndpoint` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name WafAcl --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name WafAcl > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name WafAcl
```
