#!/bin/bash
# Description:  Create a snapshot from the an EBS volume 

volumnId="vol-07590611e2dc87c13"
SnapshotId=$(aws ec2 create-snapshot --volume-id $volumnId --description "Simple volume snapshot" --query 'SnapshotId')

echo "SnapshotId: $SnapshotId" 