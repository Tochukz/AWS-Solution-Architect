#!/bin/bash
# Deploy NodeJS code for the OrderService

version=v0.0.2
cd auth-service
zip -r  auth-service.zip . -x ".*" "node_modules/*" "nodejs/*"
aws s3 cp auth-service.zip s3://chucks-workspace-storage/$version/auth-service.zip

mkdir nodejs
cp package.json nodejs/
cd nodejs
npm install --omit=dev
cd ../
zip -q -r auth-service-module.zip nodejs/
aws s3 cp auth-service-module.zip s3://chucks-workspace-storage/${version}/auth-service-module.zip

# aws lambda update-function-code --function-name OrderServiceFunc --s3-key $version/order-service.zip --s3-bucket chucks-workspace-storage > order-service-func.json