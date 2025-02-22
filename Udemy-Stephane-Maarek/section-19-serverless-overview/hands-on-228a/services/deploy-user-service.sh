#!/bin/bash
# Deploy Python code for the UserService

version=v0.0.2
zip -r  user-service.zip user-service/ -x "*__pycache__*"
aws s3 cp user-service.zip s3://chucks-workspace-storage/$version/user-service.zip

mkdir python
cd python

# Install packages
pip install -r  ../user-service/requirements.txt --target .

# Create zip file for the layer
cd ../
zip -r user-service-packages.zip python/
aws s3 cp user-service-packages.zip s3://chucks-workspace-storage/$version/user-service-packages.zip

