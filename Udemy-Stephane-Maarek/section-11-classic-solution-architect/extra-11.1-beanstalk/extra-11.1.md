# Extra 11.1: Beanstalk Hands On with Variation

### Description

This configuration is a variation of `hands-on-128-beanstalk`.
It used `ConfigurationTemplate` for it's Beanstalk Environment resource.
It also configures the use of _Elastic Load Balancer_ for the Beanstalk Environment.

### Operation

**Deployment**

Lint the template

```bash
$ cfn-lint BeanStalkExtra.yaml
```

Create and deploy the application source bundle to S3

```bash
$ deploy.sh
```

Note that it is very important that the parent directory should not be included in the source bundle.
Instead only the content of the parent directory should be zipped like shown above.

Deploy the stack

```bash

$ aws cloudformation deploy --stack-name BeanStalkExtra --template-file BeanStalkExtra.yaml --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the `EnvironmentURL` and `ElbUrl` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name BeanStalkExtra --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Use the `EnvironmentURL` or `ElbUrl` on a browser to test the application.

**Debug Errors**  
In the case of error during deployment, in the main stack, checkout the stack events leading to the failure

```bash
$ aws cloudformation describe-stack-events --stack-name BeanStalkExtra
```

And also, go to the CloudFormation console and checkout the Events of the underlying stack created by the Environment resource.

**Cleanup**  
To delete the stack

```
$ aws cloudformation delete-stack --stack-name BeanStalkExtra
```
