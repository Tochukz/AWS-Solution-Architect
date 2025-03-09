#!/bin/bash
# Filename: deploy-nestjs.sh
# Description: Deploys NestJS application code to S3 bucket as Lambda function handler and updates the Lambda fucnction.
# To upload build to S3 and also update the lambda function: ./deploy-nestjs.sh 0.0.1 
# To upload build to S3 only WITHOUT updating the lambda functions: ./deploy-nestjs.sh 0.0.1 --nofunc
# To upload and deploy only lambda function but not the layer, ./deploy-nestjs.sh 0.0.1 --nolayer

ver=$1
second=$2
if test -z "$ver"
then
  echo "Please supply a version number as the first argument for the script e.g ./deploy-nestjs.sh 0.0.1  --nolayer | --nofunc"
  exit
fi 
version=v$ver

case $second in 
  --nofunc)
    nofunc=$second
    ;;
  --nolayer)
    nolayer=$second
    ;;
esac


echo Version=$version

code_dir=processor
npm install
npm run build
zip -r ${code_dir}.zip dist -x "*.ts" "*.map"

if [ -z "$nolayer" ] 
then
  mkdir nodejs
  cp package.json nodejs/
  cd nodejs
  npm install --omit=dev
  cd ../
  zip -q -r ${code_dir}_nodejs.zip nodejs
else
  echo "No packaging of node_modules"
fi


echo "Copying $code_dir.zip to S3 bucket with key: $version/$code_dir.zip" 
aws s3 cp $code_dir.zip s3://chucks-workspace-storage/$version/$code_dir.zip 

if [ -z "$nolayer" ]; then
  echo "Copying ${code_dir}_nodejs.zip to S3 bucket with key: $version/${code_dir}_nodejs.zip" 
  aws s3 cp ${code_dir}_nodejs.zip s3://chucks-workspace-storage/$version/${code_dir}_nodejs.zip 
else 
  echo "No updating of node_modules S3 object"
fi

if [ -z "$nofunc" ] 
then
  echo "Updating lambda function..."
  aws lambda update-function-code --function-name DataPreparationFunc --s3-key $version/$code_dir.zip --s3-bucket chucks-workspace-storage > /dev/null
  aws lambda update-function-code --function-name PdfGenerationFunc --s3-key $version/$code_dir.zip --s3-bucket chucks-workspace-storage > /dev/null
  aws lambda update-function-code --function-name PdfMailerFunc --s3-key $version/$code_dir.zip --s3-bucket chucks-workspace-storage > /dev/null  
else
  echo "S3 copying completed!"
  echo "No updating of lambda functions!"
fi

rm $code_dir.zip

if [ -z "$nolayer" ]; then
  echo "Publishing lambda layer version..."
  LayerVersionArnWithQuotes=$(aws lambda publish-layer-version --layer-name SimpleJobLayer --content S3Bucket=chucks-workspace-storage,S3Key=$version/${code_dir}_nodejs.zip --query LayerVersionArn)
  LayerVersionArn=$(sed -e 's/^"//' -e 's/"$//' <<<"$LayerVersionArnWithQuotes") 
  echo "LayerVersionArn=${LayerVersionArn}"

  rm -r nodejs
  rm ${code_dir}_nodejs.zip

  echo "Updating lambda configuration..."
  aws lambda update-function-configuration --function-name DataPreparationFunc  --layers $LayerVersionArn > /dev/null  
  aws lambda update-function-configuration --function-name PdfGenerationFunc  --layers $LayerVersionArn > /dev/null  
  aws lambda update-function-configuration --function-name PdfMailerFunc  --layers $LayerVersionArn > /dev/null  
else 
  echo "No updating of lambda layer"
fi











