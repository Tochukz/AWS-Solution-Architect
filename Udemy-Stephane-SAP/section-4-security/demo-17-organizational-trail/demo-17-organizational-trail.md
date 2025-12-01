# Lesson 17: CloudTrail Solution Architect Pro

## Demo 17: Organizational Trail

### Description

This solution configures a CloudTrail trail that monitors the API calls from multiple _Organizational Units_ in the same _AWS Organization_.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint OrganizationalTrail.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file OrganizationalTrail.yaml  --stack-name OrganizationalTrail --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**
Get the PublicIP for the EC2 instance from the output

```bash
$ aws cloudformation describe-stacks --stack-name OrganizationalTrail --query "Stacks[0].Outputs"
```

**Testing**


**Debug Errors**
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name OrganizationalTrail > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name OrganizationalTrail
```
