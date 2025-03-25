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

__CloudWatch Logs for EC2__  
* By default, no logs from your EC2 machine will go to CloudWatch
* You need to run a _CloudWatch Log Agent_ on EC2 to push log files you want
* Make sure your EC2 instance profile has permissions to create and put logs.
* A CloudWatch Log Agent can be setup on-premises on

__CloudWatch Logs Agent & Unified Agent__  
* For virtual servers (EC2 instances, on-premise servers...)
* __CloudWatch Logs Agent__
  - Is the Older version of the agent
  - Can only send to CloudWatch logs
* __CloudWatch Unified Agent__  
  - Collect additional system-level metrics such as RAM, processes, etc
  - Collect logs to send to CloudWatch Logs
  - Centralized configuration can be done using SSM Parameter Store

__CloudWatch Unified Agent - Metrics__  
* Collect directly on your Linux server /EC2 instance
* CPU (active, guest, idle, system, user,  steal)  
* Disk metrics (free, used, total), Disk IO (writes, reads, bytes, iops)
* RAM (free, inactive, used, total, cached)
* Netstat (number of TCP and UDP connections, net packets, bytes)
* Processes (total, dead, bloqued, idle, running, sleep)
* Swap Space (free, used, used %)

* Reminder: out-of-the box metrics for EC2 - disk, CPU, network (high level)

__CloudWatch Alarms__  
* Alarms are used to trigger notifications for any metric
* Various options (sampling, %, max, min etc)
* Alarm state
  - OK
  - insufficent_DATA
  - ALARM
* Period
  - Length of time in seconds to evaluate the metric
  - High resolution custom metrics: 10 sec, 30 sec or multiples of 60 secs

__CloudWatch Alarm Targets__  
1. Stop, Terminate, Reboot or Recover an EC2 Instance
2. Trigger Auto Scaling Action
3. Send notification to SNS (from which you can do pretty much anything)

__CloudWatch Alarm - Composite Alarms__  
* CloudWatch Alarms are on a single metric
* Composite Alarms are monitoring the state of multiple other alarms
* AND and OR conditions
* Help to reduce "alarm noise" by creating complex composite alarm

__EC2 Instance Recovery__  
* Status Check
  - Instance status = check the EC2 VM
  - System status = check the underlying hardware
  - Attached EBS status = check attached EBS volumes
* __Recovery__: Same Private, Public, Elastic IP, metadata, placement group

__CloudWatch Alarm: good to know__  
* Alarms can be created based on CloudWatch Logs Metric Filter  
* To test alarms and notifications, set the alarm state t Alarm using CLI
```bash
$ aws cloudwatch set-alarm-state --alarm-name myalarm --state-value ALARM --state-reason "testing purpose"
```

## Amazon Event Bridge
* You can archive events (all/filter) sent to an event bus (indefinitely or set period)
* Ability to replay archived events

__Amazon EventBridge - Schema Registry__  
* EventBridge can analyze the events in your bus and infer the _schema_.
* The _Schema Registry_ allows you to generate code for your application, that will know in advance how data is structured in the event bus.  
* Schema can be versioned

__Amazon EventBridge - Resource-bases Policy__  
* Manage permissions for a specific Event bus
* Example: allow deny events from another AWS account or AWS region
* Use case: aggregate all events from you AWS organization in a single AWS account or AWS region

__CloudWatch Container Insight__  
* Collect, aggregate, summarize metrics and logs from containers
* Available for containers on:
  - Amazon Elastic Container Service (Amazon ECS)
  - Amazon Elastic Kubernetes Services (Amazon EKS)
  - Kubernetes platform on EC2
  - Fargate (both for ECS and EKS)
* In Amazon EKS and Kubernetes, CloudWatch Insight is using a containerized version of the CloudWatch Agent to discover containers

__CloudWatch Lambda Insight__  
* Monitoring and troubleshooting solution for serverless application running on AWS Lambda
* Collects, aggregates, and summarizes system-level metrics including CPU time, memory, disk and network
* Collects, aggregate and summarizes diagnotic information such as cold starts and Lambda worker shutdown
* Lambda Insight is provided as a Lambda Layer

__CloudWatch Contributor Insight__  
* Analyze log data and create time series that display contributor data
  - See metrics about the top-N contributors
  - The total number of unique contributors and their usage
* This helps you find top talkers and understand who or what is impacting system performance
* Work for any AWS-generated logs (VPC, DNS etc)
* For example, you can find bad hosts, identify the heaviest network users, or find the URLs that generate the most errors
* You can build your rules from scratch or you can also use sample rules that AWS has created - leverages your CloudWatch Logs
* CloudWatch also provides built-in rules that you can use to analyze metrics from other AWS service.  

__CloudWatch Application Insight__  
* Provides automated dashboards that show potential problems with monitoring applications, to help isolate ongoing issues
* You applications run on Amazon EC2 Instances with select technologies only (Java, .NET, Microsoft IIS Web Server, databases...)
* And you can use other AWS resources such as Amazon EBS, RDS, ELB, ASG, Lambda, SQS, DynamoDB, S3, bucket, ECS, EKS, SNS, API Gateway...
* Powered by SageMaker
* Enhances visibility into your application health to reduce the time it will take you to troubleshoot and repair your application
* Finding and alerts are sent to Amazon EventBridge and SSM OpsCenter

## AWS CloudTrail
__Introduction__  
* Provides governance, compliance and audit for your AWS account
* CloudTrail is enabled by default!
* Get a history of events / API calls made within your AWS Account by
  -  Console
  - SDK
  - CLI
  - AWS Services
* Can put logs from CloudTrail into CloudWatch Logs and S3
* A trail can be applied to All Regions (default) or a single Region
* If a resource is deleted in AWS, investigate CloudTrail first!   

__CloudTrail Events__   
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

## AWS Config
__Introduction__  
* Helps with auditing and recording compliance of your AWS resources
* Help record configurations and changes over time
* Questions that can be solved by AWS Config:
  - Is there unrestricted SSH access to my security groups
  - Do my buckets have any public access
  - How has my ALB configuration changed over time?
* You can receive alerts (SNS notifications) for any change
* AWS Config is a per-region service
* Can be aggregated across regions and accounts
* Possibility of storing the configuration data into S3 (analyzed by Athena)

__Config Rules__  
* Can use AWS managed config rules (over 75)
* Can make custom config rules (must be defined in AWS Lambda)
  - e.g: Evaluate if each EBS disk is of type gp2
  - e.g: Evaluate if each EC2 instance is t2.micro
* Rules can be evaluated/triggered
  - For each config change
  - And/or at regular time interval
* AWS Config Rules _does not prevent actions from happening (no deny)_
* Pricing: no free tier, $0.003 per configuration item recorded per region, $0.001 per config rule evaluated per region

__AWS Config Resource__  
* View compliance of a resource over time
* View configuration of a resource over time
* View CloudTrail API calls of a resource over time

__Config Rules - Remediations__  
* Automate remediation of non-compliant resources using SSM Automation
* Use AWS-Managed Automation Documents or create custom Automation Documents
  - Tip: you can create Automation Documents that invokes Lambda function
* You can set _Remediation Retries_ if the resource is still non-compliance after auto-remediation

__Config Rules - Notifications__  
* Use EventBridge to trigger notifications when AWS resources are non-complaint
* Ability to send configuration changes and compliance state notifications to SNS (all events - use SNS Filtering or filter at client-side)

[List of AWS Config Managed Rules](https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html)
