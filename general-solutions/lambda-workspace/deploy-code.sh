#!/bin/bash
# Filename: deploy-code.sh
# Description: Deploy Lambda function code to S3
# To upload and deploy only lambda function but not the layer, ./deploy-code.sh 0.0.1 --nolayer 

ver=$1
nolayer=$2

if test -z "$ver"
then
  echo "Please supply a version number as the first argument for the script e.g ./deploy-code.sh 0.0.1 --nolayer"
  exit
fi 

version=v$ver

codedir=/Users/tochukz/workspace/ExpressJS/pdf-generator-app
packageName=single-lambda.zip
libPackageName=single-lambda-layer.zip
functionName=SimpleLambdaFunc
layerName=SimpleLambdaLayer
bucketName=your-bucket-name

cd $codedir
zip -q -r $packageName . -x ".*" "node_modules/*" "migrations/*" "resources/*" "seeders/*" "tmp/*" "sql/*" "output/*"

if [ -z "$nolayer" ] 
then
  mkdir nodejs
  cp package.json nodejs/
  cd nodejs
  npm install --omit=dev
  cd ../
  zip -q -r $libPackageName nodejs
else
  echo "No packaging of node_modules"
fi

echo "Copying $packageName to S3 bucket with key: $version/$packageName" 
aws s3 cp $packageName s3://$bucketName/$version/$packageName 

echo "Updating lambda function..."  
aws lambda update-function-code --function-name $functionName --s3-key $version/$packageName --s3-bucket $bucketName > /dev/null  
rm $packageName

if [ -z "$nolayer" ]; then
  echo "Copying $libPackageName to S3 bucket with key: $version/$libPackageName" 
  aws s3 cp $libPackageName s3://$bucketName/$version/$libPackageName 

  echo "Publishing lambda layer version..."
  LayerVersionArnWithQuotes=$(aws lambda publish-layer-version --layer-name $layerName --content S3Bucket=$bucketName,S3Key=$version/$libPackageName --query LayerVersionArn)
  LayerVersionArn=$(sed -e 's/^"//' -e 's/"$//' <<<"$LayerVersionArnWithQuotes") 
  echo "LayerVersionArn=${LayerVersionArn}"

  rm -r nodejs
  rm $libPackageName

  echo "Updating lambda configuration..."
  aws lambda update-function-configuration --function-name $functionName  --layers $LayerVersionArn > /dev/null  
else 
  echo "No updating of lambda layer"
fi

