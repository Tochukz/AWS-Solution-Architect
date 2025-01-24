# Lesson 51: EC2 Placement Groups - Hands on

### Description

This template configures 3 Placement Groups and launch EC2 instances into each Placement Group.

There are three possible types of Placement Groups:

1. **Cluster**  
   A cluster placement group is a logical grouping of instances within a single Availability Zone that benefit from low network latency, high network throughput.
2. **Partition**  
   A partition placement group places groups of instances in different partitions, where instances in one partition do not share the same hardware with instances in another partition.
3. **Spread**  
   A spread placement group places instances on distinct hardware.

The EC2 instances launched into a Cluster Placement Group must use an instance types that supports _enhanced networking_ and Elastic Network Adapters (ENA)

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint PlacementGroup.yaml
```

Deploy a stack using the CloudFormation template

```bash
$ aws cloudformation deploy --template-file PlacementGroup.yaml --stack-name PlacementGroup
```

Checkout outputs after successful deployment

```bash
$ aws cloudformation describe-stacks --stack-name PlacementGroup  --query "Stacks[0].Outputs" --no-cli-pager
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name PlacementGroup
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name PlacementGroup
```
