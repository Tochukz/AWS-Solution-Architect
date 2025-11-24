# Practice Test 6 - Attempt 1
## Question 52
The data engineering team at a company wants to analyze Amazon S3 storage access patterns to decide when to transition the right data to the right storage class.

Which of the following represents a correct option regarding the capabilities of Amazon S3 Analytics storage class analysis?

1. Storage class analysis only provides recommendations for Standard to Glacier Deep Archive classes
2. Storage class analysis only provides recommendations for Standard to Standard IA classes
3. Storage class analysis only provides recommendations for Standard to Glacier Flexible Retrieval classes
4. Storage class analysis only provides recommendations for Standard to Standard One-Zone IA classes

__Answer__  
2. Storage class analysis only provides recommendations for Standard to Standard IA classes

__Explanation__  
By using Amazon S3 analytics Storage Class Analysis you can analyze storage access patterns to help you decide when to transition the right data to the right storage class. This new Amazon S3 analytics feature observes data access patterns to help you determine when to transition less frequently accessed STANDARD storage to the STANDARD_IA (IA, for infrequent access) storage class.

Storage class analysis only provides recommendations for Standard to Standard IA classes.

After storage class analysis observes the infrequent access patterns of a filtered set of data over a period of time, you can use the analysis results to help you improve your lifecycle configurations. You can configure storage class analysis to analyze all the objects in a bucket. Or, you can configure filters to group objects together for analysis by common prefix (that is, objects that have names that begin with a common string), by object tags, or by both prefix and tags.

__References__  
https://docs.aws.amazon.com/AmazonS3/latest/userguide/analytics-storage-class.html
