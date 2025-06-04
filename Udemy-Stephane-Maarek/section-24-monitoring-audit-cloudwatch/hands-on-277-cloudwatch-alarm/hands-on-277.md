# Lesson 247: CloudWatchAlarm Logs - Hands On

### Description

This template configures a CloudWatch Alarm that shuts down an EC2 instance when it's CPU Utilization reaches 90%.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint CloudWatchAlarm.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CloudWatchAlarm.yaml  --stack-name CloudWatchAlarm
```

**Testing**

1. First checkout the deployed EC2 instance in the EC2 console and confirm that the instance is in the _Running state_.

2. Manually trigger the Alarm to go into the _Alarm state_:

```bash
$ aws cloudwatch set-alarm-state --alarm-name HighCpuUtilizationAlarm --state-value ALARM --state-reason JustTesting
```

3. Go to the CloudWatch console > All Alarms, confirm that the Alarm is now in _Alarm state_.
4. Wait for a few seconds and then checkout the EC2 instance again to see if it is now in the _Stopped state_.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name CloudWatchAlarm > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CloudWatchAlarm
```
