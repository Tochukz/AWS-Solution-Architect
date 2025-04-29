#!/bin/bash
# Filename: deploy-express.sh
# Description: Deploy Express Application code to S3
# To upload and deploy only lambda function but not the layer, ./deploy-express.sh app-name 0.0.1 --nolayer

app_name=$1
ver=$2
nolayer=$3

if test -z "$app_name"
then
  echo "Please supply a app_name as the first argument for the script e.g ./deploy-express.sh user-service 0.0.1 --nolayer"
  exit
fi

if test -z "$ver"
then
  echo "Please supply a version number as the second argument for the script e.g  ./deploy-express.sh user-service 0.0.1 --nolayer"
  exit
fi
version=v$ver

cd ../../../MicroServices/$app_name
app_zip=$app_name.zip
zip -q -r $app_zip . -x ".*" "node_modules/*" "migrations/*" "resources/*" "seeders/*" "tmp/*" "sql/*" "output/*"

module_zip=${app_name}-nodejs.zip
if [ -z "$nolayer" ]
then
  mkdir nodejs
  cp package.json nodejs/
  cd nodejs
  npm install --omit=dev
  cd ../
  zip -q -r $module_zip nodejs
else
  echo "No packaging of node_modules"
fi

bucket_name=chucks-workspace-storage

echo "Copying $app_zip to S3 bucket with key: $version/$app_zip"
aws s3 cp $app_zip s3://$bucket_name/$version/$app_zip

layer_zip=shared-module.zip
if [ -z "$nolayer" ]; then
  echo "Copying $module_zip to S3 bucket with key: $version/$layer_zip"
  aws s3 cp $module_zip s3://$bucket_name/$version/$layer_zip

  rm -r nodejs
  rm $module_zip
else
  echo "No updating of lambda layer"
fi

