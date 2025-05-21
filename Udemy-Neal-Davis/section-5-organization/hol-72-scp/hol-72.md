# Create Service Control Policy (SCP) - HOL-72

### Description

This template build on `hol-70` which created an Organization and an Account within the Organization.  
Here we have updated the `OrgAndAccount` stack to include an Organizational Unit and then moved the Account into the Organizational Unit.

We also created a second template `SCP.yaml` to configure a Service Control Policy which is then attached to the Organizational Unit created in `OrgAndAccount`.

Before `SCP` can be deployed the Service Control Policy must be enable for the Organization using the Organizations Console or AWS CLI.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint OrdAndAccount.yaml
$ cfn-lint SCP.yaml
```

1. Deploy the OrganAndAccount stack

```bash
$ aws cloudformation deploy --template-file OrgAndAccount.yaml --stack-name OrgAndAccount --parameter-overrides file://private-parameters.json --profile sovtechchucks
```

2. Enable Service Control Policy for the Organization's root.

Using the Console, to go AWS Organizations > Policies > Service control policies > Enable service control policies.

To enable SCP using the AWS CLI

```bash
$ aws organizations enable-policy-type --root-id r-xxxxxxxx --policy-type SERVICE_CONTROL_POLICY --profile sovtechchucks
```

You can get the RootId from the stack output or by running `aws organizations list-roots`.

3. Deploy the Service Control Policy stack

```bash
$  aws cloudformation deploy --template-file SCP.yaml --stack-name SCP --profile sovtechchucks
```

**After deployment**

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name SCP > events.json
```

**Testing**

1. Setup a profile for the FirstAccount member account:  
   In `~/.aws/config` add

```bash
[profile first-account] # Member account under sovtechchucks
role_arn = arn:aws:iam::<account-number>:role/OrganizationAccountAccessRole
region = eu-west-2
source_profile = sovtechchucks
```

You can get the `role_arn` from the `AccountRoleArn` output parameter.

2. Use the profile to create S3 bucket and upload a file to the S3 bucket

```bash
$ aws s3 mb s3://hol-72-bucket --profile first-account
$ aws s3 cp new-account.txt s3://hol-72-bucket/new-account.txt --profile first-account
$ aws s3 ls s3://hol-72-bucket --profile first-account
```

3. Try to carry out actions that the Service Control Policy disallows

```bash
$ aws s3 rm s3://hol-72-bucket/new-account.txt --profile first-account
```

You should get an error telling you that the action was explicitly denied by the service control policy

4. You can temporarily remove the Organizational Until as a target of the Policy for be able to carry out the disallowed actions.

**Cleanup**
You must remove the account from Organizational Unit before you delete the Organizational Unit.

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SCP
$ aws cloudformation delete-stack --stack-name OrgAndAccount.txt
```
