# Create Organization and Account - HOL-70

### Description

### Operation

**Before deployment**
To check if you Account is already part of an orgnization

```bash
$ aws organizations describe-organization
```

If your account is not part of an organization, you'll see an error (AWSOrganizationsNotInUseException) with the message: "... Your account is not a member of an organization."

AWS CloudFormation uses the `CreateAccount` operation to create accounts.  
This is an asynchronous request that AWS performs in the background.  
Because CreateAccount operates asynchronously, it can return a successful completion message even though account initialization might still be in progress.  
You might need to wait a few minutes before you can successfully access the account.

**Deployment**  
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
Wait a few minutes for the AccountStatus to be come active before you can start interacting with the account.

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name OrgAndAccount > events.json
```

**Testing**
Get the AccountId from the stack output.

1. Login to the account using the Console

- On the Console, click on the Account Menu > Switch Role
- Enter the Details for you new Account - see `new-account.txt` for sample account details
- Click Switch Role
- You can now access the services in the new account.
- When you are done, go back the the Account Menu > Switch Back

2. Assume the new Role for the new account using AWS CLI
   Assume the `OrganizationAccountAccessRole` role for the new account

```bash
$ aws sts assume-role --role-arn "arn:aws:iam::<account-id>:role/OrganizationAccountAccessRole" --role-session-name "MySession"
```

Remember to replace `<account-id>` with the actual account Id of the new account.

- **Cleanup**  
   To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name OrgAndAccount
```
