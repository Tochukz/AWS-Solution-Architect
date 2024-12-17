# Lesson 61: EFS - Hands on

### Description

This configuration provisions an EFS file system with mount targets in 3 subnets of a Vpc and one access point.  
It then mounts the EFS file system on two EC2 instances.

### Operation

**Deployment**  
Upload the child templates to S3

```
$ aws s3 cp Ec2DemoChild.yaml s3://chucks-workspace-storage/templates/Ec2DemoChild.yaml
```

Validate the template

```
$ aws cloudformation validate-template --template-body file://EfsDemo.yaml
```

Deploy a stack using the _EfsDemo_ template

```

$ aws cloudformation deploy --template-file EfsDemo.yaml  --stack-name EfsDemo
```

Get the file system Id and access point id from the outputs

```
$ aws cloudformation describe-stacks --stack-name EfsDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
For testing, we can demonstrate that when a file is updated on one EC2 instance,
the changes to the file can be accessed on the second EC2 instance.

SSH into the first EC2 instance and create file

```bash
$ ssh -i dev-simple-key.pem ec2-user@xx.xxx.xxx
# Elevate your right to sudo
$ sudo su
# Create a file
$ echo "hello world" > /mnt/efs/fs1/hello.txt
$ cat /mnt/efs/fs1/hello.txt
```

SSH into the second EC2 instance to access the same file created from the first EC2

```bash
$ ssh -i dev-simple-key.pem ec2-user@xx.xxx.xxx
$ ls /mnt/efs/fs1
$ echo /mnt/efs/fs1/hello.txt
# Update the file
$ sudo su
$ echo "worlderful cloud" >> /mnt/efs/fs1/hello.txt
```

You can go back the the first EC2 to see that tile file has been updated.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```
$ aws cloudformation describe-stack-events --stack-name EfsDemo
```

**Cleanup**  
To delete the stacks and custom AMI

```
$ aws cloudformation delete-stack --stack-name EfsDemo
```
