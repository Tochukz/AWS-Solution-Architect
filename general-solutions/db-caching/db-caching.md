# DB Caching

## Requirement

A mobile gaming company is experiencing heavy read traffic to its Amazon Relational Database Service (Amazon RDS) database that retrieves player’s scores and stats. The company is using an Amazon RDS database instance type that is not cost-effective for their budget. The company would like to implement a strategy to deal with the high volume of read traffic, reduce latency, and also downsize the instance size to cut costs.

## Solution

Setup Amazon ElastiCache in front of Amazon RDS

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint DbCaching.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file DbCaching.yaml --stack-name DbCaching
```

**After Deployment**  

**Testing**  

**Clean up**  

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name DbCaching
```
