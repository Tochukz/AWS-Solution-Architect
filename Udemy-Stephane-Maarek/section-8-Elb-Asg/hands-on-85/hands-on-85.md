# Lesson 85: Auto Scaling Groups - Hands on

### Description

This template configures an Auto Scaling Group that manages the number of EC2 instances in
the target group of an Application Load Balancer.  
This configuration may be considered incomplete as it does not setup a scaling policy.  See hands-on-87 that includes a Scaling Policy.  

### Operation

**Deployment**  
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
Because the current DesiredCapacity is set to 1, the content will always remain the same when you refresh the page.   
Update the DesiredCapacity to 2 and the deploy the stack again.  
Now the instances InService for the ASG will change to 2. Refreshing the page on the browser should now show different content from time to time.   

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
