# Extra 3.1 -  Bastion Host to RDS Instances

### Description

This copnfiguration shows how we connect to a RDS MySQL and PostgreSQL instance in a private subnet via a bastion host or jump box.  
First we deploy two RDS instances, MySQL and PostgreSQL engines, in a private subnet.  
Next, we setup an EC2 instance in a public subnet that permits us to connect to the databases via TCP/IP over an SSH connection.  

### Operation
**Before Deployment**. 
1. The `Rds` stack requires a ParameterStore Parameter of type `SecureString` which must be named `/shared/db-password` 

2.  The `Bastion` stack requires an existing EC2 `KairPair`. The name of the keypair must be passed as the `KeyName` template parameter. 

**Deployment**  
Lint the template

```bash
$ cfn-lint Rds.yaml
$ cfn-lint Bastion.yaml
```

1. Deploy the RDS stack

```bash
$ aws cloudformation deploy --template-file Rds.yaml --stack-name Rds --parameter-overrides file://private-parameters.json
```

2. Deploy the Bastion stack

```bash
$ aws cloudformation deploy --template-file Bastion.yaml --stack-name Bastion --parameter-overrides file://private-parameters.json
```

**After Deployment**. 
1. Get the RDS endpoint from the stack output from the `Rds` stack 
```bash
$ aws cloudformation describe-stacks --stack-name Rds --query "Stacks[0].Outputs" --no-cli-pager > rds-output.json
```

2. Get the EC2 Public IP from the `Bastion` stack 

```bash 
$ aws cloudformation describe-stacks --stack-name Bastion --query "Stacks[0].Outputs" --no-cli-pager > bastion-output.json
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name Rds > events.json
```

**Testing**

1. Connect to the RDS MySQL instance using _MySQL WorkBench_ 

Field                 | Value
----------------------|---------------------
__Connection Method__:| Standard TCP/IP over SSH   
__SSH Host__:          | 52.214.125.235:22   
__SSH Username__:      | The EC2 user  
__SSH Key File__:      | The EC2 Private Key  
__MySQL Hostname__:    | RDS Endpoint  
__MySQL Server Port__: | 3306  
__Username__:          | RDS DB Username   
__Password__:          | RDS DB Password. 

2. Connect to the RDS PostgreSQL instance using _BeeKeeper Studio_.  

Field | Value
--------------------|-----------------
__Connection Type__:       | postgres  
__Authentication Method__: | Username/Password  
__Connection Mode__:       | Host and Port  
__Host__:                  | RDS Endpoint
__Port__:                  | 5432
__User__:                  | RDS DB User 
__Password__:              | RDS DB Password
__Default Database__:      | DbName
__Enable SSL__:            | ENABLED (Leave it's fields empty)
__SSH Tunnel__:            | ENABlED 
__SSH Host__:              | EC2 Public IP
__Port__:                  | 22
__Bastion Host (Jump Host)__: | Leave empty  
__Keepalive Interval__:    | 60
__SSH Authentication__:    | Key File
__SSH Username__:          | EC2 User 
__Private Key File__:      | EC2 Private Key
__Key File PassPhrase__:   | Leave empty

**Cleanup**  
 To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Bastion
$ aws cloudformation delete-stack --stack-name Rds
```
