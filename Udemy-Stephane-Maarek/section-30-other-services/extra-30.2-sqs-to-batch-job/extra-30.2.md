# Extra 30.2: Event Based Batch Job

### Description

This example is an extention of `extra-30.1-scheduled-batch-job` where we run a batch job on a scheduled basis, once a day, using EventBridge Rule.  
Here we have changed the Event Bridge Rule from a shceduled event to an event parttern that listens to messages arriving in an SQS queue.  
When a message arrives in the SQS queue, the EventBridge Rule triggers the Batch Job.

### Operation

**Before Deploy**

1. **Test the Job code traditionally**

First create a test queue

```bash
$ aws sqs create-queue --queue-name test-queue
```

Use the QueueUrl from the output to update the `QUEUE_URL` variable in your `job-code/.env` file.

Send a message to the queue

```bash
$ aws sqs send-message --queue-url <QueueUrl> --message-body "This is a test message from CLI"
```

Run the job code locally

```bash
$ cd job-code
$ npm install
$ node job.js
```

2. **Build and test the Docker image locally**

```bash
$ cd job-code
$ docker build -t job-code10 .
# send another message to the queue
$ aws sqs send-message --queue-url <QueueUrl> --message-body "This is another test message from CLI"
# Test the image locally
$ docker run --env-file .env -e AWS_ACCESS_KEY_ID=xxxxxx -e AWS_SECRET_ACCESS_KEY=xxxxxx job-code10
```

2. Push the Docker image to a private ECR repository

```bash
$ docker tag job-code10:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/nestjs-repos:job-code10
$ aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
$ docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/express-app:job-code10
```

3. Update the `Image` section of the `private-parameters.json` file with your ECR image URI including the version tag

```json
{
  "ParameterKey": "EcrImageUrl",
  "ParameterValue": "<aws_account_id>.dkr.ecr.<region>.amazonaws.com/nestjs-repos:job-code10"
}
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint EventBasedBatchJob.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EventBasedBatchJob.yaml  --stack-name EventBasedBatchJob --capabilities CAPABILITY_IAM --parameter-overrides file://private-parameters.json
```

**After Deployment**

1. Go to the ECS Console > Clusters, to see the Cluster created by AWS Batch
2. Go to the ECS Console > Task Definition, to see the Task Definition created by AWS Batch
3. After sending a message to the target queue, you can find the tasks that have been run, ECS Console > Clusters > Task tab

**Testing**

1. Send a message to the target SQS queue

```bash
$ aws sqs send-message --queue-url https://sqs.eu-west-2.amazonaws.com/<account-id>/simple-queue-1009 --message-body "First development message"
```

2. Go to CloudWatch Console > Log Groups, `/aws/batch/job` to see the logs from the Batch job

3. Go to the AWS Batch Console > Dashboard, to see the Jobs that have been run and their status.

4. If you need to trigger the Job manually

```bash
$ aws batch submit-job  --job-queue SimpleBatchQueue --job-definition SimpleBatchJob --job-name test-job-x --container-overrides file://container-override.json
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EventBasedBatchJob > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EventBasedBatchJob
```
