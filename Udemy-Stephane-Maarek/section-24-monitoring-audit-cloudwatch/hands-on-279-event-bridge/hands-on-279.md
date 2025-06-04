# Lesson 279: Amazon Event Bridge - Hands On

### Description

The configuration creates a Custom Event Bus and enabled Event Archive and Automatic Schema Discovery for the Event Bus.  
With _Event Archive_ enabled, we can _replay_ past event for debugging purposes.

Because custom event buses do not receive events from AWS service, we created the `ForwardEc2EventsRule` event rule to forward AWS service events from the `default` event bus to our custom event bus.  
However the `ForwardEc2EventsRule` event rule is configured to forward only events from source `aws.ec2` and detail-type of `EC2 Instance State-change Notification`. This can be seen the the `EventPattern` defined in the rule.

We also configured the `Ec2ActionRule` event rule that targets a LogGroup and a SNS topic which then sends an email notification whenever an EC2 instance enters the stopped or running state or is terminated.  
You can view the events on your email inbox or the LogStream.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint CustomEventBus.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CustomEventBus.yaml  --stack-name CustomEventBus --parameter-overrides file://parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Go to the email inbox and the email you supplied for the `SubscriptionEmail` parameter and accept the subscription confirmation.

Get the EC2 `InstanceId` from the stack output

```bash
$ aws cloudformation describe-stacks --stack-name CustomEventBus --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Stop the EC2 Instance and see if you get an email notification and also check the LogStream.

```bash
$ aws ec2 stop-instances --instance-id i-0cf8ed865800bbea4
```

2. Start the instance again and see if the events is sent to your inbox again and also the LogStream.

```bash
$ aws ec2 start-instances --instance-id i-0cf8ed865800bbea4
```

3. Terminate the EC2 instance and see if you get another email notification and Logs.

```bash
$ aws ec2 terminate-instances --instance-id i-0cf8ed865800bbea4
```

4. Put a custom event and see if you get a notfication and Logs.

```bash
$ aws events put-events --entries file://custom-events.json
```

5. Go to the Event Bridge console and try to reply an event.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name CustomEventBus > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CustomEventBus
```
