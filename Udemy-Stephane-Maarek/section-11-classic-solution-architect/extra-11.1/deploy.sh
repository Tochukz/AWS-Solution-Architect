cd express-app
zip -r ../express-app.zip *
cd ../
aws s3 cp express-app.zip s3://chucks-workspace-storage/beanstalk-artifacts/express-app.zip