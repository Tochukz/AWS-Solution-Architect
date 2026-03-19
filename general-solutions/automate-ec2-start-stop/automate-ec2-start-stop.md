# Automate EC2 Start and Stoop

## Requirement

We have EC2 instances that serve as JumpBox that serve to RDS instances in a private subnet.   
We want to have the instances start at 08:00 GMT and stop on 20:00 GMT every week day.  
To achieve this, we set up two EventBridge Schedulers, one Scheduler to start the EC2 instance at 08:00  and the other to stop the instance as  20:00.  

## Operation

**Pre Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint AutomateEc2StartStop.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file AutomateEc2StartStop.yaml --stack-name AutomateEc2StartStop --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**  
Check if the install was start at the assigned time in the start scheduler and also if the instance is stopped at the stop scheduler time.  

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name AutomateEc2StartStop
```


**Useful Commands**  
Get the instance Id
```bash
$ aws ec2 describe-instances --query "Reservations[*].Instances[*].InstanceId" --filter "Name=tag:Name,Values=ScheduledInstance" --no-cli-pager
```

Show the instance Id, Status and Tags
```bash
$ aws ec2 describe-instances --query "Reservations[*].Instances[*].{InstanceId: InstanceId, State: State.Name, Tags: Tags}" --filter "Name=tag:Name,Values=ScheduledInstance" --no-cli-pager
```