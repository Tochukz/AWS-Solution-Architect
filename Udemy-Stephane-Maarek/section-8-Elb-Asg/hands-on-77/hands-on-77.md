# Lesson 74: Network Load Balancer - Hands on

### Description

This template configures a network load balancer that distributes traffic to two EC2 instances.  
The EC2 instance are running identical Nginx server but with different content.

### Operation

**Deployment**  
Upload the child templates to S3

```
$ aws s3 cp NlbEc2Child.yaml s3://chucks-workspace-storage/templates/NlbEc2Child.yaml
```

Validate the template

```
$ aws cloudformation validate-template --template-body file://NlbDemo.yaml
```

Deploy a stack using the _NlbDemo_ template

```

$ aws cloudformation deploy --template-file NlbDemo.yaml  --stack-name NlbDemo
```

Get the load balancer Dns name and instance Ids from the stack outputs

```
$ aws cloudformation describe-stacks --stack-name NlbDemo  --query "Stacks[0].Outputs" --no-cli-pager
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

$ aws cloudformation describe-stack-events --stack-name NlbDemo

```

**Cleanup**
To delete the stacks

```

$ aws cloudformation delete-stack --stack-name NlbDemo

```
