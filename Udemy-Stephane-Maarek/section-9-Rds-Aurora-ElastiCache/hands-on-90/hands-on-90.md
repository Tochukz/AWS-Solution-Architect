# Lesson 87: RDS - Hands on

### Description

This template configures and RDS instance with an MySQL database engine.

### Operation

**Deployment**

Lint the template

```
$ cfn-lint RdsDemo.yaml
```

Setup your DB master username and password in `env.sh` and then export it to the terminal

```bash
$ . ./env.sh
```

Now that the master username and password are available as environment variables you can deploy the stack

```bash

$ aws cloudformation deploy \
  --stack-name RdsDemo \
  --template-file RdsDemo.yaml \
  --parameter-overrides MasterUsername=${User} MasterPassword=${Pass}
```

Get the load balancer Dns name and instance Ids from the stack outputs

```
$ aws cloudformation describe-stacks --stack-name RdsDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Use the RDS Host endpoint to connect to the database using a Database client of your choice.

**Debug Errors**
In the case of error during deployment, checkout the stack events

```

$ aws cloudformation describe-stack-events --stack-name RdsDemo

```

**Cleanup**
To delete the stacks

```

$ aws cloudformation delete-stack --stack-name RdsDemo

```
