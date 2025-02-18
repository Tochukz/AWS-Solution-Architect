# Network Load Balancer - HOL-64

### Description

This configuration creates a Network Load balancer with TargetGroup running a simple Flask application running on EC2 instances.

### Operation

**Before deployment**  
The stack requires an ACM certificate.  
Generate a wild card certificate in you chosen region and use the ARN for the _CertificateArn_ parameter in your parameter.json file.

**Deployment**  
Lint the template

```bash
$ cfn-lint SecureListener.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file SecureListener.yaml --stack-name SecureListener --parameter-overrides file://secret-parameters.json
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name SecureListener > events.json
```

**Testing**  
Get the stack outputs:

```bash
$ aws cloudformation describe-stacks --stack-name SecureListener --query "Stacks[0].Outputs"  --no-cli-pager
```

Use the _HttpHost_ and _HttpsHost_ outputs to access the application on a Browser.

**Cleanup**  
 To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SecureListener
```
