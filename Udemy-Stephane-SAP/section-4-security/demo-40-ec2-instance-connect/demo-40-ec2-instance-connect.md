# Lesson 40: EC2 Instance Connect

## Demo 40: Using the SendSSHPublicKey API

### Description

We can replicate the way the EC2 Instance Connect works by sending a public key to our running EC2 instance using the `SendSSHPublicKey` API.  

We configure an EC2 instance with the proper security group ingress rule but without specifying a KeyPair.

After the instance is in the running state, we send a public key to the instance using the `ec2 send-ssh-public-key` command and then we use the private key pair to connect to the instance.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint Ec2Instance.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SslOnEc2.yaml  --stack-name Ec2Instance
```

**After Deployment**

Get the InstanceId and PublicIP outputs from the stack
```bash
$ aws cloudformation describe-stacks --stack-name Ec2Instance --query "Stacks[0].Outputs" --no-cli-pager
```  

**Testing**
1. Create a Key Pair
```bash
$ ssh-key-gen
```

2. Send the Public Key to the EC2 instance

```bash
$ aws ec2 send-ssh-public-key --instance-id i-xxxxxx --instance-os-user ec2-user --ssh-public-key key.pub
```

3. Connect to the instance using the private key

```
$ ssh -i private-key.pem ec2-user@xxxxxxxx
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Ec2Instance > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Ec2Instance
```
