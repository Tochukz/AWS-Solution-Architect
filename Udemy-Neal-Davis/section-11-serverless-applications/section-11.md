# Section 11: Serverless Applications
## AWS Lambda
__Lambda Function Invocations__  
__Synchronous__:  
* CLI, SDK, API Gateway
* Wait for the function to process the event and return a response
* Error handling happens client side (retries, exponetial backoff etc)

__Asynchronous__:  
* S3 SNS, CloudWatch Events etc
* Event is queued for processing and a response is returned immediately
* Lambda retries up to 3 times
* Processing must be idempotent (due to retried)  

__Event source mapping__:  
* SQS, Kinesis Data Stream, DynamocDB Streams
* lambda does the polling (pools the source)
* Records are processed in order (except for SQS standard)

## Application Integration Services
__Application Integration Service Overview__  
![application-integration-services](slides/application-integration-services.png)

__Kinesis Vs SQS Vs SNS__  
![kinesis-vs-sqs-vs-sns](slides/kinesis-vs-sqs-vs-sns.png)

## Amazon SQS
__SQS Queue Types__  
![sqs-queue-types](slides/sqs-queue-types.png)
