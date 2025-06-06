# Lesson 375: SSM Session Manager - Hands On

### Description

This configuration creates an EC2 instance that will be managed by AWS Session Manager SSM.  
With SSM configured we do not need a KeyPair or port 22 opened on the security group to gain access to the EC2 instance.  
SSM provides secure shell access to the EC2 instance provided that

1. The EC2 instance profile role has the _AmazonSSMManagedInstanceCore_ IAM policy or similar permission.
2. The SSM Agent installed is installed in the instance.

Some EC2 AMIs have the SSM agent installed by default e.g Amazon Linux 2, Amazon Linux 2023, Ubuntu 18.04+, and other modern AMIs.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint SsmSessionMg.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SsmSessionMg.yaml  --stack-name SsmSessionMg --capabilities CAPABILITY_NAMED_IAM --tags Name=SsmMgt
```

**After Deployment**  
Get the InstanceId from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name SsmSessionMg --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
SSH into the EC2 instance using the Web Console

1. Login to the AWS Session Manager Console
2. Go to Node Tools > Fleet Manager > Get Started
3. This should show a list of EC2 instances (Managed Nodes) registered with SSM
4. Confirm that your EC2 instance is listed under the Managed Nodes
5. Select the EC2 instance, click Node Action > Connect > Start Terminal Session
6. This should open up a secure shell to the EC2 instance
7. Run the `hostname` command to get the EC2 private IP
8. Terminate the secure shell after you are done.

SSH into the EC2 instance using your local terminal

1. Install and configure AWS CLI if you have not already done so
2. Install the SSM Plugin

```bash
$  brew install session-manager-plugin
```

3. Start an SSH session

```bash
$ aws ssm start-session --target i-04cdcd1d59c2ad12a
```

4.  Run the `hostname` command to get the EC2 private IP

```bash
$ hostname
```

5. Exit the session

```bash
$ exit
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name SsmSessionMg > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SsmSessionMg
```
