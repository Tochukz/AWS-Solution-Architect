# Extra-11.1 - Multi-stage HTTP API

### Description

This Extra build on `hol-181-http-api`.  
Here we have removed the S3 Static website resource but the HTTP API and Lambda Integration remains in place.  
We have also modified the HTTP API to support multiple stages - development, uat and production

### Operation

**Before deployment**

**Deployment**

Lint the template

```bash
$ cfn-lint MultiStageApi.yaml
```

Deploy the stack for `development` stage

```bash
$ aws cloudformation deploy --template-file MultiStageApi.yaml --stack-name MultiStageApiDev  --capabilities CAPABILITY_NAMED_IAM --parameter-override StageName=development
```

You can create a seperate stack similarly for `production` stage by supplying `production` for the `StageName` parameter.

**After deployment**

Get the `ApiEndpoint` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name MultiStageApiDev --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Test the Lambda Function  
   Login to the Lambda Console and create a _Test Event_ using this _Event JSON_

```json
{
  "queryStringParameters": {
    "operation": "add",
    "num1": 10,
    "num2": 10
  }
}
```

Run the test event and you should get the following result

```json
{
  "statusCode": 200,
  "body": "The result is 20.0"
}
```

Alternatively, you may invoke the Lambda using AWS CLI

```bash
$ aws lambda invoke --function-name SimpleFunc08 --payload file://add-operation.json --cli-binary-format raw-in-base64-out output.json
```

Check the `output.json` file for the result.

2. Test the HTTP API  
   Make a CURL request to the API endpoint calculator route

```bash
curl "https://75mij275a7.execute-api.eu-west-2.amazonaws.com/development/calculator?operation=add&num1=10&num2=10"
```

This should return the result `"The result is 20.0"% `.

If there is an error, check the API Stage's AccessLogs' LogGroup `/aws/apigateway/SimpleHttpApi/access-logs` in the CloudWatch Console.

**Cleanup**  
Empty the S3 bucket

```bash
$ aws s3 rm s3://website-bucket-08-05 --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name MultiStageApiDev
```
