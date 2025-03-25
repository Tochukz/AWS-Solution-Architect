# Lesson 299: KMS - Hands On

### Description

This configuration creates a Customer Managed KMS key.  
We then use the Key to encrypt and decrypt a file.

You can use symmetric encryption KMS keys to encrypt and decrypt small amounts of data,
but they are more commonly used to generate data keys and data key pairs.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint KmsKey.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file KmsKey.yaml  --stack-name KmsKey
```

**After Deployment**
Get the KMS KeyId from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name KmsKey --query "Stacks[0].Outpus" --no-cli-pager
```

**Testing**

1. Encrypt a file using KMS key

```bash
$ aws kms encrypt --key-id xxxx-xxxx-xxxx --plaintext fileb://sample-secret.txt --output text --query CiphertextBlob | base64 --decode > sample-secret-encrypted
```

This uses the `base64` utility to _decode_ the extracted output.  
This utility decodes the extracted ciphertext to binary data.
This is because the _ciphertext_ that is returned by a successful encrypt command is base64-encoded text.

2. Decrypt the encrypted file using the KMS key.

```bash
$ aws kms decrypt --ciphertext-blob fileb://sample-secret-encrypted --output text --query Plaintext | base64 --decode > sample-secret-copy.txt
```

This used the `base64` utility to decode the extracted plaintext to binary data.  
The plaintext that is returned by a successful decrypt command is base64-encoded text.  
So it must be decoded to obtain the original plaintext.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Config > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name KmsKey
```
