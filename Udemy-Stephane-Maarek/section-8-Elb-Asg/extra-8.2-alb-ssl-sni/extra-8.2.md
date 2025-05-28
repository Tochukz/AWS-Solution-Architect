# Lesson 82: Elastic Load Balancer - SSL Certificate - Hands on

### Description

This configuration is an extension of `hands-on-82-alb-ssl`.  
Here we demonstrate how multiple custom domains can be used on the same ALB Listerner to access different backend services.

```
web.company.com -> WebServer1
site.example.com -> WebService2
```

We do this by configuring multiple SSL/TLS Certificates on the same HTTPS listener.

The ability to have multiple domains sharing the same Listener is made possible by _Server Name Indication (SNI)_  
More about SNI at the end of this page.

We use two different domain names in this example.  
The first one, `Hostname1` is hosted on Route53 and the second one, `Hostname2` is hosted by an external domain provider.  
A RecordSet is configured for the domain hosted on Route53.  
A CNAME must be manually configured for the external domain name after the configuration is deployed.

### Operation

**Before Deployment**

1. Request a certificate for you external domain (i.e one not hosted by AWS Route53)

```bash
$ aws acm request-certificate --domain-name "*.iclinic.net.za" --validation-method DNS > output-1.json
```

2. Use the CertificateArn from the request-certificate command to get the certificate details

```bash
$  aws acm describe-certificate --certificate-arn arn:aws:acm:eu-west-2:314146339647:certificate/xxxx-xxxx-xxx-xxx-xxx > output-2.json
```

3. Copy the value of `Certificate.DomainValidationOptions[0].ResourceRecord.Name` and `Certificate.DomainValidationOptions[0].ResourceRecord.Value` from the output object.  
   Use the Name and Value to create a CNAME record in you DNS settings.

For example

```
Host: _xxx99825068e1fa1b1e682c4cexxxxxxx
Type: CNAME
Value: _xxxx4662aded04c737cae44xxxxxxxxx.xxxxxxx.acm-validations.aws.
TTL: 3600
```

4. Follow the same step to request certificate for Route 53 hosted domain.

**Deployment**  
 Lint the templates

```bash
$ cfn-lint AlbSniEc2Child.yaml
$ cfn-lint AlbSniDemo.yaml
```

Upload the child templates to S3

```bash
$ aws s3 cp AlbSniEc2Child.yaml s3://chucks-workspace-storage/templates/AlbSniEc2Child.yaml
```

Deploy a stack using the _AlbSniDemo_ template

```bash
$ aws cloudformation deploy --template-file AlbSniDemo.yaml  --stack-name AlbSniDemo --parameter-overrides file://private-parameters.json
```

**After Deployment**

1. Get the `AlbDnsName`, `Host1Url` and `Host2Url` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name AlbSniDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

2. Use the `AlbDnsName` to create a CNAME record in your DNS settings of the external hosted domain

```
Host: service
Value: SimpleBalancer-1970032465.eu-west-2.elb.amazonaws.com
Type: CNAME
TTL: 3600
```

The value must be the `AlbDnsName` from your Stack Outputs.

**Testing**  
Use the custom `Host1Url` and `Host2Url` to access the different web servers on a web browser.

Confirm that each host displays a different content.

Alternately, you can use curl to check the different servers

```bash
$ curl https://server.goodguys.click
$ curl https://service.iclinic.net.za
```

Confirm that the contain from each host is different.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name AlbSniDemo
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name AlbSniDemo
```

## Learn More

**Server Name Indication (SNI)**

- SNI solves the problem of loading multiple SSL certificates onto one web server (to serve multiple websites)
- It is a newer protocol and requires the client to indicate the hostname of the target server in the initial SSL handshake
- The server will then find the correct certificate or return the default one.
- SNI only works for ALB, NLB and CloudFront
- SNI is not supported for CLB
