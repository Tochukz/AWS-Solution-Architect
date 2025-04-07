#### AWS Storage Gateway
AWS Storage Gateway is a Bridge between on-premise data and cloud data which is very useful for a Hybrid Cloud strategy.  
Use cases of Storage Gateway includes:
* Disaster recovery
* Backup and restore
* Tiered storage
* on-premise cache and low-latency file access

__Types of Storage Gateway__  
1. S3 File Gateway
2. FSx File Gateway
3. Volume Gateway
4. Tape Gateway

__Amazon S3 File Gateway__  
S3 File Gateway uses NFS or SMB protocol with on-premise server and then translates the request to HTTPS as it transfers data to
* S3 Standard,
* S3 Standard-IA
* S3 One Zone-IA
* S3 Intelligent-Tiering
but NOT Glacier.  
You can then use LifeCycle Policy to transition the data to Glacier if needed.  

__Amazon FSx File Gateway__  
Window machine or SMB based machines may not need a FSx File Gatway to access Amazon FSx for Windows File Server.  
However they can provide local caching for frequently accessed data.  
FSx File Gateway has been discontinued by Amazon.

__Volume Gateway__  
* Block storage using _iSCSI protocol_  backed by S3
* Backed by EBS snapshots which can help restore on-premise volumes
* Volume Gateway has two storage options:
  - __Cached volumes__: stores the most commonly accessed data locally  while keeping the entire dataset in S3
  - __Stored volumes__: entire dataset is on premise, schedules backup to S3.

__Tape Gateway__  
* Some companies have backup process using physical tapes
* With Tape Gateway, companies use the same process but, in the cloud
* Virtual Tape Library (VTL) backed Amazon S3 Glacier
* Back up data using existing tape-based processes (and iSCSI interface)
* Works with leading backup software vendors  

#### AWS Transfer Family
AWS Transfer Family  provides a way to transfer files to Amazon S3 or EFS using FTP protocols.
AWS Transfer Family support 3 variation of FTP protocol:
1. AWS Transfer for FTP (File Transfer Protocol)
2. AWS Transfer for FTPS (File Transfer Protocol over SSL)
3. AWS Transfer for SFTP (Secure File Transfer Protocol

#### AWS DataSync
AWS DataSync is a service that is used synchronize large amount of data between places:
* On-premises or other cloud to AWS using different protocols (NFS, SMB, HDFS, S3 API) - agent is required.
* One AWS storage server to another - no agent needed.
A AWS DataSync agent is needed when the source and destination is not an AWS storage service.  

You can synchronize to:   
* Amazon S3 (any storage class including Glacier)
* Amazon EFS
* Amazon FSx (Windows, Lustre, NetApp, Open ZFS)

AWS DataSync replication tasks can be scheduled hourly, daily, or weekly.
File permissions and metadata are preserved (NFS POSIX, SMB).

For offline Data Sync you can use Snowcone device which can then be shipped to an AWS data center to dump the data.
