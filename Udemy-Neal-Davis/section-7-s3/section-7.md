# Section 7: Amazon Simple Storage Service (S3)

### IAM Policies, Bucket Policies and ACLs
__IAM Policies__  
* IAM policies are identity-based policies
* Specify what actions are allowed on what AWS resource
* If the policy document does not have _principal_ element in it, then it is likely an IAM policy

__Bucket Policies__  
* Bucket Policies are resource-bases policies
* Can only be attached to Amazon S3 buckets
* Also use the AWS access policy language

__S3 Access Control List (ACLs)__  
* Legacy access control mechanism that predates IAM
* AWS generally recommends using S3 bucket policies or IAM policies rather than ACLs
* Can be attached to a bucket or directly to an object
* Limited options for grantees and permissions

### Multipart Uploads and Transfer Acceleration
__Multipart Uploads__
* Performed using the S3 Multipart upload API
* It is recommended for objects of 100MB or larger
* Can be used for objects from 5MB up to 5TB
* Must be used for objects larger then 5GB

__S3 Transfer Acceleration__  
* Uses CloudFront edge locations to improve performance of transfer from client to S3 bucket

### S3 Select and Glacier Select
__S3 Select__ and __Glacier Select__ are _SQL expressions_  that can be used to retrieve an object within a larger object.   
For example, you can retrieve a single file from a zip archive using the SQL expression.

## Amazon Glacier
__Things to note__  
* There is a charge if you delete data within 90 days –
* Retrieved data is available for 24 hours by default (can be changed)
* Amazon Glacier must complete a job before you can get its output
* Glacier automatically encrypts data at rest using AES 256 symmetric keys and supports secure transfer of data over SSL
* Retrieved data will not be encrypted if it was uploaded unencrypted
* You do not need an MFA device to access the retrieved files

### Cheat Sheets  
[Amazon S3 Cheat Sheet](https://digitalcloud.training/amazon-s3-and-glacier/)   
