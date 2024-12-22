# Lesson 82: Elastic Load Balancer - SSL Certificate - Hands on

### Description

This template extends hands-on-74 which configures an Application Load Balancer.  
Here we setup an SSL certificate for the Application Load Balancer.

### Operation

**Deployment**  
Upload the child templates to S3

```
$ aws s3 cp AlbSslEc2Child.yaml s3://chucks-workspace-storage/templates/AlbSslEc2Child.yaml
```

Lint the template

```
$ cfn-lint AlbSslDemo.yaml
```

Deploy a stack using the _AlbSslDemo_ template

```

$ aws cloudformation deploy --template-file AlbSslDemo.yaml  --stack-name AlbSslDemo
```

Get the load balancer Dns name and instance Ids from the stack outputs

```
$ aws cloudformation describe-stacks --stack-name AlbSslDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**
Use the Load balancer DNS name to access the web server on a web browser.  
Each time you refresh the page, the content of the web page should change indicating that the content is coming from a difference EC2 instance each time.

Stop one of the EC2 instance

```
$ aws ec2 stop-instances --instance-id i-xxxxxxxx
```

refresh the page again and the content should not change again since only one instance is healthy in the target group.

**Debug Errors**
In the case of error during deployment, checkout the stack events

```

$ aws cloudformation describe-stack-events --stack-name AlbSslDemo

```

**Cleanup**
To delete the stacks

```

$ aws cloudformation delete-stack --stack-name AlbSslDemo

```
