# Lambda Workspace

## For testing source code on Lambda

## Requirement

A Lambda configuration is needed that can accomodate an Express.JS workload.  
This can be used for testing or proof of concept for a ExpressJS workload in a Lambda environemnt.

## Operation

**Pre Deployment**

1. Update the CodeS3Bucket parameter the parameters.json file to your own bucket
2. Deploy your code to the bucket using the `deploy-code.sh` script.
3. You may want to comment out the `update-function-code`, `publish-layer-version` and `update-function-configuration` sections for the first deploy until after this configuration have been deployed

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaWorkSpace.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaWorkSpace.yaml --stack-name LambdaWorkSpace --parameter-overrides file://private-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the `FunctionUrl` from the stacks outputs

```bash
$ aws cloudformation describe-stacks --stack-name LambdaWorkSpace --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Vist the `FunctionUrl` to access the application

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaWorkSpace
```
