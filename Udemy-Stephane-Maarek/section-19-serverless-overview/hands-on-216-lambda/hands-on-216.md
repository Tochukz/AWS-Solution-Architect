# Lesson 216: Lambda - Hands On

### Description

This template deploys a Lambda function with Python code.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Lambda.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Lambda.yaml  --stack-name Lambda --capabilities CAPABILITY_NAMED_IAM
```

**Testing**  
Invoke the Lambda function with a payload

```bash
$ aws lambda invoke --function-name DemoFunction --payload  file://payload.json --cli-binary-format raw-in-base64-out output.txt
```

Check the generated `output.txt` file to see the response returned by the Lambda function handler.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Lambda > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Lambda
```
