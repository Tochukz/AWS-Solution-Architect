# Lesson 127: Beanstalk Hands On

### Description

Elastic Beanstalk is an orchestration service. It deploys all the resources needed to launch a scalable web application.
This means that after successful deploy of the Elastic Beanstalk application, you will find a few resources already provisioned for you.
For example, you will find

- Running EC2 instance
- Auto Scaling Group
- Elastic IP
- Security Group

This configuration configures resources for Elastic Beanstalk application.
The `AWS::ElasticBeanstalk::Environment` resource when created, launches a CloudFormation stack of it's own.
The underlying stack is made up of the following resources:

- `AWS::AutoScaling::AutoScalingGroup`
- `AWS::EC2::LaunchTemplate`
- `AWS::EC2::EIP`
- `AWS::EC2::SecurityGroup`
- `AWS::EC2::SecurityGroupIngress`

And it uses `AWS::CloudFormation::WaitConditionHandle` to coordinate the creation of the resources in it's stack.

This configuration deploy an Elastic Beanstalk application

### Operation

**Deployment**

Lint the template

```bash
$ cfn-lint BeanStalkApp.yaml
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

$ aws cloudformation deploy --stack-name BeanStalkApp --template-file BeanStalkApp.yaml --capabilities CAPABILITY_NAMED_IAM
```

**Testing**

**Debug Errors**
When the _Environment_ resource, `AWS::ElasticBeanstalk::Environment`, is created, it in turn creates a CloudFormation stack of it's own as describe above in the description.
In some cases, your stack deployment may pass but the underlying stack created by the _Environment_ will fail.
It is therefore imperative that you check the CloudFormation console to make sure the underlying stack created by the Environment resource is also successfully created.

In the case of error during deployment, in the main stack, checkout the stack events leading to the failure

```bash
$ aws cloudformation describe-stack-events --stack-name BeanStalkApp
```

And also, go to the CloudFormation console and checkout the Events of the underlying stack created by the Environment resource.

**Code Error**  
Sometimes the Elastic Beanstalk resources might be successfully deployed but there may be error in the deployed code.
In this case you can go the the Beanstalk console, Select the environment and the go through the the Events to find error events.
Also, you can go to the Logs tab, click on _Request logs_ button and download the logs to learn more about the error.

If you make changes to the code, you can restart the Elastic Beanstalk Environment

```bash
$ aws elasticbeanstalk restart-app-server --environment-name SimpleNodeEnvironment
```

But first you must upload the updated application source bundle to S3 again.

**Cleanup**
To delete the stack

```
$ aws cloudformation delete-stack --stack-name BeanStalkApp
```
