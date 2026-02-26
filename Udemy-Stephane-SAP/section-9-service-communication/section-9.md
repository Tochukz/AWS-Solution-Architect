# Section 9: Service Communication
## AWS Step Function
__Introduction__  
* Build serverless visual workflow to orchestrate your Lambda functions
* Represent flow as a JSON _state machine_
* Features: sequence, parallel, conditions, timeouts, error handling…
* Maximum execution time of 1 year
* Possibility to implement human approval feature
* If you chain Lambda functions using Step Functions, be mindful of the added latency to pass the calls.

__Step Function Integrations__  
* __Optimized Integrations__
  - Can invoke a Lambda function
  - Run an AWS Batch job
  - Run an ECS task and wait for it to complete
  - Insert an item from DynamoDB
  - Publish message to SNS, SQS
  - Launch an EMR, Glue, or SageMaker jobs
  - Launch another Step Function workflow…
* __AWS SDK Integrations__  
  - Access 200+ AWS services from your State Machine
  - Works like standard AWS SDK API call

![](slides/step-function-integration-diagram.png)

__Step Functions Workflow Triggers__  
* You can invoke a Step Function Workflow (State Machine) using:
  - AWS Management Console
  - AWS SDK (`StartExecution` API call)
  - AWS CLI (`start-execution`)
  - AWS Lambda (`StartExecution` API call)
  - API Gateway
  - EventBridge
  - CodePipeline
  - Step Functions

__Step Functions – Sample Projects__  
https://console.aws.amazon.com/states/home?region=us-east-1#/sample-projects


__Step Functions – Tasks__  
* __Lambda Tasks:__  
  - Invoke a Lambda function
* __Activity Tasks:__  
  - Activity worker (HTTP), EC2 Instances, mobile device, on premise DC
  - They poll the Step functions service
* __Service Tasks:__  
  - Connect to a supported AWS service
  - Lambda function, ECS Task, Fargate, DynamoDB, Batch job, SNS topic, SQS queue
* __Wait Task:__  
  - To wait for a duration or until a timestamp

_Note__: Step Functions does not integrate natively with AWS Mechanical Turk. Use SWF instead

__Step Functions - Standard vs Express__  
![](slides/step-function-standard-vs-express.png)

__Express Workflow - Sync vs Async__  
![](slides/express-workflow-sync-vs-async.png)

__Step Functions – Error Handling__  
* You can enable error handling, retries, and add alerting to Step Function State Machine
* Example: set up EventBridge to alert via email if a State Machine execution fails

## Amazon SQS
SQS could be used as a write buffer for DynamoDB

__SQS DLQ – Redrive to Source__    
To redrive the messages from the DLQ back into the source
```
$ aws sqs start-message-move-task --source-arn <dlq-arn>
```

__Lambda – Event Source Mapping SQS & SQS FIFO__  
__Recommended__: Set the queue visibility timeout to _6x the timeout_ of your Lambda function

## Amazon MQ
__Introduction__  
* SQS, SNS are “cloud-native” services: proprietary protocols from AWS
* Traditional applications running from on-premises may use open protocols such as: _MQTT_, _AMQP_, _STOMP_, _Openwire_, _WSS_
* When migrating to the cloud, instead of re-engineering the application to use SQS and SNS, we can use Amazon MQ
* Amazon MQ is a managed message broker service for
  - Rabbit MQ
  - Active MQ
* Amazon MQ doesn’t “scale” as much as SQS / SNS
* Amazon MQ runs on servers, can run in Multi-AZ with failover
* Amazon MQ has both queue feature (~SQS) and topic features (~SNS)

__Amazon MQ – Re-platform__  
* _IBM MQ_, _TIBCO EMS_, _Rabbit MQ_, and _Apache ActiveMQ_ can be migrated to Amazon MQ.

[Step-by-Step Migration](https://aws.amazon.com/blogs/compute/migrating-from-ibm-mq-to-amazon-mq-using-a-phased-approach/)

## Amazon SNS
__Amazon SNS - How to publish__  
* Topic Publish (using the SDK)
  -  Create a topic
  -  Create a subscription (or many)
  - Publish to the topic
* Direct Publish (for mobile apps SDK)
  - Create a platform application
  - Create a platform endpoint
  -  Publish to the platform endpoint
  -  Works with Google GCM, Apple APNS, Amazon ADM…

__Application: S3 Events to multiple queues__   
* For the same combination of: _event type_ (e.g. object create) and prefix (e.g. images/) you can only have one S3 Event rule
* If you want to send the same S3 event to many SQS queues, use fan-out

__Amazon SNS – FIFO Topic__  
* FIFO = First In First Out (ordering of messages in the topic)
  - __NB:__ Only SQS Fifo or SQS Standard Queue can subscribe to SNS Fifo Topic
  - If you need other subscribers like Email or Lambda, you will to chain to the SQS. 
* Similar features as SQS FIFO:
  - Ordering by Message Group ID (all messages in the same group are ordered)
  - Deduplication using a Deduplication ID or Content Based Deduplication
* Can have SQS Standard and FIFO queues as subscribers
* Limited throughput (same throughput as SQS FIFO)
