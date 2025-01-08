# Lesson 127B: Beanstalk Hands On with Variation

### Description

This configuration is a variation of hands-on-127.
It used `ConfigurationTemplate` for it's Beanstalk Environment resource.
It also configures the use of _Elastic Load Balancer_ for the Beanstalk Environment.

### Operation

**Deployment**

Lint the template

```bash
$ cfn-lint BeanStalkAppB.yaml
```

Create and deploy the application source bundle to S3

```bash
$ cd express-app
$ zip -r ../express-app.zip *
$ cd ../
$ aws s3 cp express-app.zip s3://chucks-workspace-storage/beanstalk-artifacts/express-app.zip
```

Note that it is very important that the parent directory should not be included in the source bundle.
Instead only the content of the parent directory should be zipped like shown above.

Deploy the stack

```bash

$ aws cloudformation deploy --stack-name BeanStalkAppB --template-file BeanStalkAppB.yaml --capabilities CAPABILITY_NAMED_IAM
```

**Testing**
Get the Environment URL and Elb URL from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name BeanStalkAppB --query "Stacks[0].Outputs" --no-cli-pager
```

Use the Environment URL or ELB URL on a browser to test the application.

**Debug Errors**
In the case of error during deployment, in the main stack, checkout the stack events leading to the failure

```bash
$ aws cloudformation describe-stack-events --stack-name BeanStalkAppB
```

And also, go to the CloudFormation console and checkout the Events of the underlying stack created by the Environment resource.

**Cleanup**
To delete the stack

```
$ aws cloudformation delete-stack --stack-name BeanStalkAppB
```
