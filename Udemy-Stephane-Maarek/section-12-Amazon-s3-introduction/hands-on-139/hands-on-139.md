# Lesson 139: S3 Replication - Hands On

### Description

This template configures cross regional replication from one S3 source bucket to another S3 destination bucket.  
Any already existing objects in the source bucket before replication was configured can
only be replicated using _S3 Batch Replication_.
Replication can be done from one source bucket to multiple destination buckets.

Normal delete operation are replicated from source to target using the delete merker.  
Deletion done with version Id are not replicated to avoid malicious delete.

There can be no chaining of replication.  
If bucket 1 is replicated to bucket 2 and bucket 2 is replicated into bucket 3, objects created in bucket 1
will not be replicated to bucket 3.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint DestinationBucket.yaml
$ cfn-lint S3Replication.yaml
```

There are two stacks to be deployed.

1. Deploy the stack with the destination bucket or replica to eu-west-1.

```bash
$ aws cloudformation deploy --template-file DestinationBucket.yaml  --stack-name DestinationBucket --region eu-west-1
```

2. Get the stack outputs and copy the DestinationBucketArn value to the `parameters.json` file.

```bash
$ aws cloudformation describe-stacks --stack-name DestinationBucket --query "Stacks[0].Outputs" --region eu-west-1 --no-cli-pager
```

3. Deploy the stack with the source bucket and replication configuration to eu-west-2

```bash
$ aws cloudformation deploy --template-file S3Replication.yaml  --stack-name S3Replication --parameter-overrides file://parameters.json --capabilities CAPABILITY_NAMED_IAM --region eu-west-2
```

**Testing**  
Copy a file into the source bucket

```bash
$ aws s3 cp sample-files/introduction.txt s3://source-bucket-01-25/introduction.txt --region eu-west-2
```

Updated the file locally and copy it to the source bucket again.

Wait for a minute and then check if the file is present in the destination bucket

```bash
$ aws s3api list-object-versions --bucket destination-bucket-01-25 --prefix introduction.txt  --no-cli-pager --region eu-west-1
```

Delete the file in the source bucket and check if the delete marker is replicated in the destination bucket.

```bash
$ aws s3 rm s3://source-bucket-01-25/introduction.txt --region eu-west-2
$ aws s3api list-object-versions --bucket destination-bucket-01-25 --prefix introduction.txt  --no-cli-pager --region eu-west-1
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3Replication
```

**Cleanup**  
Do a hard delete on the objects i.e delete using the version-id

```bash
# list the objects to get their version Ids
$ aws s3api list-object-versions --bucket source-bucket-01-25 --prefix introduction.txt  --no-cli-pager --region eu-west-2
# Delete each object using their version Id
$ aws s3api delete-object --bucket source-bucket-01-25 --key introduction.txt --version-id 2mKn4OeI87X1wYRq3vM3aOBusCJJNfTD --region eu-west-2
```

Do the same thing for the destination bucket.

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name S3Replication --region eu-west-2
$ aws cloudformation delete-stack --stack-name DestinationBucket --region eu-west-1
```
