# Lesson 60: EBS Snapshots - Hands on

### Description

Here we demonstrates how to configure and use Elastic Block Store (EBS).  
1. An EBS volume is configured and attached to an EC2 instance using the `EbsDemo.yaml` template.   
2. A snapshot is created from the EBS volume configured in 1 using the `create-snapshot.sh` script.  
3. The snapshot created from 2 is used to create another EBS volume in another availability zone using the `SnapshotDemo.yaml` template.  

### Operation

**Deployment**  
Validate the template

```
$ aws cloudformation validate-template --template-body file://EbsDemo.yaml
```

Deploy a stack using the CloudFormation template

```

$ aws cloudformation deploy \
    --template-file EbsDemo.yaml \
    --stack-name EbsDemo
```

Checkout outputs after successful deployment

```
$ aws cloudformation describe-stacks --stack-name EbsDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

Create snapshot using the VolumeId output from the deployment

```
$ ./create-snapshot.sh
```

Use the snapshot Id for the SnapshotId parameter in `SnapshotDemo.yaml`.

```
$ aws cloudformation deploy --template-file SnapshotDemo.yaml --stack-name SnapshotDemo
```

**Debug Errors**  
In the case of error during deployment

```
$ aws cloudformation describe-stack-events --stack-name EbsDemo
```

**Cleanup**  
To delete the stacks and snapshot

```
$ aws cloudformation delete-stack --stack-name SnapshotDemo
$ aws ec2 delete-snapshot --snapshot-id snap-082600691dc080332
$ aws cloudformation delete-stack --stack-name EbsDemo
```
