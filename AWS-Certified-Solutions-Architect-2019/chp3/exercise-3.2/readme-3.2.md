# Exercixe 3.2

### Problem
enable versioning and lifecycle management for an S3 bucket

### Operation  

**Deployment**
Deploy a stack using the CloudFormation template  

```
$ aws cloudformation deploy \
  --template-file LifeCycleBucket.yaml \
  --stack-name DevCycleBucket \
  --parameter-overrides file://DevParameters.json
```

In the event of a failure, check deployment events

```
$ aws cloudformation describe-stack-events --stack-name DevCycleBucket
```

**Cleanup**
```
$ aws cloudformation delete-stack --stack-name DevCycleBucket
```

Monitor the delete process

```
$ aws cloudformation describe-stacks --stack-name DevCycleBucket
```
