#!/bin/bash 

# Description: Create an AMI from an EC2 instance 
# It is recommended to stop the EC2 instance when creating the AMI

instanceId="i-09b1ed966e6e8267a"
description="This AMI is generated from the Amazon Linux 2 base AMI and have Nginx server preinstalled"
ImageId=$(aws ec2 create-image --instance-id $instanceId --name "AmazonLinux2Nginx" --description "$description" --query 'ImageId')

# Wait for the custom AMI to become available
aws ec2 wait image-available --image-ids $ImageId

echo "AMI Created: $ImageId"
