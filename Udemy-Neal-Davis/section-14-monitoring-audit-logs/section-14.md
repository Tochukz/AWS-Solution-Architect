# Monitoring, Logging, and Auditing

## Amazon CloudWatch
__Introduction__  
CloudWatch is used for performance monitoring, alarms, log collection and automated actions
Use cases / benefits include:
* Collect performance metrics from AWS and on-premises systems
* Automate responses to operational changes
* Improve operational performance and resource optimization
* Derive actionable insights from logs
* Get operational visibility and insight

__Amazon CloudWatch__  
__CloudWatch Core Features__
* __CloudWatch Metrics__ – services send time-ordered data points to CloudWatch
* __CloudWatch Alarms__ – monitor metrics and initiate actions
* __CloudWatch Logs__ – centralized collection of system and application logs
* __CloudWatch Events__ – stream of system events describing changes to AWS resources and can trigger actions

__Amazon CloudWatch Metrics__  
* Metrics are sent to CloudWatch for many AWS services
* EC2 metrics are sent every 5 minutes by default (free)
* Detailed EC2 monitoring sends every 1 minute (chargeable)
* _Unified CloudWatch Agent_ sends system-level metrics for EC2 and on-premises servers
* System-level metrics include memory and disk usage
* Can publish custom metrics using CLI or API
* Custom metrics are one of the following resolutions:
  - __Standard resolution__ – data having a one-minute granularity
  - __High resolution__ – data at a granularity of one second
* AWS metrics are standard resolution by default

__Amazon CloudWatch Alarms__  
Two types of alarms
* __Metric alarm__ – performs one or more actions based on a single metric
* __Composite alarm__ – uses a rule expression and takes into account multiple alarms
* Metric alarm states:
  - OK – Metric is within a threshold
  - ALARM – Metric is outside a threshold
  - INSUFFICIENT_DATA – not enough data

## AWS CloudTrail
__Introduction__  
* CloudTrail logs API activity for auditing
* By default, management events are logged and retained for 90 days
* You can create a CloudTrail Trail logs any events to S3 for indefinite retention
* A Trail can be within a Region or all Regions
* CloudWatch Events can be triggered based on API calls in CloudTrail
* API Events can be streamed to CloudWatch Logs

__CloudTrail – Types of Events__  
* __Management events__ provide information about management operations that are performed on resources in your AWS account
* __Data events__ provide information about the resource operations performed on or in a resource
* __Insights events__ identify and respond to unusual activity associated with write API calls by continuously analyzing CloudTrail management events

### Cheat Sheets  
[Amazon CloudWatch](https://digitalcloud.training/amazon-cloudwatch/)  
[AWS CloudTrail Cheat Sheet](https://digitalcloud.training/aws-cloudtrail/)    
