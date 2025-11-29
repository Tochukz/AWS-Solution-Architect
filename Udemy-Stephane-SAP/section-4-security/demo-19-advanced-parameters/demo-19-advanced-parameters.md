# Lesson 19: Parameter Store

## Demo 19: Basic and Advanced Parameters

### Description

This example configures a Basic Parameter and an Advanced Parameter.  
A Basic Parameter does not support a Parameter Policy but an Advanced Parameter does, and so we configure a Parameter Policy for the Advanced Parameter.
The Advanced Parameter have a 3 Policies:

- Expiration - deletes the parameter on set date in the future
- Notification - notifies EventBridge 7 days before Expiration
- Notification - notified EventBridge 5 days after parameter value remains unchanged

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
