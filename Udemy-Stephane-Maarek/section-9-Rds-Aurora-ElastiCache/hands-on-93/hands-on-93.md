# Lesson 90: Aurora - Hands on

### Description

This configuration provisions and Aurora MySQL database cluster.

### Operation

**Deployment**

Lint the template

```bash
$ cfn-lint AuroraDemo.yaml
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
  --stack-name AuroraDemo \
  --template-file AuroraDemo.yaml \
  --parameter-overrides MasterUsername=${User} MasterPassword=${Pass}
```

**Testing**
Get the cluster end endpoint, database endpoint and cluster read endpoint from the stack outputs.

```bash
$  aws cloudformation describe-stacks --stack-name RegionalReplica --query "Stacks[0].Outputs" --no-cli-pager --region eu-west-1
```

You can use any of the endpoint together with the Master username and password to connect to the database instance.

**Debug Errors**
In the case of error during deployment, checkout the stack events leading to the failure

```bash
$ aws cloudformation describe-stack-events --stack-name AuroraDemo
```

**Cleanup**
To delete the stack

```
$ aws cloudformation delete-stack --stack-name AuroraDemo
```

**Useful commands**  
To list all of the available engine versions for Aurora MySQL

```bash
$ aws rds describe-db-engine-versions --engine aurora-mysql --query "DBEngineVersions[].EngineVersion
```

To list all the engine version for MySQL, PostgreSQL or Aurora PostgreSQL just replace the `--engine` value by `mysql`, `postgres` or `aurora-postgresql` respectively.
