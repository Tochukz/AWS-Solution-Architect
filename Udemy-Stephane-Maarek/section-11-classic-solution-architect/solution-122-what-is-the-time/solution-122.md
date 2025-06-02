# Solution 122: WhatsTheTime.com

## Requirement

This solution is for the WhatIsTheTime.com application.  
The requirements are as follows:

1. whatisthetime.com allows people to know what time it is
2. No database is needed
3. The application should be fully scalable, vertically and horizontally with no downtime

## Solution

The application will be hosted on EC2 instances grouped into a Target group and managed by an Auto Scaling group.  
An Application Load Balancer will be used to push traffic evenly into the EC2 instances.  
A scaling policy in configured that scales out when the average CPU Utilization of the EC2 instances reaches 50%.  
A Route53 Alias Record will be created to provide custom subdomain as alternative Hostname which links to the Application Load Balancer.  
The Application Loas Balancer's Listerner is equiped with an ACM certificate to enable SSL for the subdomain.

## Operation

**Pre-deploymnet**  
Create ACM certificate for your domain if you don't not already have one

```bash
$ aws acm request-certificate --domain-name "*.goodguys.click" --validation-method DNS
```

Copy the _CertificateArn_ from the result.

Now get the certificate record to be used for CNAME creation.

```bash
$ aws acm describe-certificate --certificate-arn <CertificateArn> --query "Certificate.DomainValidationOptions[0].ResourceRecord" --no-cli-pager
```

Use the record to create a CNAME in your DNS settings with the Hostname or Record name being the _Name_ e.g (`_caee9f8ec9f7eb3aa1c69af1d0f76c78.example.com.`), after removing the `.example.com` part of it.
And the value will be the _Value_ without removing anything from it.

Use the certificate ARN for the `CertificateArn` parameter in the template.

You need to wait for the Certificate to be issued before you can deploy the stack. This could take between a few minutes or up to an hour.

To check if the certificate has been issues

```bash
$  aws acm describe-certificate --certificate-arn <CertificateArn> --query "Certificate.Status"
```

This should return the string `ISSUED` if the certificate request was successfull.

**Deployment**  
Lint the templates

```bash
$ cfn-lint WittNetwork.yaml
$ cfn-lint WittCompute.yaml
```

1. Deploy the Network stack

```bash
$ aws cloudformation deploy --template-file WittNetwork.yaml --stack-name WittNetwork
```

2. After the Network stack is successfully deployed, deploy the Compute stack

```bash
4 aws cloudformation deploy --template-file WittCompute.yaml --stack-name WittCompute
```

**After Deployment**  
Get the Hostname from the outputs

```bash
$ aws cloudformation describe-stacks --stack-name WittCompute --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Use the hostname to access the application on a Browser

2. Terminate the runnig EC2 instance of the Auto Scaling Group

```bash
$ aws ec2 terminate-instances --instance-id i-0f681db04ac7c3361
```

A new instance will be launched by the Auto Scaling Group.

3. Try to load the server so that the Average CPU Utilization for the running instance exceeds 50%.

**Clean up**  
Delete all stacks but the Compute stack first

```bash
$ aws cloudformation delete-stack --stack-name WittCompute
$ aws cloudformation delete-stack --stack-name WittNetwork
```
