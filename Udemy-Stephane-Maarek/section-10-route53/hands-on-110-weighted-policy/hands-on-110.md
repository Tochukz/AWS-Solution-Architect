# Lesson 110: Routing Policy - Weighted

### Description

This template configures a weighted routes in Route53. Two A type records are configured for the same domain to two EC2 instances with weighting of 70% and 30%.

Note that you can also manage multiple records such as weighted routes using `AWS::Route53::RecordSetGroup` for better organization.

### Operation

**Deployment**  
Upload the child templates to S3

```
$ aws s3 cp WeightedChildEc2.yaml s3://chucks-workspace-storage/templates/WeightedChildEc2.yaml
```

Validate the template

```
$ aws cloudformation validate-template --template-body file://WeightedRoute.yaml
```

Deploy a stack using the _WeightedRoute_ template

```

$ aws cloudformation deploy --template-file WeightedRoute.yaml  --stack-name WeightedRoute
```

**Testing**
Use the DomainName parameter value to access the route on a Browser. It is expected that 70% of the time the use will be routed the the EC2 instance with 70% weight.

Use the `dig` utility to gain insight into the route

```bash
$ dig weighted.goodguys.click
```

**Debug Errors**
In the case of error during deployment, checkout the stack events

```

$ aws cloudformation describe-stack-events --stack-name WeightedRoute

```

**Cleanup**
To delete the stacks

```

$ aws cloudformation delete-stack --stack-name WeightedRoute

```
