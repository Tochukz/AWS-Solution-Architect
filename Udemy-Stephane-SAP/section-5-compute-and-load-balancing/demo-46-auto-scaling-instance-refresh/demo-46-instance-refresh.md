# Lesson 46: Auto Scaling

## Demo 46: Auto Scaling Instance Refresh

### Description

In this example we configure an Auto Scaling Group with a Target Group having three running instances.  
We then update the Launch template and then we want the running instances to be updated.
To do this for use the `autoscaling start-instance-refresh` command.  
When running the `start-instance-refresh` command, we must make sure that 60% of the instances are operational at all times.  

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint AutoScalingRefresh.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file AutoScalingRefresh.yaml  --stack-name AutoScalingRefresh
```

**After Deployment**



**Testing**

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name AutoScalingRefresh > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name AutoScalingRefresh
```
