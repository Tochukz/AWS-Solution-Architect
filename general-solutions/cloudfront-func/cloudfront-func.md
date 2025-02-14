# CloudFront Proxy

## CloudFront Distribution for Frontend Asset and Proxy Server

## Requirement

This solution is for a real live scenerio for an application.
The requirements are as follows:

1. Configure a cloudfront distribution to host VueJS application.
2. All request to the cloudfront distribution that has the path `/simulation/api/*`, should be forward to the API server at with the path modified to `/api/*`
3. All request forwarded to the API server should have their headers modified with Authorization header added with a Bearer token.

## Solution

A Cloudfront Distribution will be configure with a path based routing that route all traffic with the pattern `/simulation/api/*` to the API server.  
A CloudFront Function will be configured to intercept requests going to the API server.  
It will modify the request header and add the required Authorization token.  
The CloudFront Function will also re-write to URI of the requests from `/simulation/api/*` to `/api/*`.

## Operation

**Pre-deploymnet**

**Deployment**  
Lint the templates

```bash
$ cfn-lint CloudFrontFunc.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CloudFrontFunc.yaml --stack-name CloudFrontFunc --parameter-overrides file://parameters.json
```

**After Deployment**  
Get the Hostname from the outputs

```bash
$ aws cloudformation describe-stacks --stack-name CloudFrontFunc --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Clean up**  
Empty the origin S3 bucket

```bash
$ aws s3 rm s3://app-asset-bucket-14-feb-24/ --recursive
```

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CloudFrontFunc
```
