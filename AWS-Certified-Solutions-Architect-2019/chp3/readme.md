## Chapter 3: Amazon Simple Storage Service and Amazon Glacier Storage
#### S3 Service Architecture  
By default, you're allowed to create as many as 100 buckets for each of your AWS accounts. You can ask AWS to raise that limit.  
The URL to access a file called _filename_ in a bucket called _bucketname_ over http looks like this  `https://s3.amazonaws.com/bucketname/filename`.   
In AWS CLI file would be addressed as `s3://bucketname/filename`  

__Working with Large Objects__  
A single object may be no larger than 5TB. Individual uploads can be no larger than 5GB.   
AWS recommends that you use _Multipart Upload_ for object larger than 100MB to reduce the risk of data loss or aborted uploads. Object larger than 5GB _must_ use Multipart Upload.   


__Encryption__  
For non public data, use Amazon's encryption API endpoint for transfers. You can use either server-side or client-side encryption for data at rest.

__Server-Side Encryption__   
You can use one of three encryption options:  
* Server-Side Encryption with Amazon S3-Mnanged Keys (SSE-S3)
* Server-Side Encryption with AWS KMS-Managed Keys (SSE-KMS)
* Server-Side Encryption with Customer=Provided Keys (SSE-C)

__Client-Side Encryption__   
You can use AWS KMS-Managed Customer Master Key (CMK) or Client-Side Master Key which you provide through Amazon S3 encryption client.

__Durability__  
The high durability rates delivered by S3 are largely because they automatically replicate your data across at least three availability zones.  
Amazon S3 _One Zoned-Infrequent Access_ (S3 One Zone-IA) stores data in only a single availability zone.  
Reduced Redundancy Storage (RRS) is rated at only 99.99 percent durability, and it replicates it data across fewer servers than other classes.  

__Availability__  
Amazon S3 Standard class guarantees 99.99% availability per year. _S3 One Zone-IA_ has an availability of 99.5%.  

__Eventually Consistent Data__  
Expect a delay of two seconds or less for newly updated or deleted file to propagate across the system.  
S3 also provides read-after-write consistency for the creation (PUT) of new objects.    

__Lifecycle Management__  
You should be aware that there are minimum times (30 days, for instance) an object must remain within one class before it can be moved.  

__Access Control__  
As a rule, Amazon recommends applying S3 bucket policies or IAM policies instead of ACLs.  

__Presigned URLs__  
A presigned URL includes the required authentication string. To generate a presigned URL
```
$ aws s3 presign s3://MyBucketName/PrivateObject --expires-in 600
```  
This presigned URL will expire in 600s (10 Minutes).  

__Static Website Hosting__   
```
aws s3api put-bucket-acl --bucket my-bucket --acl public-read
aws s3 website s3://my-bucket/ --index-document index.html --error-document error.html
```

__S3 and Glacier Select__  
_SELECT_ lets you apply SQL-like queries to stored object so that only relevant data from within objects is retrieved. This can help to reduce cost of your requests.

#### Amazon Glacier
Glacier supports archives as large as 40TB rather than the 5TB limit in S3 and it archives are encrypted by default witch machine0generated IDs for key names.   
Glacier does offer Expedited retrieval in minute but at a premium cost.   
In Glacier we have `archive` instead on `object` in S3, `vaults` instead of `buckets` in S3.  Vault names do not have to be globally unique.  

Note that aside from storage cost, you will also be charges for operations including data retrievals: PUT, COPY, POST, or LIST requests and lifecycle transition requests.  

Use the AWS [Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html) to estimate monthly costs for different scenarios.   
See also [AWS Pricing Calculator](https://calculator.aws/) which seem to be the more recent tool for cost estimation as Simple Monthly Calculator will be deprecated soon.  

#### Other Storage-Related Services   
__Amazon Elastic File System__   
EFS provides automatically scalable and shared file storage. EFS-based files designed to be accessed from within a virtual private cloud (VPC) via Network File System (NFS).  

__AWS Storage Gateway__  
AWS Storage Gateway provides software gateway appliances (based on VMware ESXi, Microsoft Hyper-v, or EC2 images) with multiple virtual connectivity interface for you to backup your local data to the cloud as though it's a physical backup device.

__AWS Snowball__    
If you are looking to move terabyte or even petabytes-scaled data for backup or active use within AWS, ordering a Snowball device might be the best option. You copy your data to the physical 256-bit encrypted storage device and ship it back to Amazon where the data is then uploaded to your S3 bucket(s).  

#### AWS CLI Example
Create an S3 Bucket
```
$ aws s3 mb s3://my-bucket
```
Recursively copy files to the bucket  
```
$ aws s3 cp --recursive my-local-dir/ s3://my-bucket
```
Use the low-level s3api CLI to check the current lifecycle configuration  
```
$ aws s3api get-bucket-lifecycle-configuration --bucket my-bucket
```
This will throw and error if the lifecycle configuration has not be set before.  

First you must make sure that the `Prefix` which is referenced by the configuration is in the bucket. In this case our prefix is "sales-docs/" as seen in the JSON string below so you must have a file that reflects that prefix in your bucket.
Add a lifecycle configuration to the bucket  
```
$ aws s3api put-bucket-lifecycle-configuration --bucket my-bucket --lifecycle-configuration
'{
  "Rules": [
    {
      "Filter": {
        "Prefix": "sales-docs/"
      },
     "Status": "Enabled",
     "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 60,
          "StorageClass": "GLACIER"
        }
      ],
      "Expiration": {
        "Days": 100
      },
      "ID": "My Bucket Lifecycle Name."
    }
  ]
}
'
```  
Alternately, you can save the configuration into a JSON file (say _bucket-config.json_) and use the file as follows  
```
$ aws s3api put-bucket-lifecycle-configuration --bucket my-bucket --lifecycle-configuration file://relative/path/to/bucket-config.json
```
Check the newly configure lifecycle policy  
```
$ aws s3api get-bucket-lifecycle-configuration --bucket my-bucket  
```

__Review Questions__  
Question Page[96], Answer Page[359]  
