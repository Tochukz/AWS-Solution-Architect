# AWS Resource Explorer

### Description

AWS Resource Explorer can be used to efficiently search for and discover your resources across AWS Regions and accounts. From the search results, you can quickly navigate to the resources in the appropriate service console and take action.

Before AWS Resource Explorer can be used, it has to be enabled.  
This configuration enables AWS Resource Explorer for all the regions in your account.

AWS Resource Explorer is provided at no additional cost.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint ResourceExplorer.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file ResourceExplorer.yaml  --stack-name ResourceExplorer
```

**After Deployment**
Go to the AWS Resource Explorer Console.
Click on Resources.
You can view all the resources deployed on your account.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name ResourceExplorer > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name ResourceExplorer
```
