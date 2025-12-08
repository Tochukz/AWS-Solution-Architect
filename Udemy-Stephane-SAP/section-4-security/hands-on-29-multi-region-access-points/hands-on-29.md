# Lesson 29: Multi-region Access Points - Hands On

### Description

Here we configure a Multi-Region Acess Point MRAP.  
MRAP = Global endpoint + Adaptive routing
MRAP gives you:

- A single global S3 endpoint
- Latency-based routing
- Automatic failover
- Zonal / regional resilience

**Note**
The Multi-region access point must be deployed in the home region or S3 Control Plane which is usually `us-east-1` unless changed.  
All the buckets may be deployed to any other bucket.

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
