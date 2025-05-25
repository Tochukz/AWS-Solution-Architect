# Lesson 55: EC2 Hibernate - Hands on

### Description

This template configures an EC2 instance with Hibernation enable.

For an EC2 instance to be hibernatable, certain criteria must be met: See [Prerequisites for Amazon EC2 instance hibernation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hibernating-prerequisites.html)

### Operation

**Deployment**  
Deploy a stack using the CloudFormation template

```

$ aws cloudformation deploy \
    --template-file HibernateDemo.yaml \
    --stack-name HibernateDemo
```

Checkout outputs after successful deployment

```
$ aws cloudformation describe-stacks --stack-name HibernateDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Debug Errors**  
In the case of error during deployment

```
$ aws cloudformation describe-stack-events --stack-name HibernateDemo
```

**Testing Hibernation**  
After the instance is deploy, ssh into the instance

```
$ ssh -i dev-simple-key.pem ec2-user@xxx.xxx
```

Check the uptime of the instance

```
$ uptime
```

Hibernate the instance and

```
$ aws ec2 stop-instances --instance-ids i-048248e0e16a8cf02 --hibernate
```

Wait for a while and then start the instance.

```
$ aws ec2 start-instances --instance-ids i-048248e0e16a8cf02
```

SSH into the instance and run `uptime` again.  
The uptime should increase even though the system was hibernated.  
This shows that the system continued to run behind the scene when hibernated.

**Cleanup**  
To delete the stack

```
$ aws cloudformation delete-stack --stack-name HibernateDemo
```
