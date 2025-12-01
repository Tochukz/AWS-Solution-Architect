# Lesson 27: S3 Access Points

## Demo 25: S3 Access Point VPC Origin

### Description
An EC2 instance in a VPC can access an S3 Bucket Access Point through an the Access Point VPC Origin.
To do this, we must create a VPC Endpoint in our VPC that allows us to connect to the _Access Point VPC Origin_.  
The VPC Endpoint Policy associated with the VPC Endpoint must allow access to the target S3 bucket and the Access Point. See the `vpc-endpoint-policy.json` document. 

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint Parameters.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SslOnEc2.yaml  --stack-name Parameters
```

**After Deployment**

Go the the Parameter Store Console > Select the Advanced Parameter (`/demo-29/username`) > Policies

**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Parameters > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Parameters
```
