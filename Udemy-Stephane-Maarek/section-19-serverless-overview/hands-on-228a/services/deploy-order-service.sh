#!/bin/bash
# Deploy NodeJS code for the OrderService

version=v0.0.2
cd order-service
zip -r  order-service.zip . -x ".*" "node_modules/*" "nodejs/*"
aws s3 cp order-service.zip s3://chucks-workspace-storage/$version/order-service.zip

mkdir nodejs
cp package.json nodejs/
cd nodejs
npm install --omit=dev
cd ../
zip -q -r order-service-module.zip nodejs/
aws s3 cp order-service-module.zip s3://chucks-workspace-storage/${version}/order-service-module.zip

aws lambda update-function-code --function-name OrderServiceFunc --s3-key $version/order-service.zip --s3-bucket chucks-workspace-storage > order-service-func.json