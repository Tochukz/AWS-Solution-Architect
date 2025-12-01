# Lesson 20: Secrets Manager

## Demo 20: Cross Account Secret Share

### Description

This example shows how a secret can be shared across two AWS accounts.  
To do so, we need to set the resources based policies of the SecretsManager Secrets and it's associated KMS Key:

- KMS Policy: Must allow `kms:Decrypt` on condition of `"kms:ViaService": "secretsmanager.{region}.amazonaws.com"` for the other account
- Secrets Manager Policy: Must allow `secretsmanager:GetSecretValue` for the other account


### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint Parameters.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Parameters.yaml  --stack-name Parameters
```

**After Deployment**

Go the the Parameter Store Console > Select the Advanced Parameter (`/demo-29/username`) > Policies

**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Parameters > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Parameters
```
