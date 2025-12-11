# Lesson 68: AWS Local Zones

## Demo 68: AWS Local Zones

### Description

The example shows how to deploy an EC2 instance to a Local Zone.  
AWS Local host allows us to place compute, storage, database and other selected AWS services closer
to end users.

In this case we deploy an EC2 instance in the Cape Town region, `af-south-1` and the _Nigeria (Lagos)_ Local Zone.  
I have already enabled the but I need to enable the _Lagos_ local zone to proceed.

### Operation

**Before Deployment**  
To Enable the _Lagos_ local zone.

- Go to EC2 Console, Select the Cape Town Region.
- Click on Dashboard menu > under \_Account attribute, click Zones
- Select the _Nigeria (Lagos)_ zone, > Action > Opt in
- Wait a few minute for the local zone to be enabled.

**Deployment**  
Lint the template

```bash
$ cfn-lint LocalZone.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LocalZone.yaml  --stack-name LocalZone --parameter-overrides file://private-parameters.json --region af-south-1
```

**After Deployment**
Get the `PublicIp` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name LocalZone --region af-south-1 --query "Stacks[0].Outputs" --region af-south-1 --no-cli-pager
```

**Testing**

1. Use the Public IP to access the server over a Browser
2. Go the the EC2 Console, in Cape Town Region to evaludate the instance and its placement in the _Lagos_ local zone.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name LocalZone > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LocalZone --region af-south-1
```
