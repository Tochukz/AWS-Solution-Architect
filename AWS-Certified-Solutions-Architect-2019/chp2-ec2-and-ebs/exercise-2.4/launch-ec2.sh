#!/bin/bash

# Description: The launches an EC2 instance based on the AMI generated from existing instance

imageId=ami-0a682b3cee92ba9be
keyName=DevSimpleKey
instanceType=t2.micro
securityGroupId=sg-0e19dc636ba8a7aaa

InstanceId=$(aws ec2 run-instances \
   --image-id $imageId \
   --count 1 \
   --instance-type $instanceType \
   --key-name $keyName \
   --security-group-ids $securityGroupId \
   --user-data file://user-data.sh \
   --query 'Instances[0].InstanceId' \
   --output text
)

echo "Instance Id: $InstanceId"

aws ec2 wait instance-running --instance-ids $InstanceId

publicIp=$(aws ec2 describe-instances \
    --instance-ids $InstanceId \
    --query 'Reservations[0].Instances[0].PublicIpAddress' \
    --output text)

echo "Public IP Address: $publicIp"