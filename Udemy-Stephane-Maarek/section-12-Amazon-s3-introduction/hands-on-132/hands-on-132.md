# Lesson 130: S3 Hands On

### Description

This configuration creates an S3 bucket with a bucket policy.
The bucket policy allows read-only access to every one on the internet.

### Operation

**Deployment**  
Lint all template

```bash
$ cfn-lint S3PublicBucket.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3PublicBucket.yaml  --stack-name S3PublicBucket
```

**Testing**
Copy an object into the S3 bucket.

```bash
$ aws s3 cp object-access.png s3://simple-public-bucket-01-25
```

Now to access the publicly accessible object, first get to regional domain name from the RegionalDomainName output of the stack

```bash
$ aws cloudformation describe-stacks --stack-name S3PublicBucket --query "Stacks[0].Outputs" --no-cli-pager
```

Append the filename to the RegionalDomainName so that it looks something like this `simple-public-bucket-01-25.s3.eu-west-2.amazonaws.com/object-access.png`.  
Use this to access the public object from a browser.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3PublicBucket
```

**Cleanup**  
Delete all the content of the S3 Buckets

```bash
$ aws s3 rm s3://simple-public-bucket-01-25/ --recursive
```

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name S3PublicBucket
```
