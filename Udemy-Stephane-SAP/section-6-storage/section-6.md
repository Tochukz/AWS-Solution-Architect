# Section 6: Storage
## Elastic Block Store (EBS)

#### Amazon Data Lifecycle Manager
* Automate the creation, retention, and deletion of EBS snapshots and EBS-backed AMIs
* Schedule backups, cross-account snapshot copies, delete outdated backups, …
* Uses resource tags to identify the resources (EC2 instances, EBS volumes)
* Can’t be used to manage snapshots/AMIs created outside DLM
* Can’t be used to manage instance-store backed AMIs

__Amazon Data Lifecycle Manager vs. AWS Backup__  
* __Use Data Lifecycle Manager__
  - when you want to automate the creation, retention, and deletion of EBS Snapshots
* __Use AWS Backup__  
  - to manage and monitor backups across the AWS services you use, including EBS volumes, from a single place

__EBS Multi-Attach – io1/io2 family__   
* Must use a file system that’s cluster-aware (not XFS, EXT4, etc…)

## Elastic File System (EFS)

#### EFS – Performance & Storage Classes
* __EFS Scale__
  - 1000s of concurrent NFS clients, 10 GB+ /s throughput
  - Grow to Petabyte-scale network file system, automatically
* __Performance Mode (set at EFS creation time)__
  - __General Purpose (default)__ – latency-sensitive use cases (web server, CMS, etc…)
  - __Max I/O__ – higher latency, throughput, highly parallel (big data, media processing)
* __Throughput Mode__
  - __Bursting__ – 1 TB = 50MiB/s + burst of up to 100MiB/s
  - __Provisioned__ – set your throughput regardless of storage size, ex: 1 GiB/s for 1 TB storage
  - __Elastic__ – automatically scales throughput up or down based on your workloads
    * Up to 3GiB/s for reads and 1GiB/s for writes
    * Used for unpredictable workloads

#### EFS – Storage Classes
* __Storage Tiers (lifecycle management feature – move file after N days)__
  - __Standard__: for frequently accessed files
  - __Infrequent access (EFS-IA)__: cost to retrieve files, lower price to store.
  - __Archive__: rarely accessed data (few times each year), 50% cheaper
  - Implement __lifecycle policies__ to move files between storage tiers
* __Availability and durability__  
  - Standard: Multi-AZ, great for prod
  - One Zone: One AZ, great for dev, backup enabled by default, compatible with IA (EFS One Zone-IA)
* Over 90% in cost savings

#### EFS - On-premises & VPC Peering
![](slides/efs-on-premise-and-vpc.png)

#### EFS – Access Points
* Easily manage applications access to NFS environments
* Enforce a POSIX user and group to use when accessing the file system
* Restrict access to a directory within the file system and optionally specify a different root directory
* Can restrict access from NFS clients using IAM policies

### EFS – File System Policies
* Resource-based policy to control access to EFS File Systems (same as S3 bucket policy)
* By default, it grants full access to all clients
```json
{
  "Version": "2012-10-17",
  "Description": "Grant Read and Write Access to a specific IAM user",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789:user/stephane"
      },
      "Action": [
        "elasticfilesystem:ClientMount",
        "elasticfilesystem:ClientWrite"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "true"
        }
      }
    }
  ]
}
```

#### EFS – Cross-Region Replication
* Replicate objects in an EFS file system to another AWS Region
* Setup for new or existing EFS file systems
* Provides RPO and RTO of minutes
* Doesn’t affect the provisioned throughput of the EFS file system
* Use cases: meet your compliance and business continuity goals

## S3
__S3 – Replication (Versioning enabled)__  
* __S3 Replication Time Control (S3 RTC)__  
  * Replicates most objects that you upload to Amazon S3 in seconds, and 99.99% of those objects within 15 minutes
  * Helpful for compliance, DR, etc


__S3 Event Notifications with Amazon EventBridge__  
* Advanced filtering options with JSON rules (metadata, object size, name...)
* Multiple Destinations – ex Step Functions, Kinesis Streams / Firehose…
* EventBridge Capabilities – Archive, Replay Events, Reliable delivery

__S3 Performance – S3 Byte-Range Fetches__  
* Parallelize GETs by requesting specific byte ranges
* Better resilience in case of failures
* _Can be used to speed up downloads_
* _Can be used to retrieve only partial data (for example the head of a file)_

__S3 Multi-Part Upload – Remove Incomplete Parts__  
* `aws s3api list-multipart-uploads`
* Use AWS CLI to List Incomplete Multi-part Uploads
* Use Lifecycle Policy to abort & delete Incomplete Multi-part Uploads after X days
```json
{
  "Rules": [
    {
      "ID": "delete-imcomplete-mpu-7days",
      "Status": "Enabled",
      "Filter": {"Prefix": ""},
      "AbortIncompleteMultipartUpload": {
        "DaysAfterInitiation": 7
      }
    }
  ]
}
```

#### S3 – Storage Lens
* Understand, analyze, and optimize storage across entire AWS Organization
* Discover anomalies, identify cost efficiencies, and apply data protection best practices across entire AWS Organization (30 days usage & activity metrics)
* Aggregate data for Organization, specific accounts, regions, buckets, or prefixes
* Default dashboard or create your own dashboards
* Can be configured to export metrics daily to an S3 bucket (CSV, Parquet)

__Storage Lens – Default Dashboard__   
* Visualize summarized insights and trends for both free and advanced metrics
* Default dashboard shows Multi-Region and Multi-Account data
* Preconfigured by Amazon S3
* Can’t be deleted, but can be disabled
