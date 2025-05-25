# Lesson 62: AMI - Hands on

### Description

Here we demonstrate how to create an AMI from an existing EC2 instances.

1. An EC2 instance running Amazon Linux 2 AMI is configured using the `AmiDemo.yaml` template.
2. An AMI is created from the EC2 instance from 1 using the `create-ami.sh` script.
3. Another EC2 instance is configured using the custom AMI created in 2 as the `ImageId` parameter in `CustomAmiUse.yaml` template.

Both EC2 instances configured will run an Nginx server and can be access on port 80 using a browser and their public IP

### Operation

**Deployment**  
Validate the template

```
$ aws cloudformation validate-template --template-body file://AmiDemo.yaml
```

Deploy a stack using the _AmiDemo_ template

```

$ aws cloudformation deploy \
    --template-file AmiDemo.yaml \
    --stack-name AmiDemo
```

Get the public IP and instance id from the outputs

```
$ aws cloudformation describe-stacks --stack-name AmiDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

Create an AMI after updating the instanceId in `create-ami.sh` script using the instance id from the output above.

```
$ ./create-ami.sh
```

Using the custom AMI id for the ImageId parameter in `CustomAmiUse.yaml`, configure a new EC2 instance.

```
$ aws cloudformation deploy --template-file CustomAmiUse.yaml --stack-name CustomAmiUse
```

**Debug Errors**  
In the case of error during deployment

```
$ aws cloudformation describe-stack-events --stack-name AmiDemo
```

**Testing**  
The PublicDnsName output from each of the deployed stack can be accessed using a browser to see the default Nginx welcome page.

**Cleanup**  
To delete the stacks and custom AMI

```
$ aws cloudformation delete-stack --stack-name CustomAmiUse
$ aws ec2 deregister-image --image-id ami-0f72a2351afe32d02
$ aws cloudformation delete-stack --stack-name AmiDemo
```
