# Lesson 247: Athena - Hands On

### Description

**About Athena**  
Amazon Athena allows querying structured data stored in Amazon S3 using SQL .
Athena also supports query a whole lot of other data sources such as SQL Database, No SQL Database, CloudWatch Logs, CloudTrail Logs etc.

**About the configuration**
This template configures an Amazon Glue Database and Glue table to support an existing CloudTrail logs.  
The data from the CloudTrail logs can then be queried from the Glue table using Athena query editor on Athena Console.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint AthenaForCloudTrail.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file AthenaForCloudTrail.yaml  --stack-name AthenaForCloudTrail
```

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name AthenaForCloudTrail > events.json
```

**Cleanup**  
Empty S3 bucket
```bash
$ aws s3 rm s3://athena-query-results-314146339647-eu-west-2/ --recursive
```
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name AthenaForCloudTrail
```

### Working with Athena Console

**Working with Athena Query Editor**

1. Create an S3 bucket to store the results of your query (one is defined in Athena.yaml).
2. Launch the Query Editor on Athena Console
3. Go to the _Settings_ tab > _Manage_ and enter you S3 bucket name in the _Location of query result_ input box > Save

**Running Queries on Athena**

1. Create a database to store results

```sql
create database my_bucket_db;
```

**Querying CloudTrail Logs with Athena**  
First you created Athena Table (Glue Table) from CloudTrial Console, then you query the table on Athena Console.

1. Open the CloudTrail Console
2. Choose Trails, and then note the name of the S3 bucket that contains the CloudTrail logs
3. Now, go to _Event history_ and click the _Create Athena table_ button
4. Under _Storage location_, select the S3 bucket that contains the CloudTrail logs
5. Click the _Create table_ button
6. Go to the Athena Console > Query Editor
7. Make sure the default Database is selected and you should see the newly created table under _Tables_
8. Write a query and click the Run button

```sql
SELECT * FROM "default"."cloudtrail_logs_dev_cloudtrail_storage" limit 10;
```

[Learn more](https://repost.aws/knowledge-center/athena-tables-search-cloudtrail-logs)
