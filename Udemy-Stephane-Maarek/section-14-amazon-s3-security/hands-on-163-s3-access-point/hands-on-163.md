# Lesson 163: S3 Access Points

### Description

S3 Access Point can be used to provide different levels of access to specific prefixes within an S3 bucket for different IAM user groups.  
For example, you can grant read/write permission for all objects with the prefix `/finance` to users that belongs to the Finance IAM groups while users that belong to the Sales IAM group is granted permission for all objects with the `/sales` prefix.

In this template we configure S3 Access Point for three groups with as follows
Group | Prefix | Policy Permission
----------|----------|-------------------
Finance | /finance | Read/Write
Sales | /sales | Read/Write
External | /finance <br> /sales | /finance -> Readonly, /sales -> Read/Write

S3 Access Point allows you to maintain a simple S3 bucket policy while granting advanced permission to various Users, Groups and Roles in your account.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint S3AccessPoints.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3AccessPoints.yaml  --stack-name S3AccessPoints --parameter-overrides file://private-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the AccessPoint Aliases and Role ARN from the Stack Outputs

```bash
$ aws cloudformation describe-stacks --stack-name S3AccessPoints --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Use the `FinanceAccessAlias` for the `FinanceAccessPoint` to upload a file to the S3 bucket.

```bash
$ aws s3 cp data/finance.txt s3://finance-access-cnyntz1epq3aanb1wzwx1wjdaikrkeuw2a-s3alias/finance/data.text --profile john
$ aws s3 ls s3://finance-access-cnyntz1epq3aanb1wzwx1wjdaikrkeuw2a-s3alias/finance/ --profile john
# John is a User assigned to the FinanceAccessPoint
# FinanceAccessPoint only permits access to the prefix - /finance
```

2. Use the `SalesAccessAlias` of the `SalesAccessPoint` to upload a file to the S3 bucket

```bash
$ aws s3 cp data/sales.txt s3://sales-access-qykjxcyeezq6kfp4ihcd199um9s7weuw2a-s3alias/sales/data.txt --profile peter
$ aws s3 ls s3://sales-access-qykjxcyeezq6kfp4ihcd199um9s7weuw2a-s3alias/sales/ --profile peter
# Peter is a User assigned to the SalesAccessPoint
# SalesAccessPoint only permits access to the prefix - /sales
```

3. User the external IAM User to access the `SalesAccessPoint` and `FinanceAccessPoint`

First the external IAM user needs to assume the role

```bash
$ aws sts assume-role --role-arn arn:aws:iam::<account-id>:role/ExternalRole --role-session-name Session1 --profile sovtechchucks
```

Use the credentials from the AssumeRole action result to set AWS Access Tokens as environment variables

```bash
# This should be done in a different terminal
$ export AWS_ACCESS_KEY_ID="xxxxxxxx"
$ export AWS_SECRET_ACCESS_KEY="xxxxxxxx"
$ eport AWS_SESSION_TOKEN="xxxxxxxxx"
# Test the exported access token
$ aws sts get-caller-identity --no-cli-pager
```

Now access the `SalesAccessPoint` and `FinanceAccessPoint`

```bash
# Listing the /finance objects
$ aws s3 ls s3://finance-access-cnyntz1epq3aanb1wzwx1wjdaikrkeuw2a-s3alias/finance/
# Listing the /sales objects
$ aws s3 ls s3://sales-access-qykjxcyeezq6kfp4ihcd199um9s7weuw2a-s3alias/sales/
# Copy file to the /sales prefix in SalesAccessPoint
$ aws s3 cp data/external.txt s3://sales-access-qykjxcyeezq6kfp4ihcd199um9s7weuw2a-s3alias/sales/external.txt
```

4. Try to access unpermitted access points to see if they fails

```bash
# Fails because the IAM user john is not assigned to SalesAccessPoint
$ aws s3 ls s3://sales-access-qykjxcyeezq6kfp4ihcd199um9s7weuw2a-s3alias/sales/ --profile john
# Fails because the SalesAccessPoint only permit the prefix /sales for ListBucket
$ aws s3 ls s3://sales-access-qykjxcyeezq6kfp4ihcd199um9s7weuw2a-s3alias/data/ --profile peter
# Fails because SalesAccessPoint permits PutObject action for the prefix /sales only
$ aws s3 cp data/sales.txt s3://sales-access-qykjxcyeezq6kfp4ihcd199um9s7weuw2a-s3alias/data/ --profile peter
# Fails because the external IAM User has Readonly access to the FinanceAccessPoint
$ aws s3 cp data/external.txt s3://finance-access-cnyntz1epq3aanb1wzwx1wjdaikrkeuw2a-s3alias/finance/external.text
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3AccessPoints > events.json
```

**Cleanup**  
Empty the bucket

```bash
$ aws s3 rm s3://simple-access-demo-13-04 --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3AccessPoints
```
