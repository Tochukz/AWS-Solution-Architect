cd code 
zip -r ../code.zip .
cd ../
aws s3 cp code.zip s3://cloud-works/v1.0.0/lambda-code-22-10.zip
