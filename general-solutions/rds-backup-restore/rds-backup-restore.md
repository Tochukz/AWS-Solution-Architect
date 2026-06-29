# RDS Backup and Restore
## Backup an RDS instance and restore it to another RDS instance

## Requirement

We need to backup and existing RDS instance and then restore it to another RDS instance  

## Operation

**Pre Deployment**  

Create a snapshot of the existing database instance 
```bash 
$ aws rds create-db-snapshot --db-instance-identifier my-source-db --db-snapshot-identifier my-source-db-backup
```
Go to the RDS console > Selected the Instance > Maintenance & backup tab > look for the snapshot by the db-snapshot-identifier supplied during creation.  
Wait for the snapshot to be created.  

**Deployment**  
Lint the templates

```bash
$ cfn-lint RdsBackupRestore.yaml.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file RdsBackupRestore.yaml --stack-name RdsBackupRestore --parameter-overrides file://secret-parameters.json
```

**After Deployment**

Get the `DBInstanceEndpoint` form the stack outputs 
```bash
$ aws cloudformation describe-stacks --stack-name RdsBackupRestore --query "Stacks[0].Outputs" --no-cli-pager
```

Use the `DBInstanceEndpoint` and login credential from the original database, from which the Snapshot was created, to login to the DB instance. 


**Testing**

**Clean up**

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name RdsBackupRestore
```
