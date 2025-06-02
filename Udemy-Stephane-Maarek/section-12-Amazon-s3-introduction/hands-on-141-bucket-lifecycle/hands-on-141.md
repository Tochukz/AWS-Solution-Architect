# Lesson 141: S3 Storage Class - Hands On

### Description

This template sets up a Life Cycle Configuration for a S3 bucket.
A Life Cycle Configuration specify the rules that determines how objects are
automatically moved from one storage class to aother over time.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint S3LifeCycle.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3LifeCycle.yaml  --stack-name S3LifeCycle
```

**Testing**
By default when you PUT an object in a S3 bucket, it goes to the _STANDARD_ storage class.
However, you can specify the storage class you want the object to go into by using the _storage-class_ option

```bash
$ aws s3 cp sample-files/sap-score.txt s3://lifecycle-bucket-01-25/reports/sap-score.txt
$ aws s3 cp sample-files/saa-score.txt s3://lifecycle-bucket-01-25/reports/saa-score.txt --storage-class ONEZONE_IA
$ aws s3 cp sample-files/sda-score.txt s3://lifecycle-bucket-01-25/reports/sda-score.txt --storage-class STANDARD_IA
```

Now list the objects to see what storage class each object lives in

```bash
$ aws s3api list-objects --bucket lifecycle-bucket-01-25 --no-cli-pager
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3LifeCycle
```

**Cleanup**  
Delete all the objects in the bucket

```bash
$ aws s3 rm s3://lifecycle-bucket-01-25/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3LifeCycle
```
