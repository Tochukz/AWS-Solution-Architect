# Extra 10.1 - ECS Service with Application Load Balancer

### Description

This configuration build on `hol-161-launch-containers` which configures an ECS service running a desired count of two tasks. That ECS service provides Public IP addresses for the individual Tasks.  
Here we add an Application Load Balancer to the ECS service.  
This ALB provides a single endpoint to the Tasks running in the ECS service and distributes the traffic evenly to the running tasks.

### Operation

**Before deployment**

**Deployment**

Lint the template

```bash
$ cfn-lint EcsAndAlb.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EcsAndAlb.yaml --stack-name EcsAndAlb  --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://private-parameters.json
```

**After deployment**  
Get the `AlbDnsName` from the stack output

```bash
$ aws cloudformation describe-stacks --stack-name EcsAndAlb --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Use the `AlbDnsName` to access the application on a web browser.

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EcsAndAlb
```
