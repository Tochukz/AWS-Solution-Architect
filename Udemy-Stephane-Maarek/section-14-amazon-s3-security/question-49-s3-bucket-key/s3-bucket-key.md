# Question 49: S3 Bucket Key

### Description

This configuration implements the answer to the problem described in `question-49.md`.    

A company has a S3 bucket which is configured with AWS SSE-KMS as the default encryption. This lead to a rising cost for AWS KMS as the company users frequently access object in the bucket.   
To manage the cost we must enable S3 bucket Key for the S3 bucket so that S3 uses the bucket key to generate data key to encrypt each new object and not having to make request to KMS Service for encryption key each time.  

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
Got the the S3 Console > Select the bucket > Properties tab.  
Under the _Default encryption_ section, you should see that the _Bucket Key_ is enabled.

**Testing**

1. Copy an object to the bucket and specify SSE-S3 encryption for the object encryption option.

```bash
$ aws s3 cp test-file.txt s3://simple-secure-bucket-2111/ --sse AES256
```

This should fail because the Bucket policy Denies PutObject request when encryption Option of the request is not explicitly AWS SS3-KMS encryption.

2. Try copying the object without specifying an encryption option

```bash
$ aws s3 cp test-file.txt s3://simple-secure-bucket-2111/
```

This should also fail for the same reason.

3. Now copy the same object and specify SSE-KMS for the encryption

```bash
$ aws s3 cp test-file.txt s3://simple-secure-bucket-2111/ --sse aws:kms
```

This should work.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3BucketKey > events.json
```

**Cleanup**  
Empty all the bucket

```bash
$ aws s3 rm s3://simple-secure-bucket-2111/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3BucketKey
```
