# Lesson 285: Amazon Config - Hands On

### Description

To enable AWS Config, you must create a configuration recorder and a delivery channel.

**Resource Explorer**  
The resource explorer is a quick way to tell how many resources are deployed in your AWS account.  
The `ResourceExplorer.yaml` template creates a stack to enable AWS Resource Explorer. See [`resource-explorer.md`](./resource-explorer.md) to learn more.

**Pricing**  
To estimate the cost of evaluation of all our resources, we first need to know how many resource that we have. See `Resource Explorer` section above.  
With the number of resource, you ca use the _AWS Config Calculator_ to calculate the code of evaluation of all you resources.
For example, at $0.003 per resource continues evaluation, and for 75 resource, that give you $0.225.

[AWS Config Calculator](https://calculator.aws/#/createCalculator/Config)  
[AWS Config Pricing](https://aws.amazon.com/config/pricing/)

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint NonCompliant.yaml
$ cfn-lint Config.yaml
```

1. Deploy the `NonCompliant` stack

```bash
$ aws cloudformation deploy --template-file NonCompliant.yaml  --stack-name NonCompliant
```

2. Deploy the `Config` stack

```bash
$ aws cloudformation deploy --template-file Config.yaml  --stack-name Config --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Config > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To stop the recorder without deleting it, call the `StopConfigurationRecorder` action of the AWS Config API directly.

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name NonCompliant
$ aws cloudformation delete-stack --stack-name Config
```
