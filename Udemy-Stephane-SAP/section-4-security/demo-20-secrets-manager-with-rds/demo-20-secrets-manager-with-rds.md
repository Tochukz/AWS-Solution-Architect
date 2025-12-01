# Lesson 20: Secrets Manager

## Demo 20: Secret Manager with RDS Instance

### Description

This example shows how to configure a password as a Secret using SecretsManager and to integrate the Secret with an RDS instance to be used as the RDS instance MasterPassword.  

When the Secret is rotated, the RDS instance MasterPassword is also updated.  

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
