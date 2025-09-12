# Scheduled RDS Instance Start/Stop

## Requirement

Create a configuration that starts a RDS instance at 7:00 UTC and shuts it down at 23:00 UTC

## Operation

**Pre Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint ScheduledDbStart.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file ScheduledDbStart.yaml --stack-name ScheduledDbStart --parameter-overrides file://private-parameters.json --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**  
Vist the `FunctionUrl` to access the application

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name ScheduledDbStart
```
