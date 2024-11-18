#!/bin/bash

# Set variables
INSTANCE_ID=i-00057f828b65dcd7b
AMI_NAME="SimpleCustomAMI-$(date +%Y%m%d)"
AMI_DESCRIPTION="Backup AMI created on $(date)"

# Create AMI
AMI_ID=$(aws ec2 create-image \
    --instance-id $INSTANCE_ID \
    --name "$AMI_NAME" \
    --description "$AMI_DESCRIPTION" \
    --no-reboot \
    --query 'ImageId' \
    --output text)

# Add tags to the AMI
aws ec2 create-tags \
    --resources $AMI_ID \
    --tags Key=Name,Value="$AMI_NAME" \
            Key=CreatedBy,Value="AWS-CLI-Script"

# Optional: Wait for AMI to be available
aws ec2 wait image-available --image-ids $AMI_ID

echo "AMI Created: $AMI_ID"
