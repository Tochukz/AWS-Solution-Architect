# Create Organization and Account - HOL-70

### Description

The template creates an AWS Organization and an Account within the Organization.

### Operation

**Before deployment**  
To check if your Account is already part of an orgnization

```bash
$ aws organizations describe-organization
```

If your account is not part of an organization, you'll see an error (AWSOrganizationsNotInUseException) with the message: _"... Your account is not a member of an organization."_

AWS CloudFormation uses the `CreateAccount` operation to create accounts.  
This is an asynchronous request that AWS performs in the background.  
Because CreateAccount operates asynchronously, it can return a successful completion message even though account initialization might still be in progress.  
You might need to wait a few minutes before you can successfully access the account.

### Deployment

Lint the templates

```bash
$ cfn-lint OrgAndAccount.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file OrgAndAccount.yaml --stack-name OrgAndAccount --parameter-overrides file://private-parameters.json
```

**After deployment**  
Get the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name OrgAndAccount --query "Stacks[0].Outputs" --no-cli-page
```

Check if the AccountStatus is `ACTIVE`.  
Wait a few minutes for the AccountStatus to become active before you can start interacting with the account.

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name OrgAndAccount > events.json
```

### Testing

Get the AccountId from the stack output.

#### 1. Login to the account using the Console

- On the Console, click on the Account Menu > Switch Role

- Enter the Details for you new Account - see `new-account.txt` for sample account details
- Click Switch Role
- You can now access the services in the new account.
- When you are done, go back the the Account Menu > Switch Back

#### 2. Access the new account using AWS CLI

**Using generated access keys**  
Assume the `OrganizationAccountAccessRole` role for the new account

```bash
$ aws sts assume-role --role-arn "arn:aws:iam::<account-id>:role/OrganizationAccountAccessRole" --role-session-name "MySession"
```

Remember to replace `<account-id>` with the actual account Id of the new account.  
The result of the `AssumeRole` action provides us with `AccessKeyId` and `SecretAccessKey` credentials that can be exported to the terminal

```bash
export AWS_ACCESS_KEY_ID="ASIA**************"
export AWS_SECRET_ACCESS_KEY="wJalrXUtnF**************"
export AWS_SESSION_TOKEN="FQoGZXIvYXdz**************"
```

The temporary credentials expires in 1 hour by default, max: 12 hours.

Now check the new Identity of the caller to verify the Assumed Role.

```bash
$ aws sts get-caller-identity
```

**Using AWS profile**  
Instead of setting environment variables, you can use AWS CLI profile.  
Add a new profile to `~/.aws/config` file

```bash
[profile my-assumed-role]
role_arn = arn:aws:iam::<account-id>:role/OrganizationAccountAccessRole
region = eu-west-2
source_profile = default
```

Remember to replace the `<account-id>` with the actual Account Id of your new account.

The `source_profile` parameter in the newly created profile must point to the profile of your management account.  
Now you can access the newly created account using the profile but without using any manually generated access keys.

```bash
$ aws sts get-caller-identity  --profile my-assumed-role
```

### Cleanup

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name OrgAndAccount --profile default
```
