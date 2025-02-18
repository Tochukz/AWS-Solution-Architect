# Network Load Balancer - HOL-64

### Description

The Demo involves two stacks in two different regions.
The first stack (NLB in eu-west-2), creates a Network Load balancer with TargetGroup running a simple Flask application on EC2 instances.

The second stack (Client in eu-west-3), creates an EC2 instance that will serve as a client to connect to the Network Load Balancer.
This EC2 instance is in a default VPC.  
The associated default ACL of the VPC has rules added to it to only allow outbound traffic to two elastic IPs used in for the EC2 instances in the Target Groups of the NLB.

### Operation

**Before deployment**  
The stack requires an ACM certificate.  
Generate a wild card certificate in you chosen region and use the ARN for the _CertificateArn_ parameter in your parameter.json file.

**Deployment**  
Lint the templates

```bash
$ cfn-lint NLB.yaml
$ cfn-lint Client.yaml
```

1. Deploy the stack NLB stack in `eu-west-2`

```bash
$ aws cloudformation deploy --template-file NLB.yaml --stack-name NLB --region eu-west-2
```

2. Get the _ElasticIpCidr1_ and _ElasticIpCidr2_ output from the NLB stack

```bash
$ aws cloudformation describe-stacks --stack-name NLB --query "Stacks[0].Outputs" --region eu-west-2 --no-cli-pager
```

use the outputs to update the parameter values in `parameters.json` file

3. Deploy the Client stack in `eu-west-3` using the `parameters.json` file as input

```bash
$ aws cloudformation deploy --template-file Client.yaml --stack-name Client --parameter-overrides file://parameters.json --region eu-west-3
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name NLB > events.json
```

**Testing**

1. Get the stack outputs:

```bash
$ aws cloudformation describe-stacks --stack-name NLB --query "Stacks[0].Outputs"  --region eu-west-2 --no-cli-pager
```

2. Use the _DnsName_ to access the Network Load Balancer on the console.

```bash
$ curl simplenlb-944c62bde9c061df.elb.eu-west-2.amazonaws.com:8181
```

You should get the response text: "Welcome to My Custom SaaS App"

3. Go to the EC2 Console in `eu-west-3` region and use EC2 instance connect to SSH into the ClientInstance
4. Make a curl request on the Web Shell interface

```bash
$ curl simplenlb-944c62bde9c061df.elb.eu-west-2.amazonaws.com:8181
```

You should get the response text: "Welcome to My Custom SaaS App".

5. Go back to the Client.yaml template, comment out the NetworkAclRule97 and NetworkAclRule98 resource which both have an _allow_ for RuleAction. Redeploy the Client stack.
6. Try the curl request again on the Web Shell interface. You should no longer the the response text. It should fail.

**Cleanup**  
 To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Client --region eu-west-3
$ aws cloudformation delete-stack --stack-name NLB --region eu-west-2
```
