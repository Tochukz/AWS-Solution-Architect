# Create an Application Load Balancer - HOL-57

### Description

This template is an extension of _hol-53-auto-scaling_ which configures an Auto Scaling Group.   
Here we add an _Application Load Balancer_ to the stack.  

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint ALB.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file ALB.yaml --stack-name ALB
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name ALB > events.json
```

**Testing**  
Get the DnsName from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name ALB --query "Stacks[0].Outputs" --no-cli-pager
```

Use the DnsName to access the application on a Web Browser.

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name ALB
```
