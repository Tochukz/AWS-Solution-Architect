# Lesson 52: Elastic Network Interface (ENI) - Hands on

### Description

This template demonstrates how ENIs can be created and then attached to EC2 instances.
An EC2 instance can have multiple ENIs but an ENI can only be attached to one instance at a time.

When an EC2 instances in provisioned it comes with a default ENI which provides a primary private IPV4 and public IPV4.
However, an additional ENI can be created seperately and attached to EC2 instances to provide a secondary private IPV4 and public IPV4.

This can be useful when a fail-over is required. If one EC2 instance fails, the ENI can be attached to another EC2 instance.

### Operation

**Deployment**  
Deploy a stack using the CloudFormation template

```

$ aws cloudformation deploy \
    --template-file EniDemo.yaml \
    --stack-name EniDemo
```

Checkout outputs after successful deployment

```
$ aws cloudformation describe-stacks --stack-name EniDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Debug Errors**  
In the case of error during deployment

```
$ aws cloudformation describe-stack-events --stack-name EniDemo
```

**Cleanup**  
To delete the stack

```
$ aws cloudformation delete-stack --stack-name EniDemo
```
