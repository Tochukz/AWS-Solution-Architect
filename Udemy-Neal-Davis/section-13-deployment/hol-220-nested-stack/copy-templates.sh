#!/bin/bash
bucket=my-bucket-name

aws s3 cp sub-templates/Vpc.yaml s3://$bucket/templates/Vpc.yaml
aws s3 cp sub-templates/Subnet1.yaml s3://$bucket/templates/Subnet1.yaml
aws s3 cp sub-templates/Subnet2.yaml s3://$bucket/templates/Subnet2.yaml