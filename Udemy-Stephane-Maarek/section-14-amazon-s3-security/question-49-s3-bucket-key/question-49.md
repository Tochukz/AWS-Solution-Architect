# Practice Test 5 - Attempt 1
## Question 49
A digital publishing platform stores large volumes of media assets (such as images and documents) in an Amazon S3 bucket. These assets are accessed frequently during business hours by internal editors and content delivery tools. The company has strict encryption policies and currently uses AWS KMS to handle server-side encryption. The cloud operations team notices that AWS KMS request costs are increasing significantly due to the high frequency of object uploads and accesses. The team is now looking for a way to maintain the same encryption method but reduce the cost of KMS usage, especially for frequent access patterns.

Which solution meets the company's encryption and cost optimization goals?

1. Switch to server-side encryption using Amazon S3 managed keys (SSE-S3) to eliminate all AWS KMS-related encryption charges while maintaining the same level of encryption control
2. Configure a VPC endpoint for S3 and restrict access to the bucket to traffic originating from the endpoint to avoid additional KMS charges
3. Enable S3 Bucket Keys for server-side encryption with AWS KMS (SSE-KMS) so that new objects use a bucket-level key rather than requesting individual KMS data keys for every object
4. Use client-side encryption by generating a local symmetric key and uploading it to Amazon S3 along with each object’s metadata for decryption

__Answer__  
3. Enable S3 Bucket Keys for server-side encryption with AWS KMS (SSE-KMS) so that new objects use a bucket-level key rather than requesting individual KMS data keys for every object

__Explanation__  
Amazon S3 Bucket Keys reduce the cost of Amazon S3 server-side encryption with AWS Key Management Service (AWS KMS) keys (SSE-KMS).   
Using a _bucket-level key_ for SSE-KMS can reduce AWS KMS request costs by up to _99 percent_ by decreasing the request traffic from Amazon S3 to AWS KMS.   Enabling S3 Bucket Keys with SSE-KMS allows S3 to generate a unique data key for each object locally using a bucket-level KMS key, which dramatically reduces the number of direct AWS KMS API calls. This approach maintains the same security and compliance properties as SSE-KMS, while reducing request-related costs—especially beneficial for workloads with frequent access or write operations.

https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html
