# Question 52: S3 Bucket Analytics

### Description

This configuration implements the answer to the problem described in `question-52.md` bu configuring S3 Analytics for two S3 buckets.

S3 Storage Class Analysis (often called S3 Analytics) helps you understand when objects in your bucket become infrequently accessed, so you can automatically transition them to cheaper classes like S3 Standard-IA or S3 Glacier.

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

### Learn More

✅ 1. What S3 Storage Class Analysis Does
S3 analyzes access patterns over time and tells you:

- Which prefixes/objects are frequently vs infrequently accessed
- When objects become cold
- When to transition objects to cheaper storage (e.g., Standard-IA)

It produces recommendations you can use in your lifecycle policies.

**Important:**  
S3 Storage Class Analysis does NOT automatically move objects.
You create the lifecycle rule separately using its findings.

AWS will begin analyzing object access patterns after S3 Storage Class Analysis is enabled.  
Full recommendations typically take 24–48+ hours.
