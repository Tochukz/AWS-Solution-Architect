# Lesson 194: Amazon Kinesis Data Stream - Hands On

### Description

This template configures a Kinesis Data Stream .

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint DataStream.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file DataStream.yaml  --stack-name DataStream
```

**Testing**  
Write to the Kinesis Data Stream

```bash
$ aws kinesis put-record --stream-name DemoStream --partition-key Chucks --data "Tech Lead " --cli-binary-format raw-in-base64-out
$ aws kinesis put-record --stream-name DemoStream --partition-key Chucks --data "Cloud Architect " --cli-binary-format raw-in-base64-out
$ aws kinesis put-record --stream-name DemoStream --partition-key Chucks --data "Staff Engineer " --cli-binary-format raw-in-base64-out
```

You may keep the _ShardId_ from the response for later use.

Next is to consume from the stream.  
First get a shard Id of the stream if you didn't get it from the put-record action response

```bash
$ aws kinesis describe-stream --stream-name DemoStream
```

Now comsume the data using the shard Id

```bash
$ aws kinesis get-shard-iterator --stream-name DemoStream --shard-id shardId-000000000000 --shard-iterator-type TRIM_HORIZON
```

This should give you the _ShardIterator_.  
Use the ShardIterator to get the first batch of records

```bash
$ aws kinesis get-records --shard-iterator xxxxxxxxxxxx
```
At the end of the result, you will find the _NextShardIterator_ which can be used to fetch the next batch of records.

The GetRecord action gives you a batch of records with the Data encoded with Base64.   
You can decode the encoded data using a bash script or [base64decode.org](base64decode.org).  
Using bash script

```bash
$ ./decode.sh Q2xvdWQgQXJjaGl0ZWN0
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name DataStream > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name DataStream
```
