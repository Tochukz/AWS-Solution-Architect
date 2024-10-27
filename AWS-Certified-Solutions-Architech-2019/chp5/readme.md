## Chapter 5:  Databases  
__Storing Data__    
You can use the `COPY` command to copy data from a properly formatted file into the table you specify.  

__Online Transaction Processing vs. Online Analytic Processing__   
Depending on its configuration, a relational database can fall into one of two categories: _online transaction processing_ (OLTP) or _online analytic processing_ (OLAP).  

__OLTP__   
OLTP databases are suited to applications that read and write data frequently, in the order of multiple times per second. Generally, a single server with ample memory and compute power handles all write to an OLTP database.

__OLAP__  
OLAP database are optimized for complex queries against large data sets. As a result, OLAP databases tend to have heavy compute and storage requirements. With a large OLAP database, it's common for multiple database servers to share computational load of complex queries. In a process called _partitioning_, each server gets a potion of the database for which it's responsible.  

#### Amazon Relational Database Service (RDS)  
To deploy a database using RDS, you start by configuring a database instance, which is an isolated database environment. A database instance exists in a virtual private cloud (VPC) that you specify, but unlike an EC2 instance, AWS fully manages database instances. You can't SSH into them, and they don't show up under your EC2 instances.  

__Database Engines__  
Each database instance runs only one database engine.  RDB offers the following six database engines:  
__MySQL__ MySQL offers tow storage engines - _MyISAM_ and _InnoDB_. You should use _innoDB_ as  it is the only one compatible with RDS-manageed automatic backups.  Version includes 5.5, 5.6 and 5.7.  
__MariaDB__ MariaDB supports the _XtraDB_ and _InnoDB_ storeage engines. You should use _InnoDB_ as recommended by AWS for maximum compatibility with RDS. Versions include 10.0.7 through 10.2.  
__Oracle__ RDS provides the editions SE, SE1, SE2, and EE  
__PostgreSQL__  RDS offers versions 9.3.12-R1 through 10.4-R1  
__Amazon Aurora__  Aurora is Amazon's drop-in binary replacement for MySQL or PostgreSQL depending on the edition you choose.  
__Microsoft SQL Server__ RDS offers version 2008 R2, 2012, 2014, 2016 and 2017. For edition you can choose Express, Web, Standard or Enterprise.

__Licensing Considerations__  
__License Included__ All version and editions of Microsoft SQL Server running on RDS include a license as do Oracle SE2 AND SE2.  
__Bring Your Own License__ Oracle Database editions EE, SE, SE1 and SE2 allow you to bring your license.  

__Database Option Groups__  
Options require more memory, so make sure your instances have amply memory and enable only the options you need.  

__Database Instance Classes__   
You can switch you instance to a different class if you want. There are three database instance classes:
__Standard__  
Tee latest-generation  instance class is `db.m4` , which provides up to
* 256 GB Memory
* 64 vCPU
* 25 Gbps network bandwidth
* 10, 000 Mbps (1,280 MBps) disk throughput  

__Memory Optimized__    
For database that have hefty performance requirements. The latest-generation instance class is `db.xle` and it provided up to:  
* 3,904 GB memory
* 128 vCPU
* 25 Gbps network bandwidth  
* 14,000 Mbps (1,750 MBps) disk throughput

Both standard and memory-optimized instance class types are ES-optimized.

__Burst Capable (Burstable)__  
For development and testing. The only burstable instance class available is `db.t2`, and gives you up to:
* 32 GB memory  
* 8 vCPU
* say, less than 1Gbps network bandwidth
* not more than 3,200 Mbps (400 MBps) disk throughput

__Storage__   
__Understanding Input/Output operations Per Second__  
The speed of your database storage is limited by the number of IOPS allocated to it. The amount of data you can transfer in a single I/O operation depends on the page size that the database engine uses.   
MySQL and MariaDB have a page size of 16KB. Hence, writing 16 KB of data to disk would constitute one I/O operation. Oracle, PostgreSQL, and Microsoft SQL Server use a page size of 8KB. Writing 16KB of data using one of those database engines would consume tow I/O operations.  
__NB__: If your database engine write more than 32 KB in a single I/OM operation, WS counts that as two I/O operations.  

The number of IOPS you can achieve depends on the type of storage you select. RDS offers the following three different types of storage.   

__General-Purpose SSD (gp2)__  
You can allocate a volume of up to 16 TB. For each gigabyte of data that you allocate to a volume, RD allocates that volume a baseline performance of three IOPS, up to a total of 10,000 IOPS per volume.   
The minimum storage volume you can create depends on the database engine. For SQL Server Enterprise and Standard, it is 200 GB, and for all others, it is 20 GB.  

__To Create an RDS Database Instance from the Console__  
* Go to the RDS Management Console  
* Click the `Create Database` button
* Select a database creation method, Engine type, Edition, Capacity and Engine Version
* Select other options
* Click the `Create Database` button  

__To create an RDS database Instance using the CLI__  
```
$ aws rds create-db-instance --db-instance-identifier my_instance_identifier --db-instance-class db.t2.micro --engine mysql --allocated-storage 20 --storage-type gp2 --max-allocated-storage 1000 --master-username my_user --master-user-password my_pass --vpc-security-group-ids sg-xxxxxxxx
```  
If you want a database to be created after the instance is launched you can use the `--db-name` flag
The ` --master-username` and `--master-user-password` flags are options.

See [RDS command reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/index.html) for more.
__To Connect to RDB Instance__  
* Go to the RDS management console.
* Click and the `Databases` link on the navigation bar
* Click on the database instance name (under the `DB identifier` column)
* Copy the endpoint and take note of the port shown under the `Connectivity & security` tab
* Use the endpoint and port together with your user credential to connect to the database.

Alternatively, you can use the AWS CLI to view the details of your Database instances by running the command
```
$ aws rds describe-db-instances
```
From the output you can copy out the endpoint and port and also see the security group under the `VpcSecurityGroups`.

To connect from your local machine, make sure
* the database instance is publicly accessible. See `Public accessibility` under the security section
* the security group inbound rule allows traffic from your local machine
You can use your preferred database client to connect



__Provision IOPS SSD (io1)__    
_Provisioned IOPS SS_ lets you simply allocate the number of IOPS you need when you create your instance.  The number of IOPS you provision is what you get and what you pay for, whether you use it or not. You must specify IOPS in increments of 1,000.
The maximum number of IOPS you can achieve and how much storage you can allocated are constrained by the database engine you select.   
Oracle, PostgreSQL, MariaDB, MySQL and Aurora let you choose 100GB to 16TB of storage and allocated 1,000 to 10,000 provisioned IOPS.    
Microsoft SQL Server gives you up to 16TB of storage and lets you choose between 1,000 and 32,000 provisioned IOPS. The ratio of storage in gigabytes to IOPS must be at least 1:50.

__Magnetic Storage__  
RDS offers magnetic storage for backward compatibility with older instances. It is limited to maximum size of 4TB and 1,000 IOPS.

__Read Replicas__  
_Scaling verticaly_ also called _scaling up_ is done by upgrading one or more resources (memory, compute, network speed, disk throughput) of your database instance.  
_Scaling horizontally_, also known as _scaling out_ entails creating additional database instances called _read replicas_. All database engine except for Oracle and Microsoft SQL Server support read replicas. Aurora exclusively support a specific type of read replica called an _Aurora replica_.  Read replicas are usefu for read-heavy applications as they take some of the query load off of the _master database instance_ .   
You can have up to five read replicas and up to fifteen Aurora replicas. Read replicas are unsuitable for disaster recovery because of the delay in synchronization with the master.  
When you create a read replica, RDS gives  you a read-only endpoint which is a domain name that resolves only to your read replica.

__To Create a Read Replica__  
* Go to the RDS management console
* Click the radio button of the instance to select the instance
* Click `Action` > `Create read replica`
* The `Read replica source` should already be the name of the instances you are replicating
* Enter a name as an identifier under `DB instance identifier`
* Enter/select other DB options where applicable
* Click the `Create read replica` button

A read replica and the master may be in different availability zones, and even in different regions. In the event of the master instance failing, you can promote a read replica to the master. But keep in mind that because of the asynchronous nature of replication, you may lose data this way.  

__To promote a Read replica to a Master__   
* Go the RDS management console
* Click on the radio button beside the `Read replica` that you have created
* Click `Action` > `Promote`
* Click `Continue`
* Click `Promote Read Replica`  
Note that the promotion of a read replica is an irreversible process and it may take a few minutes to complete.

__High Availability (Multi-AZ)__   
You can deploy multiple database instances in different availability zones using `multi-AZ deployment`. In a multi-AZ deployment, you have a _primary database instance_ in one availability zone that handles read and writes to the database, and you have a _standby database instance_ in a different availability zone. If you are to enable `multi-AZ` on an existing instance, you should do it during a maintenance window.  


__Multi-AZ with Oracle, PostgreSQL, MariaDB, MySQL, and Microsoft SQL Server__    
In _multi-AZ_ deployment, all instances must reside in the same region. RDS synchronously replicated data from the primary to the standby instance. This replication can introduce some latency, so be sure to use EBS-optimized instances  and provisioned IOPS SSD storage.  The standby instance is not a read replica and cannot serve read traffic. When a failover occurs, RDS changes the DNS record of the endpoint from  the primary instance to the standby instance.  
For MySQL and MariaDB, you can create a multi-AZ read replica in different region. This lets you failover to a different region.    

__Multi-AZ with Amazon Aurora__   
In Amazon Aurora, the primary and replicas share a single cluster volume, which is synchronously replicated across three availability zones. If the primary fails a replica is promoted to primary or a new primary is created if no replica exists.  

__Backup and Recovery__  
You can take EBS volume snapshots of your database instances which is then stores in S3.  Snapshots are kept in multiple zines in the same region for redundancy. Be sure to take your snapshot during off-peak time because I/O operations may be suspended to a few seconds during the process unless you are using multi-AZ with Microsoft SQL Server DB engine.    
The _recovery time objective_ (RTO) is the maximum acceptable time to recover data and resume processing after fa failure.  
The _recovery point objective_ (RPO) is the maximum period of acceptable data loss. Consider your RTO and RPO requirements when choosing your RDS backup options.  
Snapshot restore is done to a new instance and may take several minutes depending on its size. It can be made faster with more provisioned IOPS allocated to your instance.  

__Automated Snapshots__  
Taking snapshots impact performance, so you should choose a time when you database is least busy. Enabling automatic backup enable _point-in-time recovery_ which archives database logs to S3 every 5 minutes. Restoring to a point-in-time can take hours, depending on how much data us in the transaction logs.  
RDS keeps automated snapshots for a limited period of time and then deletes them. You can choose a retention period between 1 day and 35 days.

__Maintenance Items__  
You can specify a 30-minutes weekly maintenance window for RDS. The window cannot overlap with the backup window. Even though the maintenance window is 30 minutes, it's possible for tasks to run beyond this.  

#### Amazon Redshift
_Redshift_ is a managed data warehouse solution designed for OLAP databases. It is based on PostgreSQL and it is not part of RDS. Redshift uses the _columnar storage_.  

__Compute Nodes__  
Redshift cluster _compute nodes_ are divided into tow categories. _Dense compute_ nodes can store up to 325 TB of data on magnetic storage. _Dense storage_ nodes can store up to 2 PB of data on fast SSDs.  

#### Non-relational (No-SQL) Databases  
__DynamoDB__
DynamoDB is a managed nonrelational database service that can handle thousands of read and write per second. I achieves this level of performance by spreading your data across multiple _partitions_. A partition is an allocation of storage for table, and it's backed by solid -state drives in multiple availability zones.   

__Partition and Hash Keys__  
There are two types of primary keys you can create:  _partition key_ and _composite key_.    
A _partition key_ also know as _hash key_ is a primary key that contains a single value.  When you use only a partition key as a primary key, it's called a _simple primary key_. A partition key can store no more than 2,048 B. This partition key is unique.
A _composite key_ is a primary key that is a combination of tow values: a partition key and a _sort_ (or _range_) _key_. This partition key doesn't have to be unique, but the combination must be unique.

__Attributes and Items__    
DynamoDB can store an item size of up to 400 KB, which is roughly equivalent to 50,000 English words.  
DynamoDB trims leading and trailing zeros.   
Data types fall into the following three categories:
* __Scalar__: _string_, _number_, _binary_, _boolean_, _null_
* __Set__: unique _unordered list_ of scalar values
* __Document__: holds different types. Document types include: _list_ and _map_.

__Throughput Capacity__  
The _provisioned throughput_ is the number of reads and write per second you application will require. DynamoDB reserves partitions based on the number of _read capacity units_ (RCUs) and _write capacity units_ you specify when creating a table.   
Whether you use _strongly consistent_ or _eventually consistent_ reads depends on whether your application can tolerate reading stale data.   
For calculations, take note of the following relationships:  
* For an item of 4KB in size, 1 RCU buys you 1 strongly consistent read per second
* For an item of 4KB, one RCU buys you 2 eventually consistent reads per second.  
* For an item of size 1KB,  1 WCU give you one write per second  

The throughput capacity you specify is an upper limit of what DynamoDB delivers. If you exceed your capacity, DynamoDB may throttle your request and yield an HTTP 400 (Bad request) error. AWS SDKs have built-in logic to retry throttled request.

__To Create a Table in DynamoDB using the Console__  
* Go to the DynamoDB management console
* Click on the `Create Table`  button
* Enter a value for the `Table name` and `Primary key`
* Click the `Create` button

__To Create a Table in DynamoDB using the CLI__  
```
$ aws dynamodb create-table --table-name Categories --attribute-definitions AttributeName=categoryId,AttributeType=S AttributeName=categoryName,AttributeType=S --key-schema AttributeName=categoryId,KeyType=HASH AttributeName=categoryName,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
```
__To see all you tables__
```
$ aws dynamodb list-tables
```  
__To view details about a specific table__  
```
$ aws dynamodb describe-table --table-name Categories
```  

__Auto Scaling__
To configure Auto Scaling, you specify a minimum and maximum RCU and WCU. You also specify a desired utilization percentage. DynamoDB will automatically adjust your RCU and WCU to keep your utilization at this percentage.

__Reserved Capacity__  
For 100 or more WCU or RCU you can purchase reserved throughput capacity to save money. You can reserve RCU and WCU separately up to a maximum of 100,000 unit each. You pay a one-time fee and commit to 1-3years.  

__Reading Data__
Return...

__Secondary Indexes__  
Return...
__Global secondary Index__
Return...
__Local Secondary Index__  
Return...

__Review Question__  
Questions - Page[152], Answers = Page[362]
