#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <distribution-id> <web-acl-arn>"
  echo "Example: $0 E123ABC456DEF arn:aws:wafv2:us-east-1:123456789012:global/webacl/cloudfront-web-acl/abcd1234-5678-90ef-ghij-klmnopqrstuv"
  exit 1
fi

if ! command -v aws >/dev/null 2>&1; then
  echo "Error: aws CLI not found in PATH."
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required but not installed. Install jq and re-run."
  exit 1
fi

DISTRIBUTION_ID="$1"
WEB_ACL_ARN="$2"
TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

echo "Fetching current distribution config for ${DISTRIBUTION_ID}..."
aws cloudfront get-distribution-config --id "$DISTRIBUTION_ID" --output json > "$TMP_FILE"

ETAG="$(jq -r '.ETag' "$TMP_FILE")"
UPDATED_CONFIG="$(jq --arg webAclArn "$WEB_ACL_ARN" '.DistributionConfig + {WebACLId: $webAclArn}' "$TMP_FILE")"

echo "Associating Web ACL with distribution..."
aws cloudfront update-distribution \
  --id "$DISTRIBUTION_ID" \
  --if-match "$ETAG" \
  --distribution-config "$UPDATED_CONFIG" \
  --output json >/dev/null

echo "Success: Web ACL is now associated with distribution ${DISTRIBUTION_ID}."
