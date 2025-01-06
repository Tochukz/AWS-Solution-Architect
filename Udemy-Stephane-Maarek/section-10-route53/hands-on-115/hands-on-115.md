# Lesson 115: Routing Policy - Geolocation

### Description

The template configures a Geolocation Routing policy.  
The Route53 record sets respond with the IP for a given EC2 instance bases on the Geolocation of the user.  
If the Geolocation of the user does not match the any of the record set, then the default EC2 instance IP is given.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint RegionalEc2.yaml
$ cfn-lint GeolocationPolicy.yaml
```

There are four stacks to deploy

1. Deploy the default EC2 instance in eu-west-2

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name DefaultEc2 --region eu-west-2
```

2. Deploy the african EC2 instance in af-south-1

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name AfricaEc2 --parameter-overrides InstanceType=t3.micro --region af-south-1
```

3. Deploy the america EC2 instance in us-east-1

```bash
$ aws cloudformation deploy --template-file RegionalEc2.yaml  --stack-name AmericaEc2 --region us-east-1
```

4. Get the public IP of the EC2 instances to be used for the `DefaultIp`, `AfricaIp` and `AmericaIp` parameters in `GeolocationPolicy.yaml`

```bash
$ aws cloudformation describe-stacks --stack-name DefaultEc2 --query "Stacks[0].Outputs"  --no-cli-pager --region eu-west-2
$ aws cloudformation describe-stacks --stack-name AfricaEc2 --query "Stacks[0].Outputs"  --no-cli-pager --region af-south-1
$ aws cloudformation describe-stacks --stack-name AmericaEc2 --query "Stacks[0].Outputs"  --no-cli-pager --region us-east-1
```

5. Copy the values of the public IP for the `DefaultIp`, `AfricaIp` and `AmericaIp` parameters in `parameters.json`

Now deploy `GeolocationPolicy`

```bash
$ aws cloudformation deploy --template-file GeolocationPolicy.yaml  --stack-name GeolocationPolicy --region eu-west-2 --parameter-overrides file://parameters.json
```

**Testing**

1. Use the browser to visit the domain - http://geolocation.goodguys.click.
2. You should be directed to the proper EC2 instance bases on your geographic location.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```
$ aws cloudformation describe-stack-events --stack-name GeolocationPolicy
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name DefaultEc2 --region eu-west-2
$ aws cloudformation delete-stack --stack-name AfricaEc2 --region af-south-1
$ aws cloudformation delete-stack --stack-name AmericaEc2 --region us-east-1
$ aws cloudformation delete-stack --stack-name GeolocationPolicy --region eu-west-2
```
