# Lesson 380: AWS Batch

### Description

This configuration show how to setup and work with AWS Batch.

AWS Batch is a fully managed batch computing service. Think of it as AWS’s way of running large-scale, parallel, or long-running compute jobs without having to manually manage servers, queues, or job scheduling.

Our configuration runs a conterized workload on ECS Fargate.  
The job as initiated by submitting a job to the job queue.

### Operation

**Before Deploy**

1. Build and test the Docker image locally

```bash
$ cd job-code
$ docker build -t job-code .
$ docker run job-code
```

2. Push the Docker image to a private ECR repository

```bash
$ docker tag job-code:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/nestjs-repos:job-code
$ aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
$ docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/express-app:job-code
```

3. Update the `Image` section of the `private-parameters.json` file with your ECR image URI

**Deployment**  
Lint the templates

```bash
$ cfn-lint BatchJob.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file BatchJob.yaml  --stack-name BatchJob --capabilities CAPABILITY_IAM --parameter-overrides file://private-parameters.json
```

**After Deployment**

1. Go to the ECS Console > Clusters, to see the Cluster created by AWS Batch
2. Go to the ECS Console > Task Definition, to see the Task Definition created by AWS Batch
3. After submitting a job (`aws batch submit-job`), you can find the tasks that have been run, ECS Console > Clusters > Task tab

**Testing**

1. Submit a job to the job queue

```bash
$ aws batch submit-job  --job-queue SimpleBatchQueue --job-definition SimpleBatchJob --job-name test-job-1
# Copy the JobId from the output
```

2. Use the Job Id to check the job status later

```bash
$ aws batch describe-jobs --jobs <job-id> > output-job-1.json
```

3. Go to CloudWatch Console > Log Groups, `/aws/batch/job` to see the logs from the Batch job

4. Go to the AWS Batch Console > Dashboard, to see the Jobs that have been run and their status.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name BatchJob > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name BatchJob
```
