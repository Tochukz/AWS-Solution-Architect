#!/bin/bash
# Description: Deploy Python Dependencies to Lambda Layer

version=v0.0.2
pythonVersion=python3.9
mkdir -p python/lib/$pythonVersion/site-packages
pip install -r user-service/requirements.txt -t python/lib/$pythonVersion/site-packages --platform manylinux2014_x86_64 --python-version 3.9 --only-binary=:all:
zip -q -r user-service-packages.zip python

echo "Copying user-service-packages.zip to S3 bucket with key: $version/user-service-packages.zip" 
aws s3 cp user-service-packages.zip s3://chucks-workspace-storage/$version/user-service-packages.zip

echo "Publishing lambda layer version..."
LayerVersionArnWithQuotes=$(aws lambda publish-layer-version --layer-name UserServiceLayer --content S3Bucket=chucks-workspace-storage,S3Key=$version/user-service-packages.zip --query LayerVersionArn)
LayerVersionArn=$(sed -e 's/^"//' -e 's/"$//' <<<"$LayerVersionArnWithQuotes") 
echo "LayerVersionArn=${LayerVersionArn}"

# rm -r python
# rm user-service-packages.zip

echo "Updating lambda configuration..."
aws lambda update-function-configuration --function-name UserServiceFunc  --layers $LayerVersionArn > /dev/null  