## Section 24: AWS Monitoring, Troubleshooting & Audit
### AWS Monitoring and Audit: CloudWatch, X-Ray, CloudTrail and Config

#### CloudTrail Events  
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
