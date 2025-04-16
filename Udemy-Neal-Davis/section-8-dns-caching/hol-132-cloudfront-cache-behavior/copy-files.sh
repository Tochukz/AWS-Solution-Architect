#!/bin/bash
# Description:  Copy files to S3 buckets

# Copy images
aws s3 cp files/coffee.jpg s3://image-bucket-14-04
aws s3 cp files/donut.jpg s3://image-bucket-14-04

# Copy PDFs
aws s3 cp files/data-analysis.pdf s3://pdf-bucket-14-04
aws s3 cp files/document.pdf s3://pdf-bucket-14-04

# Copy the static-website files to the 
aws s3 sync static-website s3://static-website-bucket-14-04