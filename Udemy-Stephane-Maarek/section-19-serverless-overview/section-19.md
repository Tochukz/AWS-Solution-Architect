## Section 19: Serverless Overview
### Serverless Overviews from a Solution Architect Perspective

__Serverless in AWS__  
* AWS Lambda
* DynamoDB
* AWS Cognito
* AWS API Gateway
* Amazon S3
* AWS SNS & SQS
* AWS Kinesis Data Firehose
* Aurora Serverless
* Step Functions
* Fargate

#### AWS Lambda
__Lambda Container Image__  
* The container image must implement the Lambda Runtime API
* ECS / Fargate is preferred for running arbitrary Docker images

__AWS Lambda Limits__   
* __Execution__
  - Memory allocation: 128 MB – 10GB (1 MB increments)
  - Maximum execution time: 900 seconds (15 minutes)
  - Environment variables (4 KB)
  - Disk capacity in the “function container” (in /tmp): 512 MB to 10GB
  - Concurrency executions: 1000 (can be increased)
* __Deployment__  
  - Lambda function deployment size (compressed .zip): 50 MB
  - Size of uncompressed deployment (code + dependencies): 250 MB
  - Can use the `/tmp` directory to load other files at startup
  - Size of environment variables: 4 KB

#### Reserved and Provisioned Concurrency
Reserved Concurrency and Provisioned Concurrency are management features that help you control how your Lambda functions scale and manage their performance.  
##### 1. Reserved Concurrency   
Reserved Concurrency guarantees a specific number of execution environments for a Lambda function. This ensures that the function can always scale up to the reserved limit, even if other functions in the same AWS account are consuming concurrency.  

__Key Points__    
* __Guaranteed Capacity__: Ensures that the function always has the specified number of execution environments available.
* __Throttling__: If the function exceeds its reserved concurrency limit, additional invocations are throttled.
*  __Isolation__: Prevents other functions from consuming all available concurrency in your account.

__Use Cases__  
* Critical functions that must always have capacity to run.
* Functions that need to be isolated from other functions in terms of concurrency.

__Configuration in CloudFormation__   
You can configure Reserved Concurrency using the `ReservedConcurrentExecutions` property in the `AWS::Lambda::Function` resource.  

##### 2. Provisioned Concurrency
Provisioned Concurrency initializes a specified number of execution environments in advance, so they are ready to handle requests immediately. This reduces the cold start latency for your Lambda function.  

__Key Points__  
* Warm Start: Pre-initializes execution environments, reducing cold start latency.
* Cost: You are charged for the provisioned concurrency, even if it is not fully utilized.
* Scaling: Provisioned Concurrency does not limit the maximum concurrency of the function. It only ensures that a certain number of environments are always warm.  

__Use Cases__  
* Latency-sensitive applications (e.g., real-time APIs, user-facing applications).
* Functions with long initialization times (e.g., loading large dependencies or models).

__Configuration in CloudFormation__   
You can configure Provisioned Concurrency using the `AWS::Lambda::Version` and `AWS::Lambda::Alias` resources, along with the `ProvisionedConcurrencyConfig` property.

#### Lambda SnapStart
* Improves your Lambda functions performance up to 10x at no extra cost for Java, Python & .NET
* When enabled, function is invoked from a pre-initialized state (no function initialization from scratch)
* When you public a new version:
  - Lambda initializes your function
  - Takes a snapshot of memory and disk state of the initialized function
  - Snapshot is cached for low-latency access


#### CloudFront Function and Lambda@Edge
__Edge Function__ is code that you write and attach to CloudFront distributions. It runs close to your users to minimize latency. CloudFront provides two types of Edge functions:
1. CloudFront Functions
2. Lambda@Edge

__CloudFront Functions__  
* Lightweight functions written in JavaScript
* For high-scale, latency-sensitive CDN customizations
* Sub milliseconds startup times, millions of requests/second
* Used to change Viewer requests and responses:
  - Viewer Request: after CloudFront receives a request from a viewer
  - Viewer Response: before CloudFront forwards the response to the viewer
* Native feature of CloudFront (manage code entirely
within CloudFront)

__Lambda@Edge__  
* Lambda functions written in NodeJS or Python
* Scales to 1000s of requests/second
* Used to change CloudFront requests and responses:
  - Viewer Request – after CloudFront receives a request from a viewer
  - Origin Request – before CloudFront forwards the request to the origin
  - Origin Response – after CloudFront receives the response from the origin
  - Viewer Response – before CloudFront forwards the response to the viewer
* Author your functions in one AWS Region (us-east-1), then
CloudFront replicates to its locations

#### Lambda in VPC
__Lambda with RDS Proxy__  
* If Lambda functions directly access your database, they may open too many connections under high load
* RDS Proxy
  - Improve scalability by pooling and sharing DB connections
  - Improve availability by reducing by 66% the failover time and preserving connections
  - Improve security by enforcing IAM
authentication and storing credentials in
Secrets Manager
* The Lambda function must be deployed in your VPC, because _RDS Proxy is never publicly accessible_.

#### Amazon DynamoDB
__Description__  
* Scales to massive workloads, distributed database
* Millions of requests per seconds, trillions of row, 100s of TB of storage
* Fast and consistent in performance (single-digit millisecond)
* Integrated with IAM for security, authorization and administration
* Low cost and auto-scaling capabilities
* No maintenance or patching, always available
* Standard & Infrequent Access (IA) Table Class

__DynamoDB - Read/Write Capacity Modes__  
* __Provisioned Mode (default)__   
  - You specify the number of reads/write per second
  - You need to plan capacity beforehand
  - Pay for provisioned Read Capacity Units (RCU) and Write Capacity Units (WCU)
* __On-Demand Mode__  
  - Read/writes automatically scale up/down with your workloads
  - No capacity planning needed
  - Pay for what you use, more expensive ($$$)
  - Great for unpredictable workloads, step sudden spikes

__DynamoDB Accelerator (DAX)__  
