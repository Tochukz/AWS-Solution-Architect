# Extra 10.1 - ECS Service with Application Load Balancer and SSL

### Description

This configuration build on `extra-10.2` which configures an Application Load Balancer to an ECS service.  
Here we add an HTTPS listener and configure a Route53 ReecordSet to provide SSL on the custom domain name.

### Operation

**Before deployment**

**Deployment**

Lint the template

```bash
$ cfn-lint SecuredAlbEcs.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SecuredAlbEcs.yaml --stack-name SecuredAlbEcs  --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://secret-parameters.json
```

**After deployment**

**Testing**  
Use the `SubdomainName` to access the application on a web browser - https://alb.goodguys.click

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SecuredAlbEcs
```
