# Lambda Workspace

## For testing source code on Lambda

## Requirement

## Operation

**Pre Deployment**  


**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaWorkSpace.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaWorkSpace.yaml --stack-name LambdaWorkSpace parameter-overrides parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**
Get the PublicIP from the stacks outputs

```bash
$ aws cloudformation describe-stacks --stack-name LambdaWorkSpace --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaWorkSpace
```
