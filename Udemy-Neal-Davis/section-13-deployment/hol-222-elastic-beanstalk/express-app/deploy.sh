bucket="my-bucket-name"
version=v0.0.1
npm install 
zip -r express-app.zip . -x "*.zip" "*.sh" "*.DS_Store" 
aws s3 cp express-app.zip s3://$bucket/$version/express-app.zip