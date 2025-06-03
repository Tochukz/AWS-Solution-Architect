# Lesson 166: CloudFront with S3 - Hands on

### Description

This template configures a CloudFront distribution with an S3 origin server.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint CloudFront.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CloudFront.yaml  --stack-name CloudFront
```

**After Deployment**  
Copy the assets to the S3 Bucket for the origin server

```bash
$ aws s3 sync website s3://origin-bucket-01-25
```

**Testing**
Get the CloudFront Distribution domain name from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name CloudFront --query "Stacks[0].Outputs" --no-cli-pager
```

Use the domain name to test the distribution on a Browser.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name CloudFront > events.json
```

**Cleanup**  
Delete all the objects in the buckets

```bash
$ aws s3 rm s3://origin-bucket-01-25/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CloudFront
```
