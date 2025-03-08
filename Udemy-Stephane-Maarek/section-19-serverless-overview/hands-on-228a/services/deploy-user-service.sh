#!/bin/bash
# Deploy Python code for the UserService

version=v0.0.2
cd user-service
zip -r user-service.zip . -x "*__pycache__*" "python/*" "user-service-func.json" "*.zip" "user_service_env/*"
aws s3 cp user-service.zip s3://chucks-workspace-storage/$version/user-service.zip

aws lambda update-function-code --function-name UserServiceFunc --s3-key $version/user-service.zip --s3-bucket chucks-workspace-storage > user-service-func.json

rm user-service.zip