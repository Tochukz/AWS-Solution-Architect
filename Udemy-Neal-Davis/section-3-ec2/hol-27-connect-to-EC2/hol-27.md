# Launching Amazon EC2 Instances - HOL-27

### Description

The template configures an EC2 instance with a Windows AMI.

### Operation

**Pre Deployment**  
This configuration need a key-pair as a parameter.  
Get your existing key-pair KeyName if you have one already

```bash
$ aws ec2 describe-key-pairs
```

Create a new key-pair if you do not have one

```bash
$ aws ec2 create-key-pair --key-name DevSimpleKey --query 'KeyMaterial' --output text > dev-simple-key.pem
```

Then make the generated key-pair file readonly

```bash
$ chmod 400 dev-simple-key.pem
```

**Deployment**  
Lint the template

```bash
$ cfn-lint WindowsServer.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file WindowsServer.yaml --stack-name WindowsServer
```

**Post Deployment**  
Get your Instance Id and Public IP from the stack Outputs

```bash
$ aws cloudformation describe-stacks --stack-name WindowsServer --query "Stacks[0].Outputs" --no-cli-pager
```

Decrypt the password for the Windows instance using your private key file

```bash
$ aws ec2 get-password-data --instance-id i-086312b32601a70ca --priv-launch-key ../../dev-simple-key.pem
```

The decrypted password will be used to login to the instance later.

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name WindowsServer > events.json
```

**Testing**  
Login to the Windows instance using an RDP client.  
You will also need a username, which by default is _Administrator_, and the decrypted password.  
If you are on Windows OS you can use the RDP client which comes installed.  
If you are on MacOS, you can install _Microsoft Remote Desktop_.

**Cleanup**  
To delete the stacks and snapshot

```bash
$ aws cloudformation delete-stack --stack-name WindowsServer
```
