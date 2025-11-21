# Question 49: S3 Bucket Key

### Description

This configuration implements the answer to the problem described in `question-49.md`.  
The solution to manage the increasing cost of AWS KMS request for a S3 bucket, which is configured with SSE-KMS, is to enable S3 Bucket Keys for server-side encryption with AWS KMS.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint S3BucketKey.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3BucketKey.yaml  --stack-name S3BucketKey
```

**After Deployment**

**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3BucketKey > events.json
```

**Cleanup**  
Delete all the objects in the buckets

```bash
$ aws s3 rm s3://cors-disabled-bucket-01-25/ --recursive
$ aws s3 rm s3://cors-enabled-bucket-01-25/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3BucketKey
```
