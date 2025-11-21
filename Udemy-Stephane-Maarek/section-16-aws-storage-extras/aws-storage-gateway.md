## AWS Storage Gateway

### 1. File Gateway (FSx File Gateway / NFS/SMB File Gateway)    
__Description:__  
- Provides an NFS or SMB interface for on-premises applications.
- Files are stored as objects in Amazon S3.
- Frequently accessed data is cached locally for low-latency access.

__Use Cases:__
- Backup and archiving to S3.
- File shares for users and applications.
- Content repositories and media workflows.
- Data lake ingestion — store data as S3 objects for analytics.

__Example:__  
An organization wants to back up office documents to S3 while keeping them accessible via the same file path from on-premises servers.

### 2. Volume Gateway
Two modes: Cached and Stored

#### A) Cached Volume Gateway
- Primary data is stored in Amazon S3, with frequently accessed data cached locally.
- Reduces local storage needs while providing low-latency access to hot data.

__Use Cases__  
- Disaster recovery (DR) and backup replication.
- Hybrid cloud storage for applications with large data sets but limited on-prem storage.

#### B) Stored Volume Gateway
- Primary data is stored locally, and asynchronously backed up to S3 as EBS snapshots.
- Ensures full local access to data with offsite backup.

__Use Cases__
- On-prem workloads that require low latency and local access to all data.
- Backup and disaster recovery with local-first architecture.

### 3. Tape Gateway
__Description__  
- Replaces physical tape libraries with virtual tape libraries (VTLs).
- Integrates with existing backup applications (e.g., Veeam, Commvault).
- Virtual tapes are stored in Amazon S3 and archived to S3 Glacier or Glacier Deep Archive.

__Use Cases__  
- Long-term archive and compliance storage.
- Migration from physical tapes to cloud-based virtual tapes.
- Cost-effective, durable offsite backup.

### Summary Table
Gateway Type	| Data Stored In |	Local Cache	| Typical Use Cases
--------------|----------------|--------------|--------------------
File Gateway	| Amazon S3	| Yes	| File storage, backup, analytics ingestion
Volume Gateway (Cached)| Amazon S3	| Yes |	DR, hybrid cloud workloads
Volume Gateway (Stored) |	On-premises	| Yes (entire data)	| Backup with local primary access
Tape Gateway	| S3 / Glacier |	Optional	| Backup & archival (VTL replacement)
