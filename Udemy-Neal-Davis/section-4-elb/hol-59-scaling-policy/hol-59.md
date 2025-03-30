# Create a Scaling Policy - HOL-59

### Description

This template is an extension of _hol-57-alb_ which configures an Application Load Balancer with an Auto Scaling Group.  
Here we add a Scaling Policy of type _Target Tracking Scaling_ with a _Predefined Metric Type_ of _ALBRequestCountPerTarget_.  
When the connection per target reaches a value of 50, the Auto Scaling Group will scale out.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint ScalingPolicy.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file ScalingPolicy.yaml --stack-name ScalingPolicy
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name ScalingPolicy > events.json
```

**Testing**

1. Get the DnsName from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name ScalingPolicy --query "Stacks[0].Outputs" --no-cli-pager
```

2. Use the DnsName to access the application on a Web Browser.
3. Go to the CloudWatch console > Alarms > All alarms and you will see two Alarms created for the _ScalingPolicy_ resource described in the template.
4. Generate load on the application.  
   First, update the _dnsName_ value in the `generate-load.js` script and then, run the script

```bash
$ node generate-load.js
```

5. After a few minutes (about 3 mins), go the EC2 console and locate the Target group: EC2 Console > Load Balancing > Target Groups.  
   Check if the number of running instances have increased.  
   The number of running EC2 instances in the target group should have hit the maximum as defined in the Auto Scaling Group.
6. Stop the _generate-load.js_ script from running.  
   After a few minutes (max 15 mins), check the Target Groups to see if the number running instances have returned to the minimum as defined in the Auto Scaling Group

**Cleanup**  
 To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name ScalingPolicy
```
