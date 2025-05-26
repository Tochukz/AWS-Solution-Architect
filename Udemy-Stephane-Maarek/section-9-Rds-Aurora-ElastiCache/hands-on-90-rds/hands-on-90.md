# Lesson 90: RDS - Hands on

### Description

The `RdsDemo.yaml` template configures a RDS instance with an MySQL database engine.  
It also provisions two Read Replica in different availability zones of the same region.

The `RegionalReplica.yaml` template takes the ARN of the Primary DB instance in the `RdsDemo` stack above, as a parameter, and uses it to create a Cross Regional Read Replica.

### Operation

**Deployment**

Lint the template

```bash
$ cfn-lint RdsDemo.yaml
$ cfn-lint RegionalReplica.yaml
```

Setup your DB master username and password in `env.sh` (copied from `sample-env.sh`) and then export it to the terminal

```bash
$ cp sample-env.sh env.sh
# Update env.sh with your choosen DB username and password
$ . ./env.sh
```

Now that the master username and password are available as environment variables you can deploy the first stack

```bash

$ aws cloudformation deploy \
  --stack-name RdsDemo \
  --template-file RdsDemo.yaml \
  --parameter-overrides MasterUsername=${User} MasterPassword=${Pass}
```

Next get the output

```bash
$  aws cloudformation describe-stacks --stack-name RdsDemo --query "Stacks[0].Outputs" --no-cli-pager
```

Copy the value of the `PrimaryDbArn` output and use it for the `PrimaryDbArn` parameter in the `RegionalReplica.yaml` template.  
Now deploy the RegionalReplica stack in a different region.

```bash
$ aws cloudformation deploy --template-file RegionalReplica.yaml --stack-name RegionalReplica  --region eu-west-1
```

**Testing**  
Use the Primary DB host endpoint to connect to the database using a database client of your choice. You can do SELETE, CREATE, UPDATE and DELETE operations.

Use the Read Replicas' host endpoint to connect to their instances using you favourate database client. You can only do SELECT operation on this read replicas.

When getting the Output for the `ReginalReplica` stack, remeber to use the same region you used in creating the stack

```bash
$  aws cloudformation describe-stacks --stack-name RegionalReplica --query "Stacks[0].Outputs" --no-cli-pager --region eu-west-1
```

**Debug Errors**
In the case of error during deployment, checkout the stack events

```

$ aws cloudformation describe-stack-events --stack-name RdsDemo

```

**Cleanup**
To delete the stacks

```
$ aws cloudformation delete-stack --stack-name RegionalReplica --region eu-west-1
$ aws cloudformation delete-stack --stack-name RdsDemo

```
