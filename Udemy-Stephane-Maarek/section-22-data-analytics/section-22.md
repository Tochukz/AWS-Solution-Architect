# Section 22: Data and Analytics

## Amazon Athena
__Introduction__
* Serverless query service to analyze data stored in Amazon S3
* Uses standard SQL language to query files (built on Presto)
* It supports CSV, JSON, ORC, Avro and Parquet
* Pricing: $5 per TB of data scanned
* Commonly used with _Amazon Quciksight_ for reporting/dashboards

__Use cases__
* Business intelligence/analytics/reporting,
* Analyze & query VPC Flow Logs, ELB Logs, CloudTrail trails, etc

__Exam Tip__
Anytime you need to analyze data in S3 using Serverless SQL, use Athena.  

__Athena - Performance Improvement__  
Amazon charges you per TB of data scanned when you use Athena. For this reason you need to use the best data format, where you scan less data, for you data analysis.
* Use columnar data for cost-savings (less scan), only scan the column you need
  - _Apache Parquet_ or _ORC_ are the recommended data format
  - They offer huge performance improvement
  - Use _Amazon Glue_ to convert you data to Parquet or ORC format. e.g using ETL job, convert from CSV to Parquet.
* Compress you data for smaller retrievals (bzip2, gzip, Iz4, snappy, zlip, zstd...)
* Partition your dataset in S3 for easy querying on virtual columns
  - Format - s3://your-bucket/path-to-table/column_name1=value/column_name2=value/etc
  - Example - s3://athena-examples/flight/parquet/year=1991/month=1/day=1
* Use larger files (> 128MB) to minimize overhead i.e one large file is more efficient than may small files

__Amazon Athena - Federated Query__  
* With Athena you can also run SQL queries across data stored in relational, non-relational, object, and custom data sources (AWS or on-premises)
* To query data on other data sources such as listed above, you use _Data Source Connectors_ that run on AWS Lambda to run Federated Queries on data sources such as CloudWatch Logs, DynamoDB, RDS, ElasticCache etc
* You will need one Lambda function Data source connector per data source
* The result of you query can be stored in you Amazon S3 bucket for later analysis.  

## Amazon RedShift
__Introduction__   
* Redshift is based on PostgreSQL, but it is not used for OnLine Transaction Processing (OLTP)
* It is used for Online Analytical Processing (OLAP), i.e for analytics and data warehousing
* It provided 10 times better performance than other data warehouses and scales to PetaBytes of data
* It store data in columns, i.e Columnar storage of data and does parallel query
* It has a SQL interface for performing queries
* Business Intelligence tools such as Amazon Quicksight or Tableau are integrated to RedShift

__Redshift versus Athena__  
* Redshift have faster queries (join/aggregations) than _Athena_, thanks to indexes
* You have to provision Redshift cluster to use it but Athena is Serverless only and all it's data lives in S3 buckets.

__Redshift Cluster__  
There are 3 type of Redshift Cluster node
1. __Leader node__: for query planning and result aggregation
2. __Compute node__: for performing the queries, send results to leader

There are two Cluster modes to select from when provisioning Redshift Cluster
1. __Provisioned mode__
  - You can choose you instance types in advance
  - You can reserve instances and save on cost
2. __Serverless mode__  
  - AWS manages the resources for you

__Redshift - Snapshot and Disaster Recovery__  
* Redshift has MultiAZ mode for some cluster
* Snapshots are point-in-time backups of a cluster, stored internally in S3
* Snapshots are incremental (only what has changed is saved)
* You can restore a snapshot into a new cluster
* Automated every 8 hours, every 5 GB or on a schedule. Set retention
* Manual snapshot is retained until you delete it
* You can configure Amazon Redshift to automatically copy snapshots, automated or manual, of  a cluster to another AWS region.

__Loading Data into Redshift__   
There are three ways to load data into redshift
1. Load data through _Amazon Kinesis Data Firehose_  
2. From S3 using copy command
3. From EC2 using the JDBC driver

It is better to load large data into Redshift at a time than small data

__Redshift Spectrum__  
* With Redshift Spectrum you can query data in S3 without loading it into Redshift
* You need to have Redshift cluster before you can do the query
* The query is then submitted to thousands of Redshift Spectrum nodes
* The Redshift spectrum nodes then read the Data from Amazon S3, perform some aggregation and send back to the results into you own Amazon Redshift Cluster.

## Amazon OpenSearch Service
__Introduction__  
* _Amazon OpenSearch_ is successor to _Amazon ElasticSearch_
* In DynamoDB queries only exist by primary key or indexes...
* With OpenSearch, you can search any field, even partial matches
* It is common to use OpenSearch as complement to another database
* There are two modes for OpenSearch
  - Managed Cluster
  - Serverless Cluster
* OpenSearch does not natively support SQL but can be enabled via a plugin
* Data can be Ingested in OpenSearch from
 - Kinesis Data Firehose
 - AWS IoT
 - CloudWatch Logs
* Security features includes the integratoion of Cognito and IAM, KMS encryption, TLS
* OpenSearch dashboard provides visualization of data

## Amazon Elastic MapReduce (EMR)  
__Introduction__  
* EMR helps you create _Hadoop clusters (Big Data)_ to analyze and process vast amount of data
* The clusters can be made of _hundreds of EC2 instances_
* EMR comes bundled with lots of tools that Big Data  specialist use, such as _Apache Spark_, _HBase_, _Presto_, _Flink_ which are difficult to setup.  
* EMR takes care of all the provisioning and configuration of all those services for you
* EMR supports auto-scaling and is integrated with Spot instances

__Use cases for EMR__  
* Data processing
* Machine learning
* Web indexing
* Big data

__Amazon EMR Node types__   
Amazon EMR is made of up clusters of EC2 instances.  
There are different types of nodes
* __Master Node__: It manages the cluster, coordinates and manage the health of all the other node  and they must be long running
* __Core Node__: The core node are for running task, storing data and they must be long running
* __Task Node__: They just run Task, and are usually Spot instances. They are optional.

__EMR Purchasing Options__   
* __On-demand__ - They are reliable, predictable, and won't be terminated
* __Reserved__ - EMR will automatically use reserve instance if available
* __Spot Instances__ - They are cheaper but can be terminated at any time, less reliable  

## Amazon QuickSight  
__Introduction__  
Amazon QuickSight  is a Serverless machine powered _Business Intelligence Service_. It is used to create interactive dashboards.
QuickSight is fas, automatically scalable and you can embed the dashboard on websites and you get per-session pricing.  
Enterprise edition of QuickSight supports Column-Level Security (CLS) which prevent some columns from being displayed for some users who don't have enough access right.  

__Use cases for QuickSight__  
* Business analytics
* Building visualizations
* Performing ad-hoc analysis
* Getting business insight from data

__QuickSight Spice Engine__  
Spice is an in-memory computation engine that only work when you import data directly into Amazon QuickSight.
It doesn't work when QuickSight is connected into another database.

__QuickSight integration__  
QuickSight can integrate with a lot of AWS services, third party services and on-premise application. You can also import data directly into QuickSight.
The following are data sources for QuickSight
* AWS Services
  - RDS, Aurora, RedShift
  - Athena, S3, OpenSearch
  - TimeStream
* Third Party Application
  - SalesForce
  - Jira
* On-Premise
  - Database (with JDBC protocol)
* Data Imports
  - xlsx, csv, json
  - tsv, EFL & CLF (Log Format)

__QuickSight Users and Groups__  
QuickSigh support Users for Standard version and Groups for (enterprise version).  
The Users and Groups only exist within QuickSight and not IAM.

__QuickSight Dashboard and Analysis__  
A dashboard os a readonly snapshot of an analysis that you can share.   
A dashboard preserves the configuration of the analysis such as filtering, parameters, controls, sort.  
You can share the analysis or the dashboard with Users or Groups  
To share a dashboard, you must first publish it after which users who you share the dashboard with can also see the underlying data.  

## AWS Glue
__Introduction__  


[Big Data Analytics Options on AWS](https://docs.aws.amazon.com/pdfs/whitepapers/latest/big-data-analytics-options/big-data-analytics-options.pdf)
