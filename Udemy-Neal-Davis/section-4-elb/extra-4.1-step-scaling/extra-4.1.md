# Step scaling policy

### Description

This template is an extension of _hol-57-alb_ which configures an Application Load Balancer with an Auto Scaling Group.  
Here we add a Scaling Policy of type _Step Scaling_ with a _Predefined Metric Type_ of _CPUUtilization_.  
This is a variation of _hol-59-scaling-policy_ which using _Target Tracking Scaling_ policy with a _Predefined Metric Type_ of _ALBRequestCountPerTarget_.  
Here when the connection CPU utilization reaches a value of 70%, the Auto Scaling Group will scale out and when it hit 30% it will scale in.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint StepScaling.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file StepScaling.yaml --stack-name StepScaling
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name StepScaling > events.json
```

**Testing**

**Cleanup**  
 To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name StepScaling
```
