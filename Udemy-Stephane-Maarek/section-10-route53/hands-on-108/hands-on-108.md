# Lesson 108: Route 53 - Alias

### Description

This configuration creates a Route 53 Alias record.
Alias records are unique to Route 53.  
Alias can use used to map a hostname to the hostname of an AWS service as such

- Elastic Load Balancers
- Amazon CloudFront
- Amazone API Gateway
- Elastic Beanstalk
- S3 Website
- VPC Interface Endpoint
- Global Accelerator
- Route 53 Record (same hosted zone)

Note that Alias record can not be used to target EC2 DNS name.

In this configuration, our Alias record will map to an S3 Website as it's target.

Alias record are free!

### Operation

**Deployment**

Lint the template

```bash
$ cfn-lint Route53AliasDemo.yaml
```

Deploy the stack

```bash

$ aws cloudformation deploy --stack-name Route53AliasDemo --template-file Route53AliasDemo.yaml \
```

After deployment, copy the website assets into the S3 bucket

```bash
$ aws s3 sync site s3://website.goodguys.click
```

**Testing**
After the successful deployment of the stack, the S3 website shoulda be accessible not only through the S3 endpoit but also through the _DomainName_ value used for the _DomainName_ parameter. i.e The site can be access at http://website.goodguys.click .

**Debug Errors**
In the case of error during deployment, checkout the stack events leading to the failure

```bash
$ aws cloudformation describe-stack-events --stack-name Route53AliasDemo
```

**Cleanup**
To delete the stack

```
$ aws cloudformation delete-stack --stack-name Route53AliasDemo
```

**Useful Command**
