# Lesson 5: IAM Access Analyzer

## Demo 5: Policy Generator - IAM Access Analyzer

### Description

IAM Access Analyzer can observe CloudTrail logs of your IAM users, roles, or applications and generate a policy that grants only the permissions actually used. This helps create least-privilege IAM policies.  
IAM Access Analyzer reviews your AWS CloudTrail logs and generates a policy template that contains the permissions that the entity used in your specified date range.

### Operation

**Before Deployment**

1. You need an `AccessAnalyzer` to complete this exercide. An `AccessAnalyzer` was configured in `Udemy-Neal-Davis/section-2-iam/hol-19-access-evaluation-tool/`.  
   Check it out and deploy the stack in your account if you don't already have an AccessAnalyzer.
2. You also need a _CloudTrail Trail_ that has been running for some time to be able to complete this exercise.  
   I setup a cloudTrail here [GitHub Tochukz/security-monitoring](https://github.com/Tochukz/Pulumi/tree/master/sample-projects/security-monitoring) using _Pulumi_. This can be translated to CloudFormation template if needed.

**Deployment**  
Here we will deploy another stack that provisions the Role that AccessAnalyzer can assume to carry out the `StartPolicyGeneration` action.

Lint the template

```bash
$ cfn-lint PolicyGeneration.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file PolicyGeneration.yaml  --stack-name PolicyGeneration --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the `AccessAnalyzerRoleArn` from the outputs

```bash
$ aws cloudformation describe-stacks --stack-name PolicyGeneration --query "Stacks[0].Outputs"
```

Update the `accessRole` value in the `cloudtrail-detail.json` with the `AccessAnalyzerRoleArn`.

Also set the `trails[0].cloudTrailArn` to your CloudTrail ARN.

**Testing**  
Generate IAM Policy using a target IAM Principal (User or Role) ARN and the `AccessAnalyzerRoleArn`.

1. Generate IAM Policy for an existing IAM Role using the Role ARN

```bash
$ aws accessanalyzer start-policy-generation --policy-generation-details file://private-iam-role.json --cloud-trail-details file://private-cloudtrail-details.json
# Use the jobId from the result previous command to get the generated policy
$ aws accessanalyzer  get-generated-policy --job-id 0cb60f80-8219-46c2-b538-adcd1b0341ee
# You should see the generated policy in generatedPolicies in the JSON response
```

You may need to wait for a time before running the `get-generated-policy` command.

2. Generate IAM Policy for an existing IAM User using the User ARN

```bash
$ aws accessanalyzer start-policy-generation --policy-generation-details file://private-iam-user.json --cloud-trail-details file://private-cloudtrail-details.json
# use the jobId to get the generated policy into a JSON file
$ aws accessanalyzer get-generated-policy --job-id f292c3f3-953b-40ae-8027-8c3c7398cfeb --query "generatedPolicyResult.generatedPolicies" > output-john-policy.json
```

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name PolicyGeneration > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name PolicyGeneration
```

### Learn more

[IAM Access Analyzer policy generation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html)
