# Lesson 152: S3 Event Notifications - Hands On

### Description

S3 bucket uses Server-side encryption with Amazon S3 managed keys (SSE-S3) as default encryption type.
You can choice other encryption type like

- Server-side encryption with AWS Key Management Service keys (SSE-KMS)
- Server-side encryption with AWS Key Management Service keys (SSE-KMS)
- Server-side encryption wiht Customer provided keys (SSE-C)

Client Side Encryption is also another option to consider for S3 objects.

In this template we select SSE-KMS but instead of using our own KMS key,
we use AWS/S3 KMS Key to reduce encryption costs by lowering calls to AWS KMS.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint S3Encryption.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3Encryption.yaml  --stack-name S3Encryption
```

**Testing**
We have two buckets:

- first bucket (ss3-s3-enc-bucket-01-25) uses SSE-S3 encryption type
- second bucket (ss3-kms-enc-bucket-01-25) uses SSE-KMS encryption type

1. Upload a file normally to the first bucket

```bash
$ aws s3 cp  profile/developer.jpeg s3://ss3-s3-enc-bucket-01-25/developer.jpeg
```

Check on S3 console to see if the file is encrypted using the default encryption type i.e SSE-S3 .

2. Upload a file using `aws:kms` encryption type to override the default encryption type in the first bucket.

```bash
$ aws s3 cp profile/winner-ha.png s3://ss3-s3-enc-bucket-01-25/winner-ha.png --sse aws:kms
```

Check on S3 console to see if the file is encrypted using the SSE-KMS encryption type

3. Upload a file normally to the second bucket

```bash
$ aws s3 cp  profile/developer.jpeg s3://ss3-kms-enc-bucket-01-25/developer.jpeg
```

Check on S3 console to see if the file is encrypted using the default encryption type i.e SSE-KMS .

4. Upload a file using `AES256` encryption type to override the default encryption type in the second bucket.

```bash
$ aws s3 cp profile/winner-ha.png s3://ss3-kms-enc-bucket-01-25/winner-ha.png --sse AES256
```

Check on S3 console to see if the file is encrypted using the SSE-S3 encryption type

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3Encryption > events.json
```

**Cleanup**  
Delete all the objects in the buckets

```bash
$ aws s3 rm s3://ss3-s3-enc-bucket-01-25/ --recursive
$ aws s3 rm s3://ss3-kms-enc-bucket-01-25/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3Encryption
```
