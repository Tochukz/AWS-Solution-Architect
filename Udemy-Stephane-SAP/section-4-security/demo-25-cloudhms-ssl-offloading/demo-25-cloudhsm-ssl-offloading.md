# Lesson 25: Solutions Architect - SSL on ELB

## Demo 25: CloudHSM SSL Offloading

### Description
You can offloading SSL encryption/decryption from you EC2 instances to CloudHSM using _SSL Acceleration_.  
This is supported by _Nginx_, _Apache Server_ and _IIS_.  
It provides an extra layer of security as the SSL key never leaves the HSM device. 

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
