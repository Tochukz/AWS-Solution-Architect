# 1. Create the KMS customer-managed key (CMK) without key material
aws kms create-key \
  --description "My imported 256-bit AES key" \
  --key-usage ENCRYPT_DECRYPT \
  --customer-master-key-spec SYM_DEFAULT \
  --policy file://key-policy.json \
  --tags TagKey=Purpose,TagValue=ExternalKey

KEY_ID=$(aws kms create-key ... --query KeyMetadata.KeyId --output text)
ARN=$(aws kms create-key ... --query KeyMetadata.Arn --output text)

# 2. Get the public wrapping key and import token (valid 24h)
aws kms get-parameters-for-import \
  --key-id $KEY_ID \
  --wrapping-algorithm RSAES_OAEP_SHA_256 \
  --wrapping-key-spec RSA_2048 \
  --query '[ImportToken,PublicKey]' --output json > import-params.json

# 3. On your secure workstation: generate or retrieve your 256-bit key material
# Example with OpenSSL (256-bit = 32 bytes)
openssl rand 32 > key-material.bin

# 4. Wrap (encrypt) your key material with the KMS public key
openssl pkeyutl -encrypt \
  -in key-material.bin \
  -out encrypted-key-material.bin \
  -inkey <(jq -r .PublicKey import-params.json | base64 -d) \
  -pubin -pkeyopt rsa_padding_mode:oaep \
  -pkeyopt rsa_oaep_md:sha256 \
  -pkeyopt rsa_mgf1_md:sha256

# 5. Import the wrapped key material into KMS
aws kms import-key-material \
  --key-id $KEY_ID \
  --encrypted-key-material fileb://encrypted-key-material.bin \
  --import-token $(jq -r .ImportToken import-params.json) \
  --expiration-model KEY_MATERIAL_DOES_NOT_EXPIRE   # or DOES_EXPIRE + date

# 6. Verify
aws kms get-key-rotation-status --key-id $KEY_ID   # will be false (imported keys cannot auto-rotate)