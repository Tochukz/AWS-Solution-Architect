## Chapter 7: CloudTrail, CloudWatch, and AWS Config  
#### Introduction
_CloudTrail_, _CloudWatch_, and _AWS Config_ are services that collectively help you keep an eye on your AWS environment by performing the following operational tasks:  
* Tracking Performance  
* Detecting Application Problems
* Detecting Security Problems
* Logging Events
* Maintaining an Inventory of AWS Resources  

They can be configured independently and they can also work together to provide a comprehensive monitoring solution for your AWS resources, application and even on-premise servers.  
* __CloudTrail__ keeps details of logs of every read/write action that occurs against your AWS resources  
* __CloudWatch__ collects numerical performance metrics from AWS and non-AWS resources such as on-premises servers.  
* __AWS Config__ tracks how your AWS resources are configures and how they change over time.

#### CloudTrail  
An event is a record of an action that a principal performs against an AWS resource. _CloudTrail_ logs both API and non-API actions. API events can be performed in the AWS management console, AWS CLI or SDK.  CloudTrail classifies events into _management events_ and _data events_.  

__Management Events__  
AWS also calls management events _control plane operations_. Management events are further grouped into _write-only_ and _read-only_ events. `RunInstances` API operation is a write-only event, and logging into the management console as the root or IAM user is also a write-only event. `DescribeInstance` is a read-only event.

__Data Events__  
Data events track two types of _data plane operations_ that tend to be high volume: S3 object-level activity and Lambda function executions. For S3 object-level operations, _CloudTrail_ distinguishes read-only and write-only events. `GetObject` is read-only event, `DeleteObject` and `PutObject` are write-only events.  

__Events History__  
By default, CloudTrail logs 90 days management events and stores them in a  database called _event history_. The event history does not include data events.  CloudTrail creates a separate event history for each region containing only the activities that occurred in that region. But events for global services such as IAM and Route 53 are included in the event history of every region.

__Tails__  
A trail is a configuration that records specified events and delivers them as CloudTrail log files to an S3 bucket of your choice. With trail, you can do the following:  
* Extends the 90 days event history
* Customize the types of events CloudTrail logs
* exclude specific services or actions
* include data events

For global services, the region is always us-east-1.  

__Creating a Trail__
You can choose to log events from a single region or all regions. You can create up to five trails for a single region.  After creating a trail, it can take up to 15 minutes between the time CloudTrail logs an event and the time it writes a log file to the S3 bucket.

__To Create a Trail__  
* Go the the CloudTrail Management Console  
* Click on the `Dashboard` link on the left navigation bar
* Click the `Create trail` button
* Enter the Trail name and a Bucket name and click `Next`
* Select `Management events` under `Event type`
* Select `Write` under `API activity` and Click `Next`
* Review your chosen options and click `Create trail`  

If you create a trail using the Web console and log management events, the trail will automatically log global service events also. To avoid duplicates global service event in all your trails you can disable logging global service events on an existing trail using the AWS CLI command  
```
$ aws cloudtrail update-trail --name mytrail --no-include-global-service-events
```
Alternately, if a trail is configured to log to all regions and you reconfigure it to log only to a single region, CloudTrail will disable global event logging for that trail.

__To create a trail using the CLI__  
```
$ aws cloudtrail create-trail --name my-second-trail --s3-bucket-name tochukwu.xyz-mwo-trail-bucket --no-include-global-service-events
```
The bucket's bucket policy muse be configured to allow cloud trail to read and write objects to the bucket.  
Todo: Learn the bucket policy and more bucket policy.

__To Activate the new Trail__  
```
$ aws cloudtrail start-logging --name my-second-trail
```
__To see all your trails__  
```
$ aws cloudtrail describe-trails
```  
You are limited to selecting a total of 250 individual object per trail, including Lambda functions and S3 buckets and prefixes.   

__Note__ Don't log data events on the bucket which is storing your CloudTrail logs. Doing so would create an infinite loop.  

__Log File Integrity Validation__   
CloudTrail provides a means to ensure that no log file were modified or deleted after creation.
With log file integrity validation enabled, every time CloudTrail delivers a log file to the S3 bucket, it calculates a cryptographic hash of the file which makes it easy to detech when a file has been modified.    
Every hour, CloudTrail creates a separate file called a `digest file` that contains the cryptographic hashes of all log files delivered within the last hour and signs the _digest file_ using a private key that varies by region and places the signature in the file's S3 object metadata.  

__To validate all log file__  
```
$ aws cloudtrail validate-logs --trail-arn arn:aws:cloudtrail:eu-west-2:123456789012:trail/my-second-trail --start-time 2021-04-19T00:00:00Z
```

#### CloudWatch  
CloudWatch functions a s a metric repository that lets you collect, retrieve, and graph numeric performance metrics from AWS and non-AWS resources. All AWS resources automatically send their metrics to CloudWatch. Optionally you can send custom metrics to CloudWatch from your applcations and on-premise servers.

__CloudWatch Metrics__  
CloudWatch organizes metrics into _namespaces_. Metrics from AWS services are stored in AWS namespaces and use the format AWS/service to allow for easy classification of metrics. For example, AWS/EC2 or AWS/S3.  You can create custom namespaces for custom metrics. Metrics exists only in the region which they were created.    
A metric functions as a variable and contains a time-ordered set of _data points_. Each data point contains a timestamp, a value, and optionally a unit of measure.  Each metric is uniquely defined by a namespace, a name, and optionally a _dimension_. A dimension is a name-value pair.

__Basic and Detailed Monitoring__  
Most services support basic monitoring and some support _basic monitoring_ and _detailed monitoring_.  Basic monitoring send metrics to CloudWatch every five minutes. Detailed monitoring publishes metric to CloudWatch every minute.

__Regular and High-Resolution Metrics__  
