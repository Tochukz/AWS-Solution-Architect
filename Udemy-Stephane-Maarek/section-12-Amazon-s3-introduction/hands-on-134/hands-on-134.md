# Lesson 134: S3 Website Hands On

### Description

This configuration enables an S3 bucket for Static Website Hosting.

### Operation

**Deployment**  
Lint all template

```bash
$ cfn-lint S3Website.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3Website.yaml  --stack-name S3Website
```

**Testing**
Copy the website assets to the S3 bucket

```bash
$ aws s3 sync website s3://website-bucket-01-25
```

Get the website URL

```bash
$ aws cloudformation describe-stacks --stack-name S3Website --query "Stacks[0].Outputs" --no-cli-pager
```

Visit the website using the WebsiteUrl on a browser

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3Website
```

**Cleanup**  
Delete all the content of the S3 Buckets

```bash
$ aws s3 rm s3://website-bucket-01-25/ --recursive
```

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name S3Website
```
