# Lesson 307: AWS Secrets Manager - Hands On

### Description

The configuration creates a Secret in SecretsManager and then uses the Secret for Master Username and Password for a RDS instance.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint SecretsManager.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SecretsManager.yaml  --stack-name SecretsManager
```

**After Deployment**  
Get the `SecretArn` and `DbEndpoint` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name SecretsManager --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Get the Secret value from the Secret Manager using the Secret ARN

```bash
$ aws secretsmanager get-secret-value --secret-id <your-secrets-arn> --no-cli-pager
```

Use the username and password to login to the database using a Database Client such as MySQL WorkBranch.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Config > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SecretsManager
```

### Learning more

In the template you see the use of the syntax

```yaml
!Sub "{{resolve:secretsmanager:${SimpleDbSecrets}::username}}"
```

for the `MasterUsername` and `MasterUserPassword` parameters in the `AWS::RDS::DBInstance` resource.  
**What It Does**  
`!Sub`: A CloudFormation intrinsic function that substitutes variables in a string.

In this case, it replaces ${SimpleDbSecrets} with the actual ARN of the Secrets Manager secret.

`{{resolve:secretsmanager:...}}`: A special CloudFormation syntax for dynamically resolving secrets at deployment time.

It tells CloudFormation: _"Fetch this value from Secrets Manager when creating/updating the stack."_

`${SimpleDbSecrets}::password`:

`${SimpleDbSecrets}`: Refers to the logical ID of the `AWS::SecretsManager::Secret` resource in the template.

`::password`: Specifies which key to retrieve from the secret's JSON structure (in this case, the auto-generated password field).

**Alternative Syntax**  
An alternative approach is the use the set the `ManageMasterUserPassword` property of the `AWS::RDS::DBInstance` to true and then set the `MasterUserSecret` property also.  
With this approach you can omit the `MasterUsername` and `MasterUserPassword` so that the RDS instance manages them using the SecretsManager.  
See the example in the [CloudFormation docs for RDS](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbinstance.html)
