# Lesson 304: SSM Parameter Store - Hands On

### Description

This configuration creates multiple parameters in the AWS Systems Manager (SSM) Parameter Store.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint SsmParameters.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SsmParameters.yaml  --stack-name SsmParameters --parameter-overrides file://private-parameters.json
```

**After Deployment**  
Parameters of type `SecureString` are not supported by AWS CloudFormation.  
Here is how to create Parameters of type `SecureString` using AWS CLI.

```bash
$ aws ssm put-parameter --name /my-app/staging/database-pass --value <your-db-passoword> --type SecureString
```

Use a custom key for better security

```bash
$ aws ssm put-parameter --name /my-app/prod/database-pass --value <your-db-passoword> --type SecureString --key-id <your-key-id>
```

We have used the KeyId from `hands-on-299`, _KmsKey stack_, in this command.

**More on custom keys**  
A custom KMS key provides better security than default KMS keys which are accessible to every user of your account.  
Custom keys are only accessible to users or role that have the proper IAM permission.  
For users/role to access any of the data encrypted by the custom key, they will need explicit IAM permission that give them access to that key.

**Testing**

1. Get parameters by listing their names

```bash
$ aws ssm get-parameters --name /my-app/dev/database-user  /my-app/staging/database-pass
```

2. To get the `SecureString` type parameter value decrypted (i.e the database-pass) in the output, use the `--with-decryption` flag

```bash
$ aws ssm get-parameters --name /my-app/dev/database-user  /my-app/staging/database-pass --with-decryption
```

3. To get the parameters by path (2 paths)

```bash
$ aws ssm get-parameters-by-path --path /my-app/dev
```

4. To get the parameters by path (1 paths)

```bash
$ aws ssm get-parameters-by-path --path /my-app --recursive
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Config > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SsmParameters
```
