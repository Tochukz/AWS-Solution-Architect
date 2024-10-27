## Chapter 2: Amazon Simple Storage Service (Amazon S3) and Glacier Storage  
__Introduction__  
Nearly any application running in AWS uses _Amazon S3_, either directly or indirectly.  
_Amazon S3_ offers a range of storage classed designed for various generic use cases: general purpose, infrequent access, and archive.
To help manage data through its lifecycle, Amazon S3 offers configurable lifecycle policies. By using lifecycle policies, you can have your data automatically migrated to the most appropriate storage class, without modifying your application code.  

_Amazon Glacier_ can be used both as a storage class of AmazonS3 and as an independent archival storage service.  

__Object Storage versus Traditional Block and File Storage__  
In Amazon S3, you _GET_ an object or _PUT_ an object, operating on the whole object at once, instead of incrementally updating portions of the object as you would with a file.
Amazon S3 objects are automatically replicated on multiple devices in multiple facilities within a region
__Tip__ If you need traditional block or file storage in addition to Amazon S3 storage, AWS provides options. The Amazon EBS service provides block level storage for Amazon Elastic Compute Cloud (Amazon EC2) instances. Amazon Elastic File System (AWS EFS) provides network-attached shared file storage (NAS storage) using the NFS v4 protocol.  

__Objects__  
User metadata for an object is optional, and it can only be specified at the time the object is created.  

__Durability and Availability__  
Amazon S3 achieves high durability by automatically storing data redundantly in multiple devices in multiple facilities within a region.  
If you need to store non-critical or easily reproducible derives data (such as image thumbnails) that doesn't require this high level durability, you can choose to use Reduced Redundancy Storage (RRS) as a lower cost. RRS offers 99.99% durability with a lower cost of storage than traditional Amazon S3 storage.  
__Tip__: Even though Amazon S3 storage offers very high durability at the infrastructure level, it is still a best practice to protect against user-level accidental deletion or overwriting of data by using additional features such as versioning, cross-region replication, and _MFA Delete (Multi Factor Authentication)_.   

__Data Consistency__  
For _PUTs_ to new objects, Amazon S3 provided read-after write consistency. However, for _PUTs_ to existing object (object overwrite to an existing key) and for object _DELETEs_, Amazon S3 provided _eventual consistency_. In all cases, updated to a single key are atomic.

__Access Control__    
To provide access to your bucket to others you can use one of the following
1. Amazon S3 Access Control Lists (ACLs)
2. Amazon S3 bucket policies (recommended)
3. AWS IAM policies
4. Query-string authentication  

_Amazon S3 ACLs_ grant certain coarse-grained permissions: READ, WRITE or FULL-CONTROL at the object or bucket level. It is a legacy access control. It may be used to enable bucket logging or make bucket to host static website to be world-readable.    

_Amazon S3 bucket policies_ provide fine-grained control. They are similar to IAM policies but are associated with bucket resources instead of an IAM principal. They also include an explicit reference to the IAM principal and allows cross-account access to the S3 resources.  

_IAM Policies_ which provide permissions to an Amazon S3 bucket may in turn provide access to any IAM principal which is associated with the policy.   

__Static Website Hosting__    
To configure an Amazon S3 bucket for static website hosting:  
1. Create a bucket with the same name as the desired website hostname.  
2. Upload the static files to the bucket.  
3. Make all the file public (world readable)
4. Enable static website hosting for the bucker. This includes specifying an Index document and an Error document.  
5. The website will now be available at the s3 website URL: <bucket-name>.s3-website-<AWS-region>.amazonaws.com.  
6. Create a friendly DNS name in your domain for the website using DNS CNAME or an Amazon Route 53 alias that resolves to the Amazon S3 website URL.  
7. The website will now be available at you website domain name.

#### Amazon S3 Advanced Features
__Tip__: Use delimiters and object prefixes to hierarchically organize the objects in your Amazon S3 bucket, but always remember that Amazon S3 is not really a file system.  
__Storage Classes__   

| Storage Class         | Suitability                                                             |
|-----------------------|-------------------------------------------------------------------------|
| Amazon S3 Standard    | General purpose                                                         |
| Amazon S3 Standard IA | For long lived, less frequently accessed data                           |
| Amazon S3 RRS         | For derived data that can be easily reproduced such as images thumbnails|
| Amazon Glacier        | For archives and long-term backups                                      |

__Note__: Amazon Glacier allows you to retrieve up to 5% of Amazon S3 data store in Amazon Glacier for free each month; restore beyond the daily restore allowance incur a restore fee.  
__Tip__: Set a data retrieval policy to limit restores to the free tier or to a maximum GB-per-hour limit to avoid or minimize Amazon Glacier restore fees.  

__Object Lifecycle Management__  
Reduce storage cost by automatically transitioning data from one storage class to another or even automatically deleing data after a period of time. This is done with Lifecycle configuration.  

__Review Questions__  
Question Page [87], Answer Page [492]
