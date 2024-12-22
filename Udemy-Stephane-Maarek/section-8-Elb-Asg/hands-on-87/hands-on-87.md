# Lesson 87: Auto Scaling Groups - Scaling Policies Hands on

### Description

This template extends hands-on-85 which configures an Auto Scaling Group that manages the number of EC2 instances in
the target group of an Application Load Balancer.  
Here we have added a Dynamoic Scaling Policy that uses CPU Utilization as a metric to scale in or out as needed.

### Operation

**Deployment**

Lint the template

```
$ cfn-lint AsgPolicyDemo.yaml
```

Deploy a stack using the _AsgPolicyDemo_ template

```

$ aws cloudformation deploy --template-file AsgPolicyDemo.yaml  --stack-name AsgPolicyDemo
```

Get the load balancer Dns name and instance Ids from the stack outputs

```
$ aws cloudformation describe-stacks --stack-name AsgPolicyDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
The Auto Sacling Group was set to a DesiredCapacity of 1 instance which means that only 1 EC2 instance will be InService when the configuration is deployed.  
The Scaling Policy was configured to add 1 more instance when the average CPU utilization is 40% or more with a Cooldown time of 300 seconds.  
We can test this behaviour by artificial simulating an increased CPU Utilization using the `stress` utility tool.

SSH into the EC2 instance InService and install the `stress` utility tool

```bash
$ sudo amazon-linux-extras install epel -y
$ sudo yum install stress -y
```

Now use the stress tool to simulate loading the EC2 instance to maximize it's CPU Utilization.

```bash
$ stress -c 4
```

This will take up 4 cpu units which will make the CPU utilization of the t2.micro instance to jump to 100%.

Wait for a few minutes, 5 minutes max, and then check the Auto Scaling Group in the EC2 console. The InService instances should jump to 2 or 3, indicating that a new EC2 instances have been added to the Target Group.

After a while, stop the `stress` and then wait for the number of instances to return back to 1.

**Debug Errors**
In the case of error during deployment, checkout the stack events

```

$ aws cloudformation describe-stack-events --stack-name AsgPolicyDemo

```

**Cleanup**
To delete the stacks

```

$ aws cloudformation delete-stack --stack-name AsgPolicyDemo

```
