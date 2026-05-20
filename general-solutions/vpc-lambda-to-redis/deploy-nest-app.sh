#!/bin/bash
# Deploy Code for Lambda Function and Layer to S3

bucketName="simple-storage"

cd nest-app 
npm install 
npm run build
cd dist 
zip -r ../nest-app.zip .
cd ../

mkdir nodejs
cp package.json nodejs/
cd nodejs
npm install --omit=dev
cd ../
zip -r nest-lib.zip nodejs -q

aws s3 cp nest-app.zip s3://$bucketName/nest-lambda-redis.zip
aws s3 cp nest-lib.zip s3://$bucketName/nest-lambda-redis-layer.zip 

rm -r nodejs nest-app.zip nest-lib.zip