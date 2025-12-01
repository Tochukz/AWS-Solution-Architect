# Lesson 25: Solutions Architect - SSL on ELB

## Demo 25: SSL on EC2 Instances

### Description

This solution includes a NLB that forwards traffic to EC2 instances using the HTTPS protocol. For the EC2 instances to process HTTPS request, they need to have SSL configured.
For this to work, we need to retrieve the SSL certificates from a ParameterStore Parameter using the EC2 UserData as boot time and load them on the EC2 instances.  
The EC2 instances need an appropriate IAM role to grant the necessary permission to access the required services/resource.

__Performance Set Back__
Performing SSL encryption/decryption on EC2 instances can use up valuable CPU resources.  

__Security Consideration__  
If an unauthorized person SSH into your EC2 instances they can get access to the SSL certificates.

__Alternative Approach__   
The address the performance and security concern outlines above, an alternative solution is to use CloudHSM to do the SSL offloading.  Checkout `demo-25-cloudhsm-ssl-offloading` for details.

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
