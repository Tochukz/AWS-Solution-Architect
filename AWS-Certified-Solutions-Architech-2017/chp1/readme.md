## Chapter 1: Introduction to AWS  
__Cloud Computing Deployment Models__  
1. _All-in_ cloud deployment
2. Hybrid deployment

__Review Question__   
Question - Page [56]  
Answers  - Page [490]

__Global Infrastructure__  
You can achieve high availability by deploying your application across multiple _Availability Zones_. Redundant instances for each tier (for example, web, application and database) of an application should be placed in distinct _Availability Zones_, thereby creating a multisite solution. At a minimum, the goal is to have an independent copy of each application stack in two or more _Availability Zones_  

__Accessing the Platform__   
To access AWS Cloud services, you can use the
* AWS Management Console (Web)
* AWS Command Line Interface (CLI)
* AWS Software Development Kits (SDKs)  

__Compute and Networking Services__  

| Service                | Use                                                                                  |
|------------------------|--------------------------------------------------------------------------------------|
| Amazon EC2             | Compute capacity to build and host software systems                                  |
| AWS Lambda             | AWS compute fleet of EC2 for running backend code                                    |  
| Auto Scaling           | Allows organization to scale EC2 capacity up or down automatically                   |
| Elastic Load Balancing | Automatically distributes incoming traffic across multiple EC2 instances.            |
| AWS Elastic Beanstalk  | Hosting of web application in a fully managed environment.                           |
| Amazon VPC             | Isolated section of AWS for organization to lunch AWS resources in a virtual network |
| AWS Direct Connect     | Dedicated network connection from an organization data center to AWS                 |
| Amazon Route 53        | Domain Name System(DNS) web service and domain registrar                             |

__Storage and Content Delivery__   

| Service             | Use                                                                              |
|---------------------|----------------------------------------------------------------------------------|
| Amazon S3           | General purpose storage infrastructure                                           |
| Amazon Glacier      | Storage for data archiving and long term backup and infrequently accessed data.  |
| Amazon EBS          | Persistent block-level storage volumes for use with EC2 instances                |
| AWS Storage Gateway | Connects an on-premise software with cloud based storage on Amazon S3 or Glacier |
| Amazon CloudFront   | Content delivery service                                                         |

__Database Services__   

| Service            | Use                                                                              |
|--------------------|----------------------------------------------------------------------------------|
| Amazon RDS         | Provides a fully managed relational database service                             |
| Amazon DynamoDB    | Provides a fully managed NoSQL database service                                  |
| Amazon Redshift    | Fully managed petabyte-scale data warehouse service                              |  
| Amazon ElastiCache | Used for scaling of an in-memory cache on the cloud. Support Memcached and Redis |


__Management Tools__    

| Service            | Use                                                                              |  
|--------------------|----------------------------------------------------------------------------------|
| Amazon CloudWatch  | A monitoring service for AWS Clouse resources and applications                   |
| AWS CloudFormation | Used to create and manage a collection of related AWS resources or stack         |
| AWS CloudTrail     | Records AWS API calls for an account and delivers log files for audit and review |
| AWS Config         | For AWS resource inventory, config history, and config change notification       |

__Security and Identity__    

| Service                 | Use                                                                    |
|-------------------------|------------------------------------------------------------------------|
| AWS IAM                 | Used to create and manage AWS users and group and to grant permissions |
| AWS KMS                 | Used to create and control the encryption key used to encrypt data     |  
| AWS Directory Service   | To setup and run Microsoft Active  Directory in the AWS Cloud          |
| AWS Certificate Manager | Used to provision, deploy and manage SSL/TLS certificates and renewals |
| AWS WAF                 | Used to protect web applications from common attacks and exploitation  |  

__Application Services__   

| Service                   | Use                                                                                                  |
|---------------------------|------------------------------------------------------------------------------------------------------|
| Amazon API Gateway        | To create, publish maintain, monitor and secure APIs at scale                                        |
| Amazon Elastic Transcoder | To convert (or transcode) media files from their source formats into other version/format            |
| Amazon SNS                | To coordinate and manage the sending and delivery of messages                                        |
| Amazon SES                | Email service for sending transactional email, marketing message or any type of content to customers |
| Amazon SWF                | Fully manages state tracker and task coordinator used to build, run and scale background jobs        |
| Amazon SQS                | Fully managed message queuing service.                                                               |
