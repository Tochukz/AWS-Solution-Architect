## Chapter 7: CloudTrail, CloudWatch, and AWS Config  
### Introduction
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

### CloudTrail  
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
The bucket's bucket policy must be configured to allow cloud trail to read and write objects to the bucket.  
See example bucket policy that allows CloudTrail write to the S3 bucket in `exercise-7.1-trail/Trail.yaml`.  

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

### CloudWatch  
CloudWatch functions a s a metric repository that lets you collect, retrieve, and graph numeric performance metrics from AWS and non-AWS resources. All AWS resources automatically send their metrics to CloudWatch. Optionally you can send custom metrics to CloudWatch from your applications and on-premise servers.

__CloudWatch Metrics__  
CloudWatch organizes metrics into _namespaces_. Metrics from AWS services are stored in AWS namespaces and use the format _AWS/service_ to allow for easy classification of metrics. For example, AWS/EC2 or AWS/S3.  You can create custom namespaces for custom metrics. Metrics exists only in the region which they were created.     

A metric functions as a variable and contains a time-ordered set of _data points_. Each data point contains a timestamp, a value, and optionally a unit of measure.  Each metric is uniquely defined by a namespace, a name, and optionally a _dimension_. A dimension is a name-value pair that distinguishes metrics with the same name and namespace from
one another. For example _InstanceId_ is the dimension used to distinguish the _CPUUtilization_ metrics of different EC2 instances.  

__Basic and Detailed Monitoring__  
Most services support basic monitoring and some support _basic monitoring_ and _detailed monitoring_.  Basic monitoring send metrics to CloudWatch every five minutes. Detailed monitoring publishes metric to CloudWatch every minute.  
More than 70 services support detailed monitoring including EC2, EBS, RDS, DynamoDB, ECS, and Lambda. EBS defaults to detailed monitoring for io1 volumes.  

__Regular and High-Resolution Metrics__  
The metrics generated by AWS services have a timestamp resolution of no less than one minute. These are called _regular-resolution_ metrics.   
For some AWS services, such as EBS, CloudWatch stores metrics at a five-minute resolution.   
CloudWatch can store custom metrics with up to one second resolution. Metrics with a resolution of less than one minute are _high-resolution_ metrics.   

If a metric is at 1 minute resolution for example, and a measurement of CPUUtilization is sent with timestamp of 14:00:28 it would be recorded as 14:00.   
Similarly, for a 5 minute resolution, a metric sent with timestamp of 21:34 will be recorded as 21:30.

__Expiratinon__    
You can’t delete metrics in CloudWatch. Metrics expire automatically, and when a metric
expires depends on its resolution. Over time, CloudWatch aggregates higher-resolution
metrics into lower-resolution metrics.  See resolution transition table below

Resolution  | Retention | Converted to resolution
------------|-----------|--------------
< 1 min     | 3 Hrs     | 1 min
1 min       | 15 days   |  5 mins
5 mins      | 63 days   | 1 Hr
1 Hr        | 15 Months | Deleted

As shown in the table, a high-resolution (< 1 min) metric is stored for 3Hrs. After this it is aggregated and converted to a 1min resolution. 1 min resolution gets converted to 5 min resolution after 15 days etc.

__Graphing Metrics__   
CloudWatch lets you visualize your metrics by graphing data points over time. This is useful for showing trends and changes over time, such as spikes in usage.   
To graph a metric, you must specify the metric, the statistic, and the period. The period can be from 1 second to 30 days, and the default is 60 seconds.   

If you want CloudWatch to graph a metric as is, use the Sum statistic and set the period equal to the metric’s resolution. For example, if you’re using detailed monitoring to record the CPUUtilization metric from an EC2 instance, that metric will be stored at one-minute resolution. Therefore, you would graph the CPUUtilization metric over a period of one
minute using the Sum statistic.  

__Metric Math__   
CloudWatch lets you perform various mathematical functions against metrics and graph them as a new time series. This is useful for when you need to combine multiple metrics into a single time series by using arithmetic functions, which include addition, subtraction, multiplication, division, and exponentiation. For example, you might divide the AWS/ Lambda Invocations metrics by the Errors metric to get an error rate.

### CloudWatch Logs
CloudWatch Logs is a feature of CloudWatch that collects logs from AWS and non-AWS sources, stores them, and lets you search and even extract custom metrics from them.  

__Log Streams and Log Groups__  
For CloudWatch Logs to understand a _log event_, the event must contain a timestamp and a UTF-8 encoded event message.  
CloudWatch Logs stores log events from the same source in a _log stream_.  
Related log streams are placed into the same _log group_. There is no limit to the number of streams in a group.   

__Metric Filters__  
You can use metric filters to extract data from logs in a log group to create CloudWatch
metrics.  
For example, you can create a metric filter
to track the number of times the string "error" appears in a given log group. Every time CloudWatch Logs receives a log event that matches the filter, it increments a custom metric.   
Metric values must be numeric.  
Metric filters are not retroactive and will not generate metrics based on log
events that CloudWatch recorded before the filter’s creation.

__CloudWatch Agent__  
The CloudWatch Agent collects logs from EC2 instances and on-premises servers running
Linux or Windows operating systems. The agent can also collect performance metrics, including metrics that EC2 doesn’t natively produce, such as memory utilization.  
Metrics generated by the agent are custom metrics and are stored in a custom namespace that you specify.  

__Sending CloudTrail Logs to CloudWatch Logs__  
You can confi gure CloudTrail to send a trail log to a CloudWatch Logs log stream. This lets you search and extract metrics from your trail logs.  
CloudTrail does not send log events larger than 256 KB to CloudWatch Logs. Hence, a single RunInstances call to launch 500 instances would exceed this limit.  

## CloudWatch Alarms
A CloudWatch alarm watches over a single metric and performs an action based on its value over a period of time.    
CloudWatch alarms does not directly monitor metrics. Instead, it performs statistical analysis of a metric over time and monitors the result. This is called the _data point to monitor_.    

__Data Point to Monitor__  
Suppose you want to monitor the average of the AWS/EBS VolumeReadOps metric over a 15-minute period. The metric has a resolution of 5 minutes. You would choose Average for the statistic and 15 minutes for the period.  
__Note:__ You should set the period equal to or greater than the resolution of the metric so that the CloudWatch Alarm will work properly.

__Threshold__  
The threshold is the value the data point to monitor must meet or cross to indicate something is wrong. You defi ne a threshold by specifying a value and a condition.

__Alarm States__  
An alarm can be in one of the three following states at any given time: _ALARM_, _OK_, _INSUFFICIENT_DATA_ 
