# Lesson 273: CloudWatch Logs - Hands On

### Description

This configuration creates a LogGroup, a MetricFilter for the LogGroup, CloudWatch Alarm and SNS Topic.

**How It Works**
Logs sent to the /aws/custom/SimpleLogs log group are monitored for the "error" pattern by the metric filter.  
Each time the pattern is found, the ErrorCount metric is incremented.  
If the ErrorCount exceeds 5 in 5 minutes, the CloudWatch Alarm triggers and sends a notification to the SNS topic.  
You will then recieve a notification to your email that is subscribed to the SNS topic.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint CloudWatchLogs.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CloudWatchLogs.yaml  --stack-name CloudWatchLogs --parameter-overrides file://parameters.json
```

**After deployment**  
Go to the inbox of the email you supplied for `SubscriptionEmail` parameter in the `parameters.json` file.  
Confirm the SNS subscription by clicking on the _Confirm subscription_ link.

**Testing**  
Create a Log Stream in the Log Group and put 5 logs into the Log Stream.  
Each log message should contain the word "error".

```bash
$ ./log-errors.sh
```

After the the 5th log is put in the Log stream, you should get a SNS notification send to you `SubscriptionEmail` inbox.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name CloudWatchLogs > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CloudWatchLogs
```
