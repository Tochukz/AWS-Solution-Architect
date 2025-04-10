# Section 30: Other AWS Services
## Quick overview of other servies that might have questions on at the exam

## Simple Email Service
__Introduction__  
* Allow inbound/outbound email
* Reputaion dashboard, performance insight, anti-spam feedback
* Provides statistics such as email deliveries, bounces, feedback loop results, email open
* Supports DomaikKeys Identified Mail (DKIM) and Sender Policy Framework (SPF)
* Flexible IP deployment: shared, dedicated, and customer-owned IPs
* Send emails using your application using AWS Console, APIs or SMTP

## Amazon PinPoint
__Introduction__
* Scalable 2-way (outbound/inbound) marketing communications service
* Supports email, SMS, push, voice, and in-app messaging
* Ability to segment and personalize messages with the right content to customers
* Possibility to recieve replies
* Scale to billions of messages per day
* Use cases: run campains by sending marketing, bulk, transactional SMS messages

__Amazon PinPoint vs SNS or SES__  
* In SNS & SES you manage each message's audience, content and delivery schedule
* In Amazon PinPoint, you create message template, delivery schedule, highly-targeted segments and full campaings

## AWS Systems Manager
__System Manager - Run Command__  
* Execute a document (script) or just run a command
* Run command across multiple instance (using resource groups)
* No need for SSH
* Command Output can be shown in the AWS Console, sent to S3 bucket or CloudWatch Logs
* Send notifications to SNS about status (In Progress, Success, Failed, ...)
* Integrated with IAM & CloudTrail
* Can be invoked using EventBridge

__Systems Manager - Patch Manager__  
* Automates the process of pathcing managed instances
* OS updates, applications updates, security updates
* Supports EC2 instances and on-premises servers
* Supports Linux, mac OS, and Windows
* Patch on-demand or on a schedule using _Maintenance Windows_
* Scan instances and generate patch compliance report (missing patches)

__Systems Manager - Maintenance Windows__  
* Defines a schedule for when to perform actions on your instances
* Example: OS patching, updating drivers, installing software...
* Maintenance Window contains
  - Schedule
  - Duration
  - Set of registered instances
  - Set of regiatered tasks

__Systems Manager - Automation__  
* Simplifies common maintenance and deployment tasks of EC2 instances and other AWS resources
* Examples: restart instances, create an AMI, EBS snapshot
* _Automation Runbook_ - SSM Documents to define actions performed on your EC2 instances or AWS resources (pre-defined or custom)
* Can be triggered using:
  - Manually using AWS console, AWS CLI, or SDK
  - Amazon EventBridge
  - On a schedule using Maintenance Windows
  - By AWS Config for rules remediations

## AWS Outposts
__Introduction__  
* _Hybrid Cloud_: businesses that keep an on-premise infrastrcuture alongside a cloud infrastructure
* Therefore, two ways of dealing with IT systems:
  - One for the AWS cloud (using the AWS console, AWS CLI and AWS APIs)
  - One for their on-premises infrastructure
* _AWS Outposts are "server racks"_ that offers the same AWS infrastructure, services, APIs & tools to build your own applications on-premises just as in the cloud
* _AWS will setup and manager "Outposts Racks"_ within your onpremise infrastructure and you can start leveraging AWS services on-premises.  
* You are responsible for the Outputs Rack physical security

__Benefits of using AWS Outposts__
* Low-latency access to on-premises systems
* Local data processing
* Data residency
* Easier migration from on-premises to the cloud
* Fully managed service

__Services that work on Outputs__  
EC2, EBS, S3, EKS, ECS, EDS, EMR

## AWS Batch
__Introduction__  
* Fully managed batch processing at any scale
* Efficiently run 100,000s of computing batch jobs on AWS
* A _batch_ job is a job with a start and an end (opposed to continuous)
* Batch will dynamically launch EC2 instances or Spot Instances
* AWS Batch provisions the right amount of compute / memory
* You submit or schedule batch jobs and AWS Batch does the rest
* Batch jobs are defined as Docker images and run on EC2
* Helpful for cost optimizations and focusing less on the infrastructure

__Batch versus Lambda__  
* Lambda  
  - Time limit
  - Limited runtimes
  - Limited temporary disk space
  - Serverless
* Batch
  - No time limit
  - Any runtime as long as it is packaged as a Docker image
  - Rely on EBS / instance store for disk space
  - Relies on EC2 (can be managed by AWS)  

## AWS AppFlow
__Introduction__  
* Fully managed integration service that enables you to securely tranfer data between Software-as-as-Service (SaaS) applications and AWS
* _Sources:_ SalesForce, SAP, Zendesk, Slack and ServiceNow
* _Destinations_: AWS services like S3, RedShift or non-AWS such as SnowFlake and SalesForce
* _Frequency:_ on a schedule, in response to events or on demand
* _Data transformation_ capabilities like filtering and validation
* _Encrypted_ over the public internet or privately over AWS PrivateLink
* Don't spend time writing the integrations and leverage APIs immediately

## AWS Amplify - web and mobile applications
* A set of tools and services that help you develop and deploy scalable full stack web and mobile application
* Authentication, Storage, API (REST GraphQL), CI/CD, PubSub, Analytics, AI/ML Predictions
* Connect your source code from GitHub AWS CodeCommit, BitBucket, GitLab or upload directly 
