# Lesson 136: S3 Versioning - Hands On

### Description

This configuration enables versioning for an S3 bucket.  
Any object that was already in a bucket before versioning was enabled will have a version Id of null.

### Operation

**Deployment**  
Lint all template

```bash
$ cfn-lint S3Versioning.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3Versioning.yaml  --stack-name S3Versioning
```

**Testing**  
Copy a file into the bucket

```bash
$ aws s3 cp sample-files/introduction.txt s3://versioned-bucket-01-25/introduction.txt
```

Make changes to the file locally and then copy it again to the bucket.  
List all objects available in the bucket

```bash
$ aws s3api list-objects --bucket versioned-bucket-01-25 --prefix introduction.txt  --no-cli-pager
```

Now list the objects versions

```bash
$ aws s3api list-object-versions --bucket versioned-bucket-01-25 --prefix introduction.txt  --no-cli-pager
```

Note that I am using the key of the target object as prefix in other to limit the listing to that object alone.

Downloading the object the normal way will give you the latest version

```bash
$ aws s3 cp s3://versioned-bucket-01-25/introduction.txt current-introduction.txt
```

To get the older version, you download a specific version of the object using it's version Id.

```bash
$ aws s3api get-object --bucket versioned-bucket-01-25 --key introduction.txt --version-id kcR0r6p2A160Lo4k65.TXpqEFu7pvhhM old-introduction.txt
```

Deleting the object will create a delete marker and make the object no longer available
to normaly object listing using `list-objects` command.

```bash
$ aws s3 rm s3://versioned-bucket-01-25/introduction.txt
```

The object version will continue to available with the `list-object-versions` command.  
To restore the object again, delete the object of the delete marker using the version Id.

```bash
$ aws s3api delete-object --bucket versioned-bucket-01-25 --key introduction.txt --version-id 2vz5LYHul11TDhvW27onVNkTH1t.DbS0
```

The obect will not be available to `list-object` operation once again.

Now to delete the object completely, you need to delete all the version one-by-one using their version Id and then delete the _delete marker_.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3Versioning
```

**Cleanup**  
Delete all the versions of the object and any available delete merkers.

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name S3Versioning
```
