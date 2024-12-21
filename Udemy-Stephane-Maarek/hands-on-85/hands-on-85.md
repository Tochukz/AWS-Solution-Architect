# Lesson 85: Auto Scaling Groups - Hands on

### Description

This template configures an Auto Scaling Group the manages the number of EC2 instances in
the target group of an Application Load Balancer

### Operation

**Deployment**  
Upload the child templates to S3

```
$ aws s3 cp AsgEc2Child.yaml s3://chucks-workspace-storage/templates/AsgEc2Child.yaml
```

Lint the template

```
$ cfn-lint AsgDemo.yaml
```

Deploy a stack using the _AsgDemo_ template

```

$ aws cloudformation deploy --template-file AsgDemo.yaml  --stack-name AsgDemo
```

Get the load balancer Dns name and instance Ids from the stack outputs

```
$ aws cloudformation describe-stacks --stack-name AsgDemo  --query "Stacks[0].Outputs" --no-cli-pager
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

$ aws cloudformation describe-stack-events --stack-name AsgDemo

```

**Cleanup**
To delete the stacks

```

$ aws cloudformation delete-stack --stack-name AsgDemo

```
