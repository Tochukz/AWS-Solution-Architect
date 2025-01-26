# Create an Auto Scaling Group - HOL-53

### Description

This template configures an Auto Scaling Group

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint AutoScaling.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file AutoScaling.yaml --stack-name AutoScaling
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name AutoScaling > events.json
```

**Testing**  
Go to the EC2 console and copy the instance ID of one of the running instances that is managed by the auto scaling group.  
Terminate the instance

```bash
$ aws ec2 terminate-instances --instance-ids i-0e60d55f1fec74b2b
```

Wait for a few minutes.  
A new instance should be launched by the Auto scaling group to keep the count of the instances at the desired capacity of 2.

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name AutoScaling
```
