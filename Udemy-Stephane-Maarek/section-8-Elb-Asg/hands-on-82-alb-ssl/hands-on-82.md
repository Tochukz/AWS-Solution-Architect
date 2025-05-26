# Lesson 82: Elastic Load Balancer - SSL Certificate - Hands on

### Description

This template extends `hands-on-74` which configures an Application Load Balancer.  
Here we setup an SSL certificate for the Application Load Balancer (ALB).  
This allows us to access the ALB using our custom domain name over the HTTPS protocol - https://alb-ssl.goodguys.click .  
We have also added a HTTP listener that redirects all traffic to the HTTPS listener where the SSL is configured.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint AlbSslEc2Child.yaml
$ cfn-lint AlbSslDemo.yaml
```

Upload the child templates to S3

```bash
$ aws s3 cp AlbSslEc2Child.yaml s3://chucks-workspace-storage/templates/AlbSslEc2Child.yaml
```

Deploy a stack using the _AlbSslDemo_ template

```bash
$ aws cloudformation deploy --template-file AlbSslDemo.yaml  --stack-name AlbSslDemo --parameter-overrides file://private-parameters.json
```

**After Deployment**  
Get the `DomainUrl` and `InstanceId`s from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name AlbSslDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Use the custom `DomainUrl` (https://alb-ssl.goodguys.click/) to access the web server on a web browser.

Each time you refresh the page, the content of the web page should change indicating that the content is coming from a difference EC2 instance each time.

Note that because SSL has been configured, the default DNSName cannot be used to access the ALB over HTTPS.  
This is because the applied ACM certiticate does not match the default DNSName, it only matches our custom domain name.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name AlbSslDemo
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name AlbSslDemo
```
