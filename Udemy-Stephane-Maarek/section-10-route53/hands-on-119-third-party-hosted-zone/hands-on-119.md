# Lesson 119: 3rd Party Domain & Route 53

### Description

You can register you domain with a 3rd Party Domain Registra like GoDaddy and then use Route53 to manage your DNS Records.  
This configuration creates a Route53 public hosted zone using a Domain name registered by a third party, Domains.co.za is the Registra in this case.  
Two RecordSet are then configured on the Hosted Zone. One maps to an EC2 instance on the root domain (doctorchuks.com) and the other maps to an S3 website on a subdomain (help.doctorchuks.com).

Since your domain name is registered with a registrar other than Route 53, you must update the name servers with your registrar to make Route 53 the DNS service for the domain.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint RegionalEc2.yaml
$ cfn-lint S3Website.yaml
$ cfn-lint ThirdPartyDomain.yaml
```

There are three stacks to deploy

1. Deploy the S3Website stack and copy the assets

```bash
$ aws cloudformation deploy --template-file S3Website.yaml  --stack-name S3Website
$ aws s3 sync help-site s3://help.doctorchuks.com
```

2. Deploy the EC2 instance web server

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name MainServer
```

3. Get the public IP of the EC2 instances and the Website Url to be used for the `MainSitePublicIp` and `S3WebsiteUrl` parameters respectively in `ThirdPartyDomain.yaml`

```bash
$ aws cloudformation describe-stacks --stack-name MainServer --query "Stacks[0].Outputs"  --no-cli-pager
$ aws cloudformation describe-stacks --stack-name S3Website --query "Stacks[0].Outputs"  --no-cli-pager
```

4. Copy the values of the public IP for the `MainSitePublicIp` and the Website Url for `S3WebsiteUrl` into the `parameters.json`

Now deploy `ThirdPartyDomain`

```bash
$ aws cloudformation deploy --template-file ThirdPartyDomain.yaml  --stack-name ThirdPartyDomain --region eu-west-2 --parameter-overrides file://parameters.json
```

**Post Deployment**  
After the Hosted zone is deployed you must updated the NameServers of your Domain Name.  
First get the Name Servers for your Route 53 Hosted Zone from the Stack output

```bash
$ aws cloudformation describe-stacks --stack-name ThirdPartyDomain --query "Stacks[0].Outputs" --no-cli-pager
```

Copy all 4 Name Servers and Edit your Third Party Domain Name Server to be that from your newly created Route53 Hosted Zone.

**Testing**

1. Visit http://doctorchuks.com and you should see the content for the main server
2. Visit http://help.doctorchuks.com and you should see the S3 website.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```
$ aws cloudformation describe-stack-events --stack-name ThirdPartyDomain
```

**Cleanup**  
Delete all the content of the S3 website

```bash
$ aws s3 rm s3://help.doctorchuks.com/ --recursive
```

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name S3Website
$ aws cloudformation delete-stack --stack-name MainServer
$ aws cloudformation delete-stack --stack-name ThirdPartyDomain
```
