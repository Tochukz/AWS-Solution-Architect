# Using Security Group and NACLs - HOL-84

### Description

**Todo**
Try ICMP protocol for security groups.
Try security group chaining so that traffic to an instance is only allowed from security group that is attached to another instance.
Try network access control list rule that restricts all traffic to a custom VPC.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint SecGroupAndNacls.yaml
```

Deploy the SecGroupAndNacls stack

```bash
$ aws cloudformation deploy --template-file SecGroupAndNacls.yaml --stack-name SecGroupAndNacls
```

**After deployment**

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name SCP > events.json
```

**Testing**
If you don't want to keep using sudo on you terminal, you can do
``bash
$ sudo su
````
It activates you user by giving it sudo rights for the terminal session.

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SecGroupAndNacls
````
