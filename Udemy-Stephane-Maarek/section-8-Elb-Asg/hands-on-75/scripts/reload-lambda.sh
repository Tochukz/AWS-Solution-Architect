#!/bin/bash
# Filename: reload-functon.sh
# Description: Reload a lambda function after code changes to the source
# To upload and deploy only lambda function but not the layer, ./reload-function.sh app-name 0.0.1

app_name=$1
version=$2
if test -z "$app_name"
then
  echo "Please supply a app_name as the first argument for the script e.g ./reload-lambda.sh user-management 0.0.1"
  exit
fi

if test -z "$version"
then
  echo "Please supply a version number as the second argument for the script e.g  ./reload-lambda.sh  user-management 0.0.1"
  exit
fi


case $app_name in
  'user-management')
    functName=UserFunc
    ;;
  'catalog-management')
    functName=CatalogFunc
    ;;
  *)
    echo -n "Unsupported app name $app_name "
    exit
    ;;
esac

aws lambda update-function-code --function-name $functName --s3-key v$version/$app_name.zip --s3-bucket chucks-workspace-storage
