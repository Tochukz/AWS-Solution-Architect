#!/bin/bash

BUCKET_NAME='simple-bucket-19-04'
FILE='sample.zip' # 12.9mb file
KEY="test-upload/$(basename $FILE)"
REGION="eu-west-2"

echo "🚀 Uploading with standard endpoint..."
time aws s3 cp "$FILE" "s3://$BUCKET_NAME/$KEY" \
  --region $REGION

echo "⚡ Uploading with transfer acceleration..."
time aws s3 cp "$FILE" "s3://$BUCKET_NAME/$KEY" \
  --endpoint-url https://s3-accelerate.amazonaws.com \
  --region $REGION
