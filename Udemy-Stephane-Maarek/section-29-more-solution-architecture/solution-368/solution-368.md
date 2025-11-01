
# Solution 368: EC2 Instance High Availability

## Requirement
Configure a highly available EC2 instance with ASG + EBS

## Solution
Create an ASG, EIP and Launch Template.  
The ASG should specify a min, max and desired instance count should all be set to 1.  
The User Data of the Lauch template should attach the EIP to the EC2 instance after it is launched.  
Use the ASG _Terminate lifecycle hook_ to create an EBS snapshot plus tag when an EC2 instance is terminated.  
Use the ASG _Launch lifecycle hook_ to create an EBS volume from the snapshot and attach it to eh newly laucnhed EC2 instance.  
