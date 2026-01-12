# Exercise 2.4

### Problem

Create and Launch an AMI Based on an Existing Instance Storage Volume

### Operation

This operation launches an EC2 instance bases on an AMI generated from the EC2 instance launched in exercises 2.1. That EC2 instance has Nginx server installed.  
The EC2 instance launch here also uses the keypair and security group created in CloudFormation deployment of exercises 2.1.

**Pre deployment**  
Deploy the CloudFormation template of exercises 2.1 if you have not already done so.

Create an AMI from the deployed instance of exercise 2.1.  
Update the INSTANCE_ID variable in `create-ami.sh` with the instance Id from exercise 2.1.
Run the script:

```
$ ./create-ami.sh
```

**Deplyment**  
Deploy a new EC2 instance using the new custom AMI produce by the _create-ami.sh_ script.  
Update imageId, keyName and securityGroupId variable in _launch-ec2.sh_ with the outputs from exercise 2.1.  
Run the script

```
$ ./launch-ec2.sh
```

Use the public IP output to test on a browser.

**Clean up**  
Delete the custom image and terminate the deployed EC2 instance.
First get the image snapshot id

```
$ aws ec2 describe-images --image-id ami-0a682b3cee92ba9be --query 'Images[0].BlockDeviceMappings[0].Ebs.SnapshotId'
```

Update the imageId, snapShotId and instanceId in _cleanup.sh_.  
Run the script:

```
$ ./cleanup.sh
```
