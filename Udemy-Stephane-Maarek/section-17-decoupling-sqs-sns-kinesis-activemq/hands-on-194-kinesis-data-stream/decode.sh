#!/bin/bash
# Description: Decode and base64 encoded data
base64Data=$1
textData=$(echo "$base64Data" | base64 --decode)
echo "Data: $textData"
