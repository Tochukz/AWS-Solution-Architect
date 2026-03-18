# Automate EC2 Start/Stop with EventBridge Scheduler

## Overview

This CloudFormation template automates EC2 instance lifecycle management using AWS EventBridge Scheduler:
- **Starts** the EC2 instance daily at **08:00 UTC**
- **Stops** the EC2 instance daily at **20:00 UTC**

The solution uses EventBridge Scheduler to trigger EC2 start/stop actions via AWS SDK, eliminating the need for Lambda functions.

## Architecture

```
EventBridge Scheduler (08:00 UTC)
        ↓
    Cron Expression
        ↓
IAM Role (SchedulerRole)
        ↓
EC2 StartInstances API Call
        ↓
EC2 Instance Starts

---

EventBridge Scheduler (20:00 UTC)
        ↓
    Cron Expression
        ↓
IAM Role (SchedulerRole)
        ↓
EC2 StopInstances API Call
        ↓
EC2 Instance Stops
```

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `InstanceType` | t3.micro | EC2 instance type (t3.micro, t3.small, t3.medium, t2.micro, t2.small, t2.medium) |
| `LatestAmiId` | Amazon Linux 2 | Latest Amazon Linux 2 AMI ID |
| `TimeZone` | UTC | Time zone for scheduling (UTC, US/Eastern, US/Central, US/Mountain, US/Pacific, Europe/London, Europe/Paris, Asia/Tokyo) |

## Pre-Deployment

1. Ensure you have AWS CLI configured:
```bash
aws configure
```

2. Verify your AWS account permissions to create EC2, IAM, and EventBridge Scheduler resources.

## Deployment

### Option 1: Using AWS CLI

```bash
# Deploy with default parameters (t3.micro, UTC timezone)
aws cloudformation deploy \
  --template-file AutomateEC2StartStop.yaml \
  --stack-name ec2-automation \
  --capabilities CAPABILITY_NAMED_IAM

# Deploy with custom parameters
aws cloudformation deploy --template-file AutomateEC2StartStop.yaml --stack-name AutomateEc2StartStop --capabilities CAPABILITY_NAMED_IAM
```

### Option 2: Using AWS Console

1. Go to CloudFormation → Create Stack
2. Upload `AutomateEC2StartStop.yaml`
3. Enter stack name: `ec2-automation`
4. Set parameters (InstanceType, TimeZone)
5. Review and create
6. Check "I acknowledge that AWS CloudFormation might create IAM resources"

## After Deployment

### Verify Resources

```bash
# Get stack outputs
aws cloudformation describe-stacks \
  --stack-name ec2-automation \
  --query 'Stacks[0].Outputs'

# Check EC2 instance status
aws ec2 describe-instances \
  --instance-ids <InstanceId> \
  --query 'Reservations[0].Instances[0].State'

# View EventBridge Scheduler schedules
aws scheduler list-schedules
```

### Monitor Schedules

```bash
# Get details of start schedule
aws scheduler get-schedule --Name EC2StartInstanceSchedule

# Get details of stop schedule
aws scheduler get-schedule --Name EC2StopInstanceSchedule
```

### Monitor EC2 Instance

```bash
# Check instance status
aws ec2 describe-instances \
  --instance-ids <InstanceId> \
  --query 'Reservations[0].Instances[0].[InstanceId,State.Name,PublicIpAddress,LaunchTime]'
```

## Timezone Adjustment

If you need to use a different timezone:

```bash
aws cloudformation update-stack \
  --stack-name ec2-automation \
  --use-previous-template \
  --parameters ParameterKey=TimeZone,ParameterValue=US/Pacific
```

**Common Timezones:**
- `UTC` - Coordinated Universal Time
- `US/Eastern` - 8:00 AM EST / 9:00 AM EDT → 8:00 PM EST / 9:00 PM EDT
- `US/Central` - 8:00 AM CST / 9:00 AM CDT → 8:00 PM CST / 9:00 PM CDT
- `US/Mountain` - 8:00 AM MST / 9:00 AM MDT → 8:00 PM MST / 9:00 PM MDT
- `US/Pacific` - 8:00 AM PST / 9:00 PM PDT → 8:00 PM PST / 9:00 PM PDT
- `Europe/London` - 8:00 AM GMT / 9:00 AM BST → 8:00 PM GMT / 9:00 PM BST
- `Europe/Dublin` - 8:00 AM GMT / 9:00 AM IST → 8:00 PM GMT / 9:00 PM IST
- `Europe/Paris` - 8:00 AM CET / 9:00 AM CEST → 8:00 PM CET / 9:00 PM CEST
- `Asia/Tokyo` - 8:00 AM JST → 8:00 PM JST

## Cron Schedule Reference

Schedule Format: `cron(minutes hours day month day-of-week year)`

- `cron(0 8 * * ? *)` - Daily at 08:00 UTC
- `cron(0 20 * * ? *)` - Daily at 20:00 UTC
- `cron(0 8 ? * MON-FRI *)` - 08:00 on weekdays only

## Cleanup

```bash
# Delete the stack
aws cloudformation delete-stack --stack-name ec2-automation

# Verify deletion
aws cloudformation describe-stack-resources --stack-name ec2-automation
```

## Cost Considerations

- **EC2 Instance**: Charged per hour the instance is running (8 hours @ 08:00-20:00)
- **EventBridge Scheduler**: ~$0.06 per 1 million scheduled invocations (very low cost)
- **Monthly estimate** (t3.micro): ~$6-10/month (running 8 hours daily)

## Troubleshooting

### Instance not starting/stopping

1. Check IAM role permissions:
```bash
aws iam get-role --role-name EventBridgeSchedulerEC2Role
```

2. Verify schedule is enabled:
```bash
aws scheduler get-schedule --Name EC2StartInstanceSchedule
```

3. Check CloudTrail for API errors:
```bash
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=EventName,AttributeValue=StartInstances
```

### Incorrect schedule times

Verify the timezone parameter matches your requirement:
```bash
aws scheduler get-schedule --Name EC2StartInstanceSchedule \
  --query 'TimeZoneId'
```

### Instance state issues

Check current instance state:
```bash
aws ec2 describe-instance-status --instance-ids <InstanceId>
```

## Resources Created

| Resource | Type | Purpose |
|----------|------|---------|
| EC2Instance | AWS::EC2::Instance | The instance to be automated |
| SchedulerRole | AWS::IAM::Role | Role for Scheduler to call EC2 APIs |
| StartInstanceSchedule | AWS::Scheduler::Schedule | Cron job for 08:00 start |
| StopInstanceSchedule | AWS::Scheduler::Schedule | Cron job for 20:00 stop |

## References

- [AWS EventBridge Scheduler Documentation](https://docs.aws.amazon.com/scheduler/)
- [EC2 API References](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/)
- [CloudFormation Scheduler Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-scheduler-schedule.html)
