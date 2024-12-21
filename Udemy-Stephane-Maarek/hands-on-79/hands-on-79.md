# Lesson 74: Elastic Load Balancer - Sticky Sessions

### Description

This configures extends the configuration of hands-on-74 which provisions an Application Load Balancer that forward traffic to two EC2 instances.
Here we add Sticky session to the Application Load Balancer target group.  
Stickiness allows the application load balancer to route traffic from a given client to the same target each time for the duration of it's session.  

### Operation

**Deployment**  
Upload the child templates to S3

```
$ aws s3 cp AlbStickyEc2Child.yaml s3://chucks-workspace-storage/templates/AlbStickyEc2Child.yaml
```

Validate the template

```
$ aws cloudformation validate-template --template-body file://AlbStickyDemo.yaml
```

Deploy a stack using the _AlbStickyDemo_ template

```

$ aws cloudformation deploy --template-file AlbStickyDemo.yaml  --stack-name AlbStickyDemo
```

Get the load balancer Dns name and instance Ids from the stack outputs

```
$ aws cloudformation describe-stacks --stack-name AlbStickyDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**
Use the Load balancer DNS name to access the web server on a web browser.  
Each time you refresh the page, the content of the web page should remain UNCHANGED indicating that the content is coming from the same target and which means that the sticky session is in play.

Make a curl request repeatedly using the same DNS name on your terminal.

```
$ cur http://simplebalancer-1274076709.eu-west-2.elb.amazonaws.com/
```

You will see that the content changes on the terminal since the terminal does not receive or send cookies.

**Debug Errors**
In the case of error during deployment, checkout the stack events

```

$ aws cloudformation describe-stack-events --stack-name AlbStickyDemo

```

**Cleanup**
To delete the stacks

```

$ aws cloudformation delete-stack --stack-name AlbStickyDemo

```
