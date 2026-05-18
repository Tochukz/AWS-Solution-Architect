# Web Application Firewall for Application Load Balancer

## Requirement

Configure a Lambda function in a Private Subnet with Access to Redis Cluster

## Operation

**Pre Deployment**  

Zip Lambda code and send to S3 bucket
```
$ ./deploy-code.sh
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaInVpc.yaml
```

Deploy the LambdaInVpc stack

```bash
$ aws cloudformation deploy --template-file LambdaInVpc.yaml --stack-name LambdaInVpc --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://private-parameters.json
```


**After Deployment**

**Testing**

**Clean up**

Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name LambdaInVpc
```
