# Lesson 107: Route 53 - TTL

### Description

This configuration creates an A-type record in an existing Route53 hosted zone.
The record map a hostname to an EC2 instance public IP which is also provisioned in this template.

### Operation

**Deployment**

Lint the template

```bash
$ cfn-lint Route53ADemo.yaml
```

Deploy the stack

```bash

$ aws cloudformation deploy --stack-name Route53ADemo --template-file Route53ADemo.yaml \
```

**Testing**
After the successful deployment of the stack, the Nginx Server in the EC2 instance should be accessible not only through the public IP but also through the _DomainName_ value used for the _DomainName_ parameter. i.e The site can be access at http://nginx.goodguys.click .

**Debug Errors**
In the case of error during deployment, checkout the stack events leading to the failure

```bash
$ aws cloudformation describe-stack-events --stack-name Route53ADemo
```

**Cleanup**
To delete the stack

```
$ aws cloudformation delete-stack --stack-name Route53ADemo
```

**Useful Command**
You can use the `nslookup` or `dig` utility tools to probe the details of a domain name

```bash
$ nslookup nginx.goodguys.click
```

It will tell you about the Server IP associated with the domain name.
You can get more details when you use the `dig` command

```bash
# Does not seem to work on MacOS
$ dig nginx.goodguys.click
```
