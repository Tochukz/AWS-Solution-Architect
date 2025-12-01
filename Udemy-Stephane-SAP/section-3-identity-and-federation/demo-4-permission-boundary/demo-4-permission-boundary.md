# Lesson 4: IAM

# Demo-4: Permission Boundary

### Description
This example configures a permission boundary and apply it to a role.  
A permissions boundary is an IAM policy that defines the maximum permissions an IAM user or role can have.  
Even if a user’s inline or attached policies grant broader access, the permissions boundary restricts them to only what’s allowed by the boundary.  
Effective permissions = intersection of (user’s policies) AND (permissions boundary).

Permission Boundary can only be applied to IAM users and Roles (not groups).

In this example we configure a permission boundary and apply it to a User.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint PermissionBoundary.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file PermissionBoundary.yaml  --stack-name PermissionBoundary --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**
Get the PublicIP for the EC2 instance from the output

```bash
$ aws cloudformation describe-stacks --stack-name PermissionBoundary --query "Stacks[0].Outputs"
```

**Testing**

1. SSH into the EC2 instance

```bash
$ ssh -i <your-key-pair.pem> ec2-user@<PublicIP>
```

2. List the S3 buckets and then create a new S3 bucket

```bash
# should work
$ aws s3 ls
# should fail - Access Denied
$ aws s3 mb s3://simple-bucket-1310
```

3. Try to describe EC2 instances and to create a new instance

```bash
# should work
$ aws ec2 describe-instances
# should fail - UnauthorizedOperation
$ aws ec2 run-instances --image-id ami-04ba8620fc44e2264  --instance-type t2.micro
```

4. Summary:
   - The role has two broad policies attached (AmazonS3FullAccess and AmazonEC2FullAccess)
   - But the permission boundary restricts the effective permissions to only listing S3 buckets and describing EC2 instances

**Debug Errors**
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name PermissionBoundary > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name PermissionBoundary
```
