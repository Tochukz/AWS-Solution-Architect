#!/bin/bash
# Deploy Code for Lambda Function and Layer to S3

bucketName="simple-storage"

cd node-app 
zip -r node-app.zip . -x "node_modules/*" "*.zip" "nodejs/*" ".env"

mkdir nodejs
cp package.json nodejs/
cd nodejs
npm install 
cd ../
zip -r node-lib.zip nodejs -q

aws s3 cp node-app.zip s3://$bucketName/vpc-lambda-redis.zip
aws s3 cp node-lib.zip s3://$bucketName/vpc-lambda-redis-layer.zip 

rm -r nodejs node-app.zip node-lib.zip