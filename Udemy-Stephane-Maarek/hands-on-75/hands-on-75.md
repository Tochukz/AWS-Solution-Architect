# Lesson 75: Application Load Balancer - Hands on (Part 2)

### Description

This template extends and modify the Application Load balancer configured in hands-on-74.  
Here we add rules to the Listener to route traffic to different Target groups based on the URL path.

### Operation

**Deployment**  
Upload the child templates to S3

```
$ aws s3 cp AlbEc2Child.yaml s3://chucks-workspace-storage/templates/AlbEc2Child.yaml
$ aws s3 cp AlbLambdaChild.yaml s3://chucks-workspace-storage/templates/AlbLambdaChild.yaml
```

Validate the template

```
$ aws cloudformation validate-template --template-body file://AlbDemo.yaml --capabilities CAPABILITY_NAMED_IAM
```

Deploy a stack using the _AlbDemo_ template

```

$ aws cloudformation deploy --template-file AlbDemo.yaml  --stack-name AlbDemo
```

Get the load balancer Dns name and instance Ids from the stack outputs

```
$ aws cloudformation describe-stacks --stack-name AlbDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Stack diff**  
When you make a change to the template you can check the diff against the current stack by creating a change set

```bash
# Create change set
$ aws cloudformation create-change-set --template-body file://AlbDemo.yaml --stack-name AlbDemo --parameters file://parameters.json --change-set-name AlbDemoChange --capabilities CAPABILITY_NAMED_IAM
# Checkout the change set
$ aws cloudformation describe-change-set --change-set-name AlbDemoChange --stack-name AlbDemo > diff.json
# Optionally you can execute the change set to apply the changes
$ aws cloudformation execute-change-set --stack-name AlbDemo --change-set-name AlbDemoChange
# Finally, you can delete the change set
$ aws cloudformation delete-change-set --stack-name AlbDemo --change-set-name AlbDemoChange
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

$ aws cloudformation describe-stack-events --stack-name AlbDemo

```

**Cleanup**
To delete the stacks

```

$ aws cloudformation delete-stack --stack-name AlbDemo

```
