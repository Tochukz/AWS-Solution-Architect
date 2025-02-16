# CloudFront Proxy

## CloudFront Distribution for Frontend Asset and Proxy Server to Backend API

## Requirement

This solution is for a real live scenerio for an application.
The requirements are as follows:

1. Configure a cloudfront distribution to host VueJS application.
2. All request to the cloudfront distribution that has the path `/simulation/api/*`, should be forward to the API server with the path modified to `/api/*`
3. All request forwarded to the API server should have their headers modified with Authorization header added with a Bearer token.

## Solution

A _Cloudfront Distribution_ will be configure with a path based routing that route all traffic with the pattern `/simulation/api/*` to the API server.  
A _CloudFront Function_ will be configured to intercept requests going to the API server.  
The CloudFront Function will modify the request header and add the required Authorization token.  
The CloudFront Function will also re-write the URI of the requests from `/simulation/api/*` to `/api/*`.

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint CloudFrontFunc.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CloudFrontFunc.yaml --stack-name CloudFrontFunc --parameter-overrides file://secret-parameters.json
```

**After Deployment**  
Copy your frontend assets of you React or VueJS application into the origin S3 bucket

```bash
$  aws s3 sync lab-site s3://app-asset-bucket-14-feb-24
```

If you make updates to the Single Page Application and you push the new assets to the S3 bucket, you should clear the CloudFront cache

```bash
$ aws cloudfront create-invalidation --distribution-id E1DDMZ3UBBYRT7 --path / --no-cli-pager
```

**Testing**  
Get the ApplicationUrl from the outputs

```bash
$ aws cloudformation describe-stacks --stack-name CloudFrontFunc --query "Stacks[0].Outputs" --no-cli-pager
```

Use a browser to access the application using the ApplicationUrl.  
Request made to the path `/simulation/api/*` could be done without a Bearer token.

**Clean up**  
Empty the origin S3 bucket

```bash
$ aws s3 rm s3://app-asset-bucket-14-feb-24/ --recursive
```

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CloudFrontFunc
```
