# Extra 26.3: Systems Manager Run Command

### Description

The _AWS Systems Manager Run Command_ allows you to remotely run scripts or commands on one or more EC2 instances — without needing to log in via RDP or SSH.  
You can execute powerShell, bash, or predefined documents (SSM documents) on multiple EC2 instances.  
This requires

- SSM Agent installed and running on EC2
- Instance profile with IAM Role having the _AmazonSSMManagedInstanceCore_ policy
- Public subnet with internet access or private subnet with SSM VPC endpoint

Amazon Linux 2 and Amazon Linux 2023 comes with the AWS Systems Manager (SSM) Agent preinstalled and running by default.

In this example we configure two EC2 instances that does not have any server running on it.
We then proceed to use SSM Run Command to install Nginx Server on the EC2 instances.

### Operation

**Deployment**  
Lint all template

```bash
$ cfn-lint SsmRunCommand.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SsmRunCommand.yaml  --stack-name SsmRunCommand --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the Public IPs of the EC2 instances from the stack output

```bash
$ aws cloudformation describe-stacks   --stack-name SsmRunCommand --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Use the Public IP to test on a browser to confirm that no web server is running on the instances.

2. Run SSM command to install Nginx on the instances using the _send-command_ CLI command

```bash
$ aws ssm send-command \
  --targets "Key=tag:Name,Values=SimpleInstance" \
  --document-name "AWS-RunShellScript" \
  --parameters "commands=$(< install-nginx.sh)"
#  Copy the CommandId from the response
```

3. Wait a while, then check command status using the _CommandId_ from the _send-command_ response

```bash
$ aws ssm list-command-invocations \
  --command-id "<command-id>" \
  --details
```

4. No try the Public IPs again on a browser and you should see the default Nginx welcome page.

Alternatively you can _Run Command_ on SSM Console

1. Go to Systems Manager Console
2. Run Command > Run a command
3. Search for _AWS-RunShellScript_ under the _Command document_ search list
4. Select the _AWS-RunShellScript_ command document
5. Enter your bash command in the _Commands_ box e.g `sudo systemctl stop nginx`
6. Under _Tag Selection_, specify tag key and tag value of `Name` and `SimpleInstance` respectively and click add
7. Scroll down to the end and click the _Run_ button.
8. Go back the the PublicIp on the browser and the Nginx webpage should no longer show.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name SsmRunCommand
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SsmRunCommand
```
