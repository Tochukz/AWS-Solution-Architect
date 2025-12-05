
version=v0.0.1
cd lambda-code 
zip -r lambda-code.zip . -x "lambda-code.zip"
aws s3 cp lambda-code.zip s3://chucks-workspace-storage/$version/lambda-code.zip