# Exercise 2.1

### Problem

Launch an EC2 Linux Instance and login Using SSH

### Operation

**Pre deployment**  
First, create an SSH key-pair

```
$ aws ec2 create-key-pair --key-name DevSimpleKey --query 'KeyMaterial' --output text > dev-simple-key.pem
```

Make the private key file read only

```
$  chmod 400 dev-simple-key.pem
```

The key name will be used as a parameter in the cloud formation template.

Validate the CloudFormation template

```
$ aws cloudformation validate-template \
    --template-body file://SimpleEc2.yaml
```

**Deployment**  
Deploy a stack using the CloudFormation template

```

$ aws cloudformation deploy \
    --template-file SimpleEc2.yaml \
    --stack-name DevSimpleEc2 \
    --parameter-overrides file://DevParameters.json
    --capabilities CAPABILITY_NAMED_IAM
```

When your CloudFormation template includes resources that create or modify IAM resources (e.g., roles, policies, or instance profiles), AWS requires explicit confirmation for such changes to ensure you understand the potential security implications. To address this, the `--capabilities` flag must be applied with the `CAPABILITY_NAMED_IAM` value as shown above to avoid the `InsufficientCapabilitiesException` when calling the CreateChangeSet operation.

Checkout outputs after successful deployment

```
$ aws cloudformation describe-stacks --stack-name DevSimpleEc2  --query "Stacks[0].Outputs"
```

Login to the EC2 instance via SSH using the private key file

```
$  ssh -i dev-simple-key.pem ec2-user@18.132.14.192
```

In the event of a failure, check deployment events

```
$ aws cloudformation describe-stack-events --stack-name DevSimpleEc2
```

**Cleanup**  
To delete the stack

```
$ aws cloudformation delete-stack --stack-name DevSimpleEc2
```

Monitor the delete process

```
$ aws cloudformation describe-stacks --stack-name DevSimpleEc2
```

After deletion, no stack will be found resulting in an error.
