# Lesson 18: KMS

## Demo 18: Imported Key Material

### Description

This example configures a KMS Key that will support an external Key material

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint ImportedMaterial.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file ImportedMaterial.yaml  --stack-name ImportedMaterial --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

1. Get the `KeyId` from the stack output

```bash
$ aws cloudformation describe-stacks --stack-name ImportedMaterial --query "Stacks[0].Outputs"
```

2. Get the public wrapping key and import token (valid 24h)

```bash
$ aws kms get-parameters-for-import \
  --key-id <key-id> \
  --wrapping-algorithm RSAES_OAEP_SHA_256 \
  --wrapping-key-spec RSA_2048 \
  --query '[ImportToken,PublicKey]' --output json > output-import-params.json
```

3. On your secure workstation: generate or retrieve your 256-bit key material

```bash
# Example with OpenSSL (256-bit = 32 bytes)
$ openssl rand 32 > key-material.bin
```

4. Wrap (encrypt) your key material with the KMS public key

```bash
$ openssl pkeyutl -encrypt \
  -in key-material.bin \
  -out encrypted-key-material.bin \
  -inkey <(jq -r .PublicKey import-params.json | base64 -d) \
  -pubin -pkeyopt rsa_padding_mode:oaep \
  -pkeyopt rsa_oaep_md:sha256 \
  -pkeyopt rsa_mgf1_md:sha256
```

5. Import the wrapped key material into KMS

```bash
$ aws kms import-key-material \
  --key-id $KEY_ID \
  --encrypted-key-material fileb://encrypted-key-material.bin \
  --import-token $(jq -r .ImportToken import-params.json) \
  --expiration-model KEY_MATERIAL_DOES_NOT_EXPIRE   # or DOES_EXPIRE + date
```

6. Verify

```bash
$ aws kms get-key-rotation-status --key-id $KEY_ID
# will be false (imported keys cannot auto-rotate)
```

**Testing**

**Debug Errors**
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name ImportedMaterial > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name ImportedMaterial
```
