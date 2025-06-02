#!/bin/bash

regionalEndpoint='https://simple-bucket-19-04.s3.eu-west-2.amazonaws.com'
transferAccelerationEndpoint='https://simple-bucket-19-04.s3-accelerate.amazonaws.com'
file='sample.zip' # 12.9mb file
key="test-upload/$(basename $file)"

echo "🚀 Downloading 12.9MB file with S3 regional endpoint..."
time wget "$regionalEndpoint/$key" -O regional-sample.zip -q

echo "⚡ Downloading 12.9MB file with  accelerated endpoint..."
time wget "$transferAccelerationEndpoint/$key" -O accelerated-sample.zip -q