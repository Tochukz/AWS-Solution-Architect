# Udemy Course - AWS Certified Solution Architect
__By Stephane Maarek__  
[AWS Certified Solution Architect](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)

__Content__  

Section    | Title
-----------|--------
Section 1  | Introduction   
Section 2  | Code & Slide Download   
Section 3  | Getting Started with AWS   
Section 4  | IAM & AWS CLI   
Section 5  | EC2 Fundamentals   
Section 6  | EC2 - Solution Architect Associate Level   
Section 7  | EC2 Instance Storage   
Section 8  | High Availability and Scalability: ELB & ASG   
Section 9  | AWS Fundamentals: RDS + Aurora + ElastiCache
Section 10 | Route 53
Section 11 | Classic Solution Architecture Discussions
Section 12 | Amazone S3 Introduction
Section 13 | Advanced Amazon S3
Section 14 | Amazon S3 Security
Section 15 | CloudFront & AWS Global Accelerator
Section 16 | AWS Storage Extras
Section 17 | Decoupling applications: SQS, SNS, Kinesis, Active MQ
Section 18 | Containers on AWS: ECS, Fargate, ECR & EKS

__Connection Draining__  
* Connection Draining - for CLB
* Deregistration Delay - for ALB & NLB


__Auto Scaling Groups - Scaling Policies__  
1. Dynamic Scaling
  * Target Tracking Scaling
    - Simple to setup
    - Example: I want the average ASG CPU to stay at around 40%
  * Simple / Step Scaling
    - When a CloudWatch alarm is triggered (example CPU > 70%), then add 2 units
    - When a CloudWatch alarm is triggered (example CPU < 30 %), then remove
2. Schedules Scaling
  * Anticipate a scaling based on known usage pattern
  * Example: increase the min capacity to 10 at 5 pm on Fridays
3. Predictive Scaling:
  * continuously forecast load and schedule scaling ahead
  * useful for patterns that repeat themselves.  
  * you analyze historical load, generate forecast and schedule scaling action.

__Good metrics to scale on__  
1. __CpuUtilization__: Average CPU utilization across your instances
2. __RequestCountPerTarget__: to make sure the number of requests per EC2 instance is stable
3. __Average Network In / Out__ (if your application is network bound)
4.  __Any custom metric__(that you push using CloudWatch)


__Routing Policies__  
Route 53 supports the following Routing Policies
* __Simple__: Can map a subdomain to a single or multiple values
* __Weighted__: Control the % of request to each resource
* __Failover__:
* __Latency based__: Redirects to the resource that has the least latency for the user
* __Geolocation__:
* __Multi-Value Answer__:
* __Geoproximity__:  (using Route 53 Traffic Flow feature)

When configuring `AWS::Route53::RecordSet` the properties expects one of Weight, Region, Failover, GeoLocation, MultiValueAnswer, GeoProximityLocation, or CidrRoutingConfig.

__S3 Byte-Range Fetches__  
* Parallelize GETs by requesting specific ranges
* Better resilience in case of failures
* Can be used to speed up downloads

### Resources
[Slide and Code Download](https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/)  
[AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure)  
[EC2 Instance-Types Comparison](https://instances.vantage.sh/)

## Readings
[53 - Elastic Network Interface](https://aws.amazon.com/blogs/aws/new-elastic-network-interfaces-in-the-virtual-private-cloud/)

## References
[EBS Volume Types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html)
