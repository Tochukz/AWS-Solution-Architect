# Lesson 228: API Gateway Basics - Hands On

### Description

This template configures an API Gateway with a Lambda function backend.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaServices.yaml
$ cfn-lint ApiGatewayHttp.yaml
```

1. Deploy the `LambdaServices` stack

```bash
$ aws cloudformation deploy --template-file LambdaServices.yaml  --stack-name LambdaServices  --parameter-overrides file://secret-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

2. Deploy the `ApiGatewayHttp` stack

```bash
$ aws cloudformation deploy --template-file ApiGatewayHttp.yaml  --stack-name ApiGatewayHttp
```

**Testing**
Get the API Gateway endpoint from stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name ApiGatewayHttp --query "Stacks[0].Outputs" --no-cli-pager
```

To test the Lambda function

```bash
$ aws lambda invoke --function-name BasicFunc  --cli-binary-format raw-in-base64-out output.json
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name ApiGatewayHttp > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name ApiGatewayHttp
```
