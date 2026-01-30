# Extra 3.1 -  Bastion Host to RDS Instances

### Description

This copnfiguration shows how we connect to a RDS MySQL and PostgreSQL instance in a private subnet via a bastion host or jump box.  
First we deploy two RDS instances, MySQL and PostgreSQL engines, in a private subnet.  
Next, we setup an EC2 instance in a public subnet that permits us to connect to the databases via TCP/IP over an SSH connection.  

### Operation

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

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name Rds > events.json
```

**Testing**

1. Connect to the RDS MySQL instance using _MySQL WorkBench_ 

__Connection Method__: Standard TCP/IP over SSH   
__SSH Host__:          52.214.125.235:22   
__SSH Username__:      The EC2 user  
__SSH Key File__:      The EC2 Private Key  
__MySQL Hostname__:    RDS Endpoint  
__MySQL Server Port__: 3306  
__Username__:          RDS DB Username   
__Password__:          RDS DB Password. 

2. Connect to the RDS PostgreSQL instance using _BeeKeeper Studio_.  

__Connection Type__: postgres  
__Authentication Method__: Username/Password  
__Connection Mode__:  Host and Port  
__Host__: RDS Endpoint

**Cleanup**  
 To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Bastion
$ aws cloudformation delete-stack --stack-name Rds
```
