## Section 17: AWS Integration and Messaging
### Decoupling Applications: SQS, SNS, Kinesis, Active MQ  

__Introduction__  
There are two patterns of application communication
1. Synchronous communications (application to application)
2.  Asynchronous / Event bases (application to queue to application)

There are different approaches to decoupling your applications
1. using SQS: queue model
2. using SNS: pub/sub model
3. using Kinesis: real-time streaming model
These services can scale independently from your applications.  

### Amazon SQS - Standard Queue
__Attributes__  
* Unlimited throughput, unlimited number of messages in queue
* Default retention of messages: 4 days, maximum of 14 days
* Low latency (< 10 ms on publish and receive)
* Limitation of 256KB per message sent


__Message Visibility Timeout__  
A consumer could call the _ChangeMessageVisibility_ API to get more time if the _Message Visibility Timeout_ does not provide enough time for the consumer to process the message.  

### FIFO Queue
* Limited throughput: 300 msg/s without batching, 3000 msg/s with batching
* Exactly-once send capability (by removing duplicates using Deduplication ID)
* Ordering by Message Group ID (all messages in the same group are ordered ) - Mandatory Parameters

### Kinesis Data Streams
__Introduction to Kinesis Data Streams__  
* Collect and store streaming data in _real-time_.  
* Retention up to 365 days
* Ability to process (replay) data by consumer
* Data can't be deleted from Kinesis (until it expires)
* Data up to 1MB (typical use case is lot of small readl-time data)
* Data ordering guarantee for data with the same 'Partition ID'
* At-rest KMS encryption, in-flight HTTPS encryption
* Kinesis Producer Library (KPL) to write an optimized producer application
* Kinesis Client Library (KCL) to write an optimized consumer application

__Kinesis Data Streams - Capacity Modes__   
* Provisioned mode
  - Choose number of shards
  - Each shard gets 1 MB/s (1000 records per second)
  - Scale manually to increase or decrease the number of shared
  - You pay shard provisioned per hour

* On-demand model
  - No need to provision or manage the capacity
  - Default capacity provisioned (4 MB/s IN OR 4000 records per second)
  - Scale automatically based on observed throughput peak during the last 30 days
  - Pay per stream per hour & data in/out per GB

### Amazon Data Firehose
__Introduction to Data Firehose__  
* Was initiall called "Kinesis Data Firehose"
* Automatic scaling, serverless, pay for what you use
* _Near Real-Time_ with bufferring capability based on size/time
* Supports CSV, JSON, Parquet, Avro, Raw Text, Binary Data
* Conversions to Parquet /ORC, compressions with gzip/snappy
* Custom data transformations using AWS Lambda (e.g CSV to JSON)

### Amazon MQ
__Introduction__  
* SQS, SNS are "cloud-native" services: proprietary protocols from AWS
* Traditional applications running from on-premises may use open protocols such as _MQTT_, _AMQP_, _STOMP_, _Openwire_, _WSS_
* When migrating to the cloud, instead of re-engineering the application to use SQS and SNS, we can use Amazon MQ.  
* Amazon MQ is managed message broker service for _RabbitMQ_ and _ActiveMQ_
* Amazon MQ does not scale as much as SQS/SNS
* Amazon MQ runs on servers, can run in Multi-AZ with failover
* Amazon MQ has both queue feature (like SQS) and topic features (like SNS)

### Kinesis Data Stream vs FireHose vs Analystics
#### Ingestion
* Kinesis Data Stream can ingest data from source
* Kinesis Data Firehose can ingest data from source
* Kinesis Data Analytics cannot directly ingest data from source. It ingest data either from Kinesis Data Stream or Kinesis Data Firehose.

#### Output
* Kinesis Data Stream cannot directly write the output to Amazon S3
* Kinesis Data Firehose can directly write output to S3, RedShift, OpenSearch, Splunk, Custom endpoint but _NOT DynamoDB_
* Kinesis Data Analytics can send processed data to output

#### Integration or with other AWS Services
* Kinesis Data Stream does not offer a ready-made integration via an intermediary AWS Lambda function. You will need to do a lot of custom coding to get it.
* Kinesis Data Firehose have native integration to other AWS services like Lambda
* Kinesis Data Analytics...

#### Maintenance
* Kinesis Data Stream required administration such as provisioning sharding and manully scalling then when needed.  
* Kinesis Data Firehose is fully mananged service and automatically scales, no administration needed
* Kinesis Data Analytics...
