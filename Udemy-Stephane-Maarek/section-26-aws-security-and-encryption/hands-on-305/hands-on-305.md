# Lesson 305: SSM Parameter Store with Lambda - Hands On

### Description

This configuration configures a Lambda that fetch parameters from the SSM Parameter Store.

Take note that the parameters we access in this configuration were put in SSM parameter store in `hands-on-304`.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint SsmLambda.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SsmLambda.yaml  --stack-name SsmLambda --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://parameters.json
```

**After Deployment**

**Testing**
Test the Lambda function by going to the Lambda Console, select the _SimpleSsmFunc_ and click the Test button on the Test tab.  
Alternatively, we can use the AWS CLI

```bash
$ aws lambda invoke --function-name SimpleSsmFunc output.json
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name SsmLambda > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SsmLambda
```
