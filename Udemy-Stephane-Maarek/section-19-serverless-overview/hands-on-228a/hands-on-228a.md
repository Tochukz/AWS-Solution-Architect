# Lesson 228: API Gateway Basics - Hands On

### Description

This example configures an API Gateway with a two Lambda functions as Backend APIs.  
The two Lambda function represents individual Microservices with base paths `/user-service` and `/order-service`.  
The API Gateway is supported with an Authorizer which authenticates all requests before they reach the microservices.

The solution is broken down into two stacks -

1. LambdaServices which configures all the Lambda functions which hold the microservices.
2. ApiGatewayHttp which configures the API Gateway and related resources

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

Use postman to run rude operation against the API Gateway endpoint targeting the microservices.

To the UserService Lambda function

```bash
aws lambda invoke --function-name UserServiceFunc --payload file://user-service-event.json --cli-binary-format raw-in-base64-out output.json
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name ApiGatewayHttp > events.json
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name ApiGatewayHttp
$ aws cloudformation delete-stack --stack-name LambdaServices
```
