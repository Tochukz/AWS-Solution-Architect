# Web Application Firewall for Application Load Balancer

## Requirement

We need a Web Application Firewall WAF that limits the number of requests that is made to the endpoint of an application load balancer.  

## Operation

**Pre Deployment**  
Create a keyPair if you have not already done so

```bash
$ aws ec2 create-key-pair --key-name DevSimpleKey --query 'KeyMaterial' --output text > dev-simple-key.pem
```

Make the private key file read only

```bash
$  chmod 400 dev-simple-key.pem
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint ALB.yaml
$ cfn-lint WafForAlb.yaml
```

1. Deploy the ALB stack

```bash
$ aws cloudformation deploy --template-file ALB.yaml --stack-name ALB --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://private-parameters.json
```

2. Deploy the WafForAlb stack 
```bash 
$ aws cloudformation deploy --template-file WafForAlb.yaml --stack-name WafForAlb --capabilities CAPABILITY_NAMED_IAM --parameter-overrides "ProtectedPath=/auth/signin" 
# "LoadBalancerArn=arn:aws:elasticloadbalancing:eu-west-1:341324050589:loadbalancer/app/ipt-dev-buddy-alb/03d527b1d60c5a6b"
```

**After Deployment**
Get the PublicIP from the ALB stacks outputs

```bash
$ aws cloudformation describe-stacks --stack-name ALB --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Clean up**

Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name WafForAlb
$ aws cloudformation delete-stack --stack-name ALB
```
