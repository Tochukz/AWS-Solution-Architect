# Exercise 7.1: Create a Trail

### Description

In this exercise configures a CloudTrail Trail to log write-only management events in all regions.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Trail.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Trail.yaml --stack-name Trail --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Trail > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Trail
```

**Cloud Trail Best Practices:**  
✅ Enable multi-region CloudTrail for full visibility.
✅ Enable data events for critical resources (S3, Lambda, DynamoDB).
✅ Send logs to S3 + CloudWatch Logs for monitoring.
✅ Use CloudTrail Insights for anomaly detection.
✅ Combine with AWS Config for resource change tracking.
