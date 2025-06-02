# Lesson 130: S3 Hands On

### Description

This configuration creates an S3 bucket with Server Server Encryption enabled.
The Server Side Encryption uses the Amazon S3 Managed Key - (SSE-S3).
Other alternative will be to use the Key Management Service Keys - (SS3-KMS).

### Operation

**Deployment**  
Lint all template

```bash
$ cfn-lint S3Bucket.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3Bucket.yaml  --stack-name S3Bucket
```

**Testing**
Copy an object into the S3 bucket.

```bash
$ aws s3 cp about-s3.png s3://simple-demo-bucket-01-25
```

List all objects in the S3 bucket

```bash
$ aws s3 ls s3://simple-demo-bucket-01-25
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3Bucket
```

**Cleanup**  
Delete all the content of the S3 Buckets

```bash
$ aws s3 rm s3://simple-demo-bucket-01-25/ --recursive
```

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name S3Bucket
```
