# Web Application Firewall for Application Load Balancer

## Requirement

I need to demostrate how an application can access AWS ElasticCache Redis Instance.  
The application is in a Lambda function which is in a private subnet in a custom VPC and the Redis Instance is also in the same VPC.   
We setup a security group that provides access to the security group associated with the Redis Group / Redis Cluster.    
Two applications are configured in different Lambda functions to demonstrate two different scenerios: 
1. A simple NodeJS application is used to read and write to the Redis instance - `NodeInLambda.yaml` 
2. A simple NestJS application is configured to use Redis Instance for it's implementation of a Rate Limiting. The Rate Limiting implementation used Redis to monitor it's state. - `NestInLambda.yaml`  

## Operation

**Pre Deployment**  

Zip Lambda code and send to S3 bucket for both applications
```
$ ./deploy-node-app.sh
$ ./deploy-nest-app.sh
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint NodeInLambda.yaml
$ cfn-lint NestInLambda.yaml
```

Deploy the LambdaInVpc stacks

```bash
$ aws cloudformation deploy --template-file NodeInLambda.yaml --stack-name NodeInLambda --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://private-parameters.json
```

```bash
$ aws cloudformation deploy --template-file NestInLambda.yaml --stack-name NestInLambda --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://secret-parameters.json
```

**After Deployment**  
Get the Lambda endpoint for the `NestInLambda` stack
```bash
$ aws cloudformation describe-stacks --stack-name NestInLambda --query "Stacks[0].Outputs" --no-cli-pager
```
**Testing**  
Go the the Lambda Console to test the `NodeInLambdaFunc`.  
Use the following payload to write
```json
{
    "action": "write",
    "key": "testKey1",
    "value": "testValue",
    "expiry": 3600
}
```
To read 
```json
{
    "action": "read",
    "key": "testKey1"
}
```

To test the `NestInLambdaFunc`, send a post request to the `login/` endpoint.  

**Clean up**

Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name NodeInLambda
$ aws cloudformation delete-stack --stack-name NestInLambda
```
