# Extra 8.1: CloudFront Distribution Path-based Routing

### Description

This configuration demonstrates path-based routing for a CloudFront Distribution.  
Here we have a main bucket that server as the default origin and a second bucket
where request are routing to if the path matches `/site2/*`.

### Operation

**Before deployment**
Do not carry out these steps if you have already have an ACM certificate for the domain in the `us-east-region`.

1. Request for an ACM certificate for two domain names in the `us-east-1` region

```bash
$ aws acm request-certificate --domain-name '*.goodguys.click'  --validation-method DNS --region us-east-1
```

Copy the `CertificateArn` from the command output.

2. Describe the certificate

```bash
$ aws acm describe-certificate --certificate-arn <certificate-arn> --region us-east-1
```

3. From the output, get the _Name_ and _Type_ of the ResourceRecord for each DomainName and create a CNAME record on your DNS setup.

For example, consider the except

```json
"DomainValidationOptions": [
  {
    "DomainName": "*.goodguys.click",
    "ValidationDomain": "*.goodguys.click",
    "ValidationStatus": "SUCCESS",
    "ResourceRecord": {
        "Name": "_cahi9f8ec9f7pq3aa1c69af1d0f76c99.goodguys.click.",
        "Type": "CNAME",
        "Value": "_b4752rt505e2155d81b29af190dc7c90.zfyfvmchrl.acm-validations.aws."
    }
  }
  ...
]
```

For this, your CNAME record will have the host name `_cahi9f8ec9f7pq3aa1c69af1d0f76c99` and value `_b4752rt505e2155d81b29af190dc7c90.zfyfvmchrl.acm-validations.aws.` for the goodguys.click DNS records.

4. Wait for a few minutes for the Certificate to be issues before you deploy.
5. Copy your certificate ARN and update the `CertificateArn` parameter value in `parameters.json`

**Deployment**

Lint the templates

```bash
$ cfn-lint PathBasedRouting.yaml
```

Deploy the `PathBasedRouting` stack

```bash
$ aws cloudformation deploy --template-file PathBasedRouting.yaml --stack-name PathBasedRouting --parameter-overrides file://private-parameters.json
```

**After deployment**

1. Copy the website files to their respective buckets

```bash
$ aws s3 sync website-1 s3://site-1-bucket-23-05
$ aws s3 sync website-2 s3://site-2-bucket-23-05
```

2. Get the `AlternateUrl` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name PathBasedRouting --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Vist the website using the first domain in your browser e.g `site.goodguys.click`.
2. Go to the `/site2/` path and see if the website changes. e. g `site.goodguys.click/site2/`

**Cleanup**  
Empty the buckets

```bash
$ aws s3 rm s3://site-1-bucket-23-05 --recursive
$ aws s3 rm s3://site-2-bucket-23-05 --recursive
```

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name PathBasedRouting
```
