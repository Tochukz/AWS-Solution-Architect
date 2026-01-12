#!/bin/bash
instanceId=i-0de814862aef19a5e
imageId=ami-0a682b3cee92ba9be
snapShotId=snap-024a69996a7377c58


aws ec2 terminate-instances --instance-id $instanceId
aws ec2 deregister-image --image-id $imageId
aws ec2 delete-snapshot --snapshot-id $snapShotId
