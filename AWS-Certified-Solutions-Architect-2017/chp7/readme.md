## Chapter 7: Databases and AWS  
#### Database Primer
__Relational Databases__   
A relational database can be categorized as either an _Online Transaction Processing (OLTP)_ or _Online Analytic Processing (OLAP)_ database  system.  OLTP refers to transaction-oriented applications that are frequently writing and changing data. OLAP is typically the domain of data warehouses and refers to reporting or analyzing large data sets.

__Data Warehouses__  
Data warehouse are specialized type of relational database that can be used for reporting and analysis via OLAP. Data warehouse are also typically updated on a batch schedule multiple times per day or per hour compared to an OLTP relational database that can be updated thousands of times per second. OLTP transactions may occur frequently and are relatively simple. OLAP transaction occurs much less frequently but are much more complex.    
_Amazon RDS_ is often used for OLTP workloads, but it can also be used for OLAP. _Amazon Redshift_ is a high-performance data warehouse designed specifically for OLAP use cases.

__NoSQL Databases__  
Traditional relational databases are difficult to scale beyond a single server without significant engineering and cost, but a NoSQL architecture allows for horizontal scalability on commodity hardware.   
A common use case for NoSQL is managing user session state, user profile, shopping cart data, or time-series data.    
You can use Amazon Dynamo DB to build a distributed cluster spanning multiple data centers.   

__Amazon Relational Database Service (Amazon RDS)__   
Amazon RDS exposes a database endpoint to which client software can connect and execute SQL. Amazon RDS does not provide shell access to Database Instances, and it restricts access to certain system procedures and tables that require advanced privileges.  

__Database Instances__   
You can launch a new DB Instance by calling the `CreateDBInstance` API or by using the AWS Management Console. Existing DB Instances can be changed or resized using the `ModifyDBInstance` API.   
The range of DB Instance clases extends from `db.t2.micro` with 1 virtual CPU (vCPU) and 1GB of memory, up to a `db.r3.8xlarge` with 32 vCPU and 244 GB of memory.  You can change the instance class and the balance of compute of memory, and Amazon RDS will migrate your data to a larger or smaller instance class.    
Independent from the DB Instance class that you select, you can also control  the size and performance characteristics of the storage used.     
Many features and common configuration settings are exposed and managed using _DB parameter groups_ and _DB option groups_.     

A `DB parameter groups` acts as a container for engine configuration values that can be applied to one or more DB Instances. A reboot is required if you change the _DB parameter group_ for an existing instance.    
A `DB option groups` acts as a container for engine features which is empty by default. In order to enable specific features of a DB engine, you create a new _DB option group_ and configure the settings accordingly.  

__Tip__  
You can use native tools and techniques to migrate your database to Amazon RDS. For example, you can use `mysqldump` to export you MySQL database and import the file into RDS MySQL. You can also use `AWS Database Migration Service`, which has a GUI, for migration of schema and data, it also help convert database from one database engine to another.    

__Operational Benefits__  
In Amazon RDS, you cannot use Secure Shell (SSH) to log into the host instance and install a custom piece of software. You can, however, connect using SQL administrator tools or use _DB option groups_ and _DB parameter groups_ to change the behavior or feature configuration for a DB Instance. If you want full control of the Operating System or require elevated permissions to run, then consider installing your database on Amazon EC2 instead of Amazon RDS.  

#### Database Engines  
__MySQL__  
Amazon RDS for MySQL runs the open source Community Edition of MySQL with `InnoDB` as the default and  recommended database storage engine. It supports MySQL versions 5.6.x through 8.0.x also supports _Multi-AZ_ deployments for high availability and _read replicas_ for horizontal scaling.  

__PostgreSQL__  
Amazon RDS support PostgreSQL version 9.6.1 through 152.5.x. Amazon RDS PostgreSQL can be managed using standard tools like _pgAdmin_ and supports JDBC/ODBC drivers. Amazon RDS PostgreSQL also support _Multi-AZ_ deployment for high availability _and read replicas_ for horizontal scaling.  

__MariaDB__  
MariaDB adds features that enhance the performance, availability, and scalability of MySQL. Amazon RDS supports MariaDB version 10.x.x, it also supports the `XtraDB` storage engine for MariaDB DB Instances. Also _Multi-AZ_ deployment and _read replicas_ are supported.  

__Oracle__  
Amazon RDS Oracle supports versions 11.2.0.4 through 19.0.0.0 and four editions.

__Comparing Amazon RDS Oracle Editions__  

Edition      | vCPU     | Multi-AZ | Encryption    |
-------------|----------|----------|---------------|
Standard     | up to 32 | Yes      |  KMS          |
Standard One | up to 16 | Yes      |  KMS          |
Standard two | up to 16 | Yes      |               |
Enterprise   |          | Yes      |  KMS and TDE  |

_Standard Edition Two_ is a replacement for _Standard Edition_ and _Standard Edition One_.  

__Microsoft SQL Server__   
Amazon RDS support SQL Server version 2012 through 2019 and four editions  

__Comparing Amazon RDS SQL Server Editions__  

Edition    | Performance | Multi-AZ | Encryption  |  
-----------|-------------|----------|-------------|
Express    | +           | No       | KMS         |
Web        | ++++        | No       | KMS         |
Standard   | ++++        | Yes      | KMS         |
Enterprise | ++++++++    | Yes      | KMD and TDE |

__Licensing for SQL Server and Oracle__  
AWS offers two licensing models: License Included and Bring You Own License (BYOL)   
__License Included__  
For Oracle, License Included provides licensing for Standard Edition one. For SQL Server, License Included provides licensing for SQL Server Express Edition, Web Edition and Standard Edition.  
__Bring You Own License (BYOL)__  
For Oracle, you can bring over Standard Edition, One, Standard Edition and Enterprise Edition. For SQL Server, you provide your won license under the Microsoft License Mobility program. You can bring over Microsoft Standard Edition and also Enterprise Edition.  

__Amazon Aurora__   
Amazon Aurora can deliver up to five times the performance of MySQL without requiring changes to most of your existing web applications.   
When you first create an Amazon Aurora instance, you create a DB cluster.  
An Amazon Aurora cluster volume is a virtual database storage volume that spans multiple Availability Zones, with each Availability Zone having a copy of the cluster data. There are two types of Aurora instances:  
1. __Primary Instance__: The main instance which supports read and write workload. Each DB cluster have one primary instance.
2. __Amazon Aurora__: The secondary instance that supports only read operations. You can have up to 15 Amazon Aurora Replicas.  

#### Storage Options
Amazon RDS uses Amazon EBS for storage. Depending on your database engine and workload, you can scale up to 4TB to 6TB in provisioned storage and up to 30,000 IOPS.  The ere three storage types  

__Amazon RDS Storage Types__  

Storage Type             | Size  | Performance | Cost  |
-------------------------|-------|-------------|-------|
Magnetic / Standard      | +++   | +           | ++    |
Genera Purpose/gp2 (SSD) | +++++ | +++         | +++   |
Provisioned IOPS (SSD)   | +++++ | +++++       | +++++ |

#### Backup and Recovery  
For Backup, you can use _automated backup_, _manual snapshot_ or both. For recovery you need to define you _Recovery Point Objective (RPO)_ and you _Recovery Time Objective (RTO)_.  
__RTO__ is the maximum period of data loss that is acceptable in the event of a failure. For example, a system may backup transaction logs every 15 minutes to minimize data loss in the event of a failure of accidental deletion.
__RTO__ is the maximum amount of downtime that is permitted to recover from backup and to resume processing. For example, a large database may take hours to restore from a full backup.  

__Automated Backups__  
Amazon RDS creates a storage volume snapshot of you DB instance. By default one day of backups will be retained but you can modify the _backup retention period_ up to a maximum of 35 days.  
Automated backups will occur daily during a configurable 30-minute maintenance window called the _backup window_.   

__Manual DB Snapshots__  
DB snapshots can be created with the Amazon RDS console or the `CreateDBSnapshot` action. Unlike automated snapshots that are deleted after the retention period, manual DB snapshots are kept until you explicitly delete them with the Amazon RDS console or the `DeleteSnapshot` action.  

__Tip__: During the backup window, storage I/O may be suspended while your data is being backed up, any your may experience elevated latency. This I/O suspension typically lasts for the duration of the snapshot. This period of I/O suspension is shorter for Multi-A DB deployments.

__Recovery__  
You cannot restore from a DB snapshot to an existing DB Instance; a new DB Instance is created when you restore.  

__High Availability with Multi-AZ__   
Multi-AZ lets you meet the most demanding PRO and RTO targets by using synchronous replication to minimize RPO and fast failover to minimize RTO to minutes.   
When you create a Multi-AZ DB Instance, a primary instance is created in one Availability Zone and a secondary instance is created in another Availability Zone. You are then assigned a database instance endpoint such as _my_app_db.ch6fe7ykq1zd.us-west-2.rds.amazonaws.com_.  
Amazon RDS automatically perform a failover to a standby instance in any event of failure. The time for automatic failover to complete is typically one to two minutes.  
__Tip__: Multi-AZ deployments are for disaster recovery only; they are not meant to enhance database performance. To improve database performance, using multiple DB Instances, use read replicas or other DB caching technologies such as `Amazon ElastiCache`.  

__Scaling Up and Out__  
Amazon RDS allows you to scale compute and storage vertically, and for some DB engine, you can scale horizontally.

__Vertical Scalability__   
Changes can be scheduled to occure during the next maintenance window or to begin immediately using the `ModifyDBInstance` action.  
After you select a larger or smaller DB Instance class, Amazon RDS automated the migration process to a new class with only a short disruption and minimal effort.    
Storage expansion is supported for all of the database engine except for SQL Server.  

__Horizontal Scalability with Partitioning__  
Partitioning, or _sharding_, allows you to scale horizontally to handle more users and requests by using multiple instances but requires additional login in the application layer. NoSQL database like Amazon DynamoDB or Cassandra are designed to scale horizontally.  

__Horizontal Scalability with Read Replicas__  
Amazon RDS supports read replicas DB Instances that allow you to scale out elastically beyond the constraints of a single DB Instance for read-heavy database workload.   
Amazon RDS support Read replicas for MySQL, PostgreSQL, MariaDB, and Amazon Aurora. It uses the built-in replication functionality of the DB engines (MySQL, PostgreSQL, MariaDB)  to create a special type of DB Instance, called a read replica from a source DB Instance.   

__Tip__:  You can use cross-region read replicas to reduce global latencies or migrate database across AWS regions.  

__Security__  
Some key administrator actions that can be controlled in IAM include `CreateDBInstance` and `DeleteDBInstance`.  Encryption at rest is possible for all engine using the _Amazon Key Management Service(KMS)_ or _Transparent Data Encryption (TDE)_.  

#### Amazon Redshift  
With connectivity via ODBC or JDBC, Amazon Redshift integrates well with various data loading, reporting, data mining, and analytics tools. Amazon Redshift is based on industry-standard PostgreSQL, so most SQL client application will work with only minimal changes.  

__Cluster and Nodes__   
An Amazon Redshift cluster is composed of a leader node and one or more compute nodes. The client application interacts directly only with the leader node. Amazon Redshift support six node types which are categorized into _Dense Compute_ and _Dense Storage_. Dense Compute node types supports clusters up to 326TB using fast SSDs, while Dense Storage nodes support clusters up to 2 PB using large magnetic disks.  
Whenever you perform a resize operation, Amazon Redshift will create a new cluster and migrate data from the old to the new one. Curing a resize operation, the database will become read-only until the operation is finished.


__Table Design__  
Amazon Redshift `CREATE TABLE` command also supports specifying compressions encodings, distribution strategy, and sort keys.  

__Compression Encoding__  
You can specify compression encoding on per-column basis as part of the `CREATE TABLE` command or Amazon Redshift will automatically select the best compression schema for each column when you load data for the first time.  

__Distribution Strategy__   
When creating a table, you can chose between one of three distribution styles: EVEN, KEY, or ALL.
__EVEN distribution__ The default, which distribute data across slices uniformly.  
__KEY distribution__  The rows are distributed according to the value in one column.  
__ALL distribution__  This is useful for lookup tables and other large tables that are not updated frequently.  

__Sort Keys__  
The sort keys for a table can be either compound or interleaved.  

__Loading Data__  
For bulk operations, Amazon Redshift provides the `COPY` command as a much more efficient alternative than repeatedly calling `INSERT`.  
After each bulk data load that modifies a significant amount of data, you will need to perform a `VACUUM` command to reorganize you data and reclaim space after deletes. It is also recommended to run an `ANALYZE` command to update table statistics.  
Data can also be exported out of Amazon Redshift using the `UNLOAD` command.  
__TIP__ The fastest way to load data into Amazon Redshift is doing bulk data loads from flat files stores in an Amazon Simple storage Service (Amazon S3) bucket or from an Amazon DynamoDB table.  

__Querying Data__  
You can monitor the performance of the cluster and specific queries using _Amazon CloudWatch_ and the Amazon Redshift web console.   
For large Amazon Redshift clusters supporting may uses, you can configure _Workload Management (WLM)_ to queue and prioritize queries.   

__Snapshots__  
Amazon Redshift support both automated snapshots and manual snapshots just like Amazon RDS.  

__Security__  
There are multiple layers of security
* at the infrastructure level using IAM policies
* at the network level using private subnet, security groups and Access Control Lists.
* at the database level using database users, groups and permissions to database objects.
* with data on transit using encrypti0n such as SSL-encrypted connections
* with data at rest using KMS and _AWS CloudHSM_ for encryption key management.

#### Amazon DynamoDB  
Amazon DynamoDB can provide consistent performance levels by automatically distributing the data and traffic for a table over multiple partitions. As you demand changes overtime, you can adjust the read or write capacity after a table has been created, and  Amazon DynamoDB will add or remove infrastructure and adjust the internal partitioning accordingly.  
Amazon also provides automatic replication of data across multiple Availability Zones with an AWS Region.  

__Data Model__  
Individual items in an Amazon DynamoDB table can have any number of attributes although there is a limit of 400KB on the item size.  
Applications can connect to the Amazon DynamoDB service endpoint and submit request over HTTP/S to read and write items to a table or even to create and delete tabled.  DynamoDB provides a web service API that accept requests in JSON format. You can program directly against the web service API endpoint or you can use AWS SDK to interact with the tables.  

__Data Types__  
When you create a table or secondary index, you must specify the names and datatypes of each primary key attributes (partition key and sort key). Attribute datatypes fall into three major categories:  Scalar, Set, or Document.  

__Scalar Data Types__ Represents exactly one value:   
* String
* Number
* Binary
* Boolean
* Null  

__Set Data Types__ Represents a unique list of one or more scalar value. Each value in a set must be unique and the same data type:  
* String Set
* Number Set
* Binary Set  

__Document Data Types__  Represents multiple nested attributes similar to the structure of a JSON file.  
* List: An ordered list of attributes of any/different data types
* Map: Un unordered list of key/value pair. Can be used to represent JSON  

__Primary Key__  
Amazon supports two types of primary keys, and this configurations cannot be changed after a table has been created:  
__Partition Key__ The primary key is made of one attribute, a partition (or hash)  

__Partition and Sort Key__  The primary key is made of two attributes. A partition kay and a sort (or range) key. Each item in the table is uniquely identified by the combination of its partition and sort key values.  

__Tip__ If you are performing many reads or writes per second on the same primary key, you will not be able to fully use the compute capacity of the Amazon DynamoDB cluster. A best practice is to maximize your throughput by distributing requests across the full range of partition keys.  

__Provisioned Capacity__  
You must provision a certain amount of read write capacity for your workload. This value can be scaled up or down later using an `UpdateTable` action.   
Each operation against an Amazon DynamoDB  table will consume some of the provisioned capacity units the amount of which is dependent on the size of the item and other factors.  
* A read of 4kB or less consumes 1 capacity unit .
* A write of 1KB or less consumes  1 capacity unit.  
* A read operation that is strongly consistent consumes twice the number of capacity unit i.e 2 capacity unit for 4KB.


__Secondary Indexes__  
A secondary index lets you query the data in the table using an alternate key, in addition to queries against the primary Key. Amazon DynamoDB supports tow different kind of indexes:  
* __Global Secondary Index__: an index where partition and sort key can be different   
* __Local Secondary Index__:

Continue from page [239]

##
