# Section 24: AWS Monitoring, Troubleshooting & Audit
__AWS Monitoring and Audit: CloudWatch, X-Ray, CloudTrail and Config__  

## CloudWatch
__Amazon CloudWatch Metrics__  
* CloudWatch provides metrics for every service in AWS
* _Metric_ is a variable to monitor (e.g CPUUtilization, Networking...)
* Metric belongs to _namespaces_, we have one namespace per service
* _Dimension_ is an attribute of a metric (e.g instance id, environment etc)
* There are up to 30 dimensions per metric
* Metrics have timestamps
* You create CloudWatch dashboards of metrics so that you can visualize them at the same time
* You can create _CloudWatch Custom Metric_ (e.g RAM usage for an EC2 instance)

__CloudWatch Metric Stream__  
* You can continuously stream CloudWatch metrics to a destination of your choice, with _near-real-time delivery_ and low latency.
  - Amazon Kinesis Data Firehose (and then its destinations)
  - 3rd party service provider: Datadog, Dynatrace, New Relic, Splunk, Sumo, Logic..
* Option to filter metrics to only stream a subset of them

__CloudWatch Logs__  
* __Log groups:__ arbitrary name, usually representing an application
* __Log stream:__ instances within application/log file/container
* You can define log expiration policy (e.g never expires, 1 day to 10 years)
* CloudWatch logs can send logs to
  - Amazon S3 (export)
  - Kinesis Data Streams
  - Kinesis Data Firehose
  - AWS Lambda
  - OpenSearch
* Logs are encrypted by default
* You can setup KMS-base encryption with you own keys

__CloudWatch Logs - Sources__  
* You can send logs using SDK, CloudWatch Logs Agent, CloudWatch Unified Agent (deprecated)
* Elastic Beanstack: collection of logs from application
* ECS: collection from containers
* AWS Lambda: collection from function logs
* VPC Flow Logs: VPC specific logs
* API Gateway: log all requests
* CloudTrail based on filter

__CloudWatch Logs Insight__  
Use _CloudWatch Logs Insight_ to query the logs in CloudWatch logs.  
* Search and analyse log data stored in CloudWatch Logs
* Example: find a specific IP inside a log, count occurrences of "ERROR" in your logs...
* Provide a purpose-built query language
  - Automatically discover fields from AWS services and JSON log events
  - Fetch desired event fields, filer based on conditions, calculate aggregate statistics, sort events, limit number of events
  - Can save queries and add them to CloudWatch Dashboards
* Can query multiple Log Groups in different AWS accounts
* It's a query engine, not a real-time engine

__CloudWatch Logs - S3 Export__  
* Log data can take up to 12 hours to become available for export
* The API call is _CreateExportTask_  
* Not _near-real-time_ or _real-time_... use Log Subscription instead to get real-time

__CloudWatch Logs Subscriptions__  
* Get a real-time log events from CloudWatch Logs for processing and analysis
* Send to _Kinesis Data Streams_, _Kinesis Data Firehose_ or Lambda
* __Subscription Filter__ - filter which logs are events delivered to your destination

__CloudWatch Logs Aggregation Multi-Acount & Multi Region__  
With _Subscription Filter_  it is possible to aggregate data from different CloudWatch logs in different accounts and different regions into a _Kinesis Data Stream_ in a single account. 

## CloudTrail Events  
__Event Types__  
There are three types of CloudTrail events
1. Management Events
  - Operations that are performed on resources in your AWS account
  - Examples
    * Configuring security (IAM AttachRolePolicy)
    * Configuring rules for routing data (Amazon EC2 CreateSubnet)
    * Setting up logging (AWS CloudTrail CreateTrail)
  - By default, trails are configured to log management Events
  - Can separate Read Events from Write Events

2. Data Events
  - By default, data events are not logged (because high volume operations)
  - Amazon S3 object-level activity (e.g GetObject, DeleteObject, PutObject): can be Read or Write Event
  - AWS Lambda function execution activity (the Invoke API)
3. CloudTrail Insight Events
  - Enable CloudTrail Insight to detect unusual activity in your account
    * inaccurate resource provisioning
    * hitting service limits
    * Bursts of AWS IAM actions
    * Gaps in periodic maintenance activity
  - CloudTrail Insight analyzes normal management events to create a baseline
  - And then continuously analyzes write events to detect unusual patterns

__CloudTrail Events Retention__  
* Events are stored for 90 days in CloudTrail
* To keep events beyond this period, log them to S3 and use Athena
