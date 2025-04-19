# Cognito Auth

## Requirement

You have been hired as a Solutions Architect to advise a company on the various authentication/authorization mechanisms that AWS offers to authorize an API call within the Amazon API Gateway. The company would prefer a solution that offers built-in user management.

Which of the following solutions would you suggest as the best fit for the given use-case?

## Solution

Use Amazon Cognito User Pools

## Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint CognitoAuth.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CognitoAuth.yaml --stack-name CognitoAuth
```

**After Deployment**  

**Testing**  

**Clean up**  

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CognitoAuth
```

__Learn More__  
[Identity and access management](https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/identity-and-access-management.html)
