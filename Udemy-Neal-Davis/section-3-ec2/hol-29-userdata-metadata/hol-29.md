# Using Userdata and Metadata - HOL-29

### Description

This configuration creates two EC2 instances, one with IMDSv1 enabled and the other with IMDSv2 enable.  
For the instance with IMDSv1 enabled, you can `curl` the metadata endpoint and get information about you instance.  
For the instance with IMDSv2 enabled, you need to get an authentication token first before you can `curl` the metadata endpoint.

### Operation

**Pre Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint MetaData.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file MetaData.yaml --stack-name MetaData
```

**After Deployment**  
Get the PublicIps from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name MetaData --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
For the IMDSv1 enabled instance

1. SSH into the `IMDSv1Instance` EC2 instance
2. `curl` the metadata endpoint

```bash
$ curl http://169.254.169.254/latest/meta-data
```

3. Get specific information from the meta-data

```bash
$  cur http://169.254.169.254/latest/meta-data/public-ipv4
```

4. Visit the website on your web browser `http://18.130.114.159/`

For the IMDSv2 enabled instance

1. SSH into the `IMDSv2Instance` EC2 instance
2. Genetate an authorization token

```bash
$ TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
$ echo $TOKEN
```

3. Use the authorization token to `curl` the metadata endpoint

```bash
$ curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data
```

4.  Get specific information from the meta-data

```bash
$ curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-ipv4
```

5.  Visit the website on your web browser `http://3.10.211.224/`

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name MetaData > events.json
```

**Cleanup**  
To delete the stacks and snapshot

```bash
$ aws cloudformation delete-stack --stack-name MetaData
```
