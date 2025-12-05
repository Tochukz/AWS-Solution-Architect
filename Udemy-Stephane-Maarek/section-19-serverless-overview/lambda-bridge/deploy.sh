#!/bin/bash 

version=v0.0.1
cd code 
zip -r lambda-bridge.zip . -x "lambda-bridge.zip"

aws s3 cp lambda-bridge.zip s3://chucks-workspace-storage/$version/lambda-bridge.zip

rm lambda-bridge.zip