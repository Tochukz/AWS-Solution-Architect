## Chapter 6: Authentication and Authorization - AWS Identity and Access Management    
#### Introduction   
IAM identities are sometimes described as _principals_. An identity represents an AWS user or a role. Roles are identities that can be temporarily assigned to an application, service, user or group.   
Identities can be federated, that is, users or applications without AWS accounts can be authenticated and given temporary access to AWS resources using an external service such as Kerberos, Microsoft Active Directory or the Lightweight Directory Access Protocol (LDAP).  
You can attached policies to either principal (identity-based policies) or resources (resource-based policies).  

#### IAM Identities  
AWS suggests that you protect your root account and delegate specific powers for day-to-day operations to other users.  
The Security Status checklist from IAM page:  
* Delete your root access keys  
* Activate MFA on your root account  
* Create individual IAM users
* Use groups to assign permissions  
* Apply an IAM password policy  

__IAM Policies__  
An IAM policy is a document that identifies one or more `actions` as they relate to one or more AWS `resources` and determines if the `effect` is either _Allow_ or _Deny_. For example, a given policy may _Allow_ the "creation of bucket" `action` within the S3 `resource`.
You can use IAM preset policies or create your own using the Crete policy page or manually using JSON. For example,
```
{
  "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "*",
        "Resource": "*"
      }
    ]
}
```
the identity that holds this policy will be _allowed_ to perform any `action` on any `resource` in your account.        
A single IAM policy can be associated with any number of identities, and a single identity can have as many as 10 managed policies (each no greater than 6,144 characters) attached to it.

__User and Root Accounts__  
The best ways to protect your root account is to lock it down by doing the following.
* Delete any access keys associated with root.
* Assign a long and complex password and store it in a secure password vault.
* Enable multifactor authentication (MFA) for the root account.  
* Wherever possible, don't use root to perform administration operations.
* Create a main admin user and grant it `AdministratorAccess` policy.

 The admin user may be able to do almost  everything but you will need the  root user  to perform some actions such as
 * to create or delete account-wide budgets
 * to enable MFA Delete on an S3 bucket.

On your IAM security Credential page, you can generate X.509 certificates to encrypt Simple Object Access Protocol (SOAP) requests to those AWS services that allow it.  SOAP requests to S3 and Amazon Mechanical Turk are an exception to this rule, as they use regular keys rather than X.509 certificate.

__Key Rotation__   
Key rotation is automated for IAM roles used by EC2 resources to access other AWS services.  But if your keys are designed for you own applications you have to manage your key rotation by yourself. To determine if you application is still using an old access key do:
```
$ aws iam get-access-key-last-used --access-key-id ABCDEFGHIJKLMNOP
```  
Key rotation can be enforced by including rotation in the password policy associated with your IAM user accounts.

__Create, Use and Delete an AWS Access Key__  
If you already configured an access key for AWS CLI, you can add another one in parallel by using the `--profile`  argument  
```
$ aws configure --profile account2
```
And then when you can invoke the profile when issue a command   
```
$ aws s3 ls --profile account2
```

__Groups__  
You can create a separate IAM group for each class of user and then associate each of your users with the group that fits their job description.  Say for example, one group for developers and another for admin.   

__Roles__    
An IAM role is a temporal identity that a user or service seeking access to your account resources can request. You can use it to give temporal access to another AWS account or uses who sign in using a federated authentication service. Am IAM role by default expires after 12 hours.     
To create a new role you must first select one of four _trusted entity_:
* AWS service (EC2, Lambda, etc)
* Another AWS account (identified by its account ID)
* Web Identity (Google, Facebook, Amazon, Amazon Cognito)
* SAML 2.0 federation (Security Assertion Markup Language)  

next, you give it permission y creating and attaching your policy document or one or more preset IAM policies.  When a trusted entity assumed it new role, AWS issues it a time-limited security token using the AWS Security Token Service (STS)  

#### Authentication Tools
The following tools are for user authentication:  
* Amazon Cognito
* AWS Managed Microsoft AD
* AWS Single Sign-On services  
For administration of encryption keys and authentication secrets, AWS have
* AWS Kay Management Service (KMS)
* AWS Secrets Manager
* AWS CloudHSM  

__Amazon Cognitor__  
Cognito provided mobile and web developers with two important functions
* Through Congito's _user pools_, you can add user sign-up and sign-in to your applications  
* Through Cognito's _identity pools_, you can give your application users temporary, controlled access to other services in your AWS account.   

__AWS Managed Microsoft AD__   
Managed Microsoft AD is actually accessed through the AWS Directory Service, as are a number of directory management tools like Amazon Cloud Directory and Cognito.  What the Directory Service tools all share in common is the ability to handle large stores of data and integrated them into AWS operations.

__AWS Single Sign-On__  
Single sign-on (SSO) allows you to provide users with streamlined authentication and authorization through n existing Microsoft Active Directory configures within AWS Directory Service. The service works across multiple AWS accounts within AWS Organizations. Companies with more than one AWS account can use AWS Organizations to unify and integrate the way their assets are exposed and consumed no matter how distributes they might be.  

__AWS Key Management Service__  
K,S deeply integrates with AWS services to create and manage your encryption keys.  The service lets you create, track, rotate, and delete the keys that you'll use to protect your data. For regulatory compliance purposed, KMS is integrated with AWS CloudTrail, which records all key-related events.  

__AWS Secrets Managehttps://dlslab.com/r__  
AWS Secrets Manager can be used to manage your third-party API keys.  The manager can automatically take care of credential rotation for you.  

__AWS CloudHSM__
CloudHSM (Hardware Security Module) launches virtual compute device cluster to perform cryptographic operations on behalf of your web server infrastructure. It off-loads the burden of generating, store and managing cryptographic keys from your web servers.   
You activate an HSM cluster by running the CloudHSM client as a daemon on each of your application hosts. The client is configures to fully encrypt communication with the HSM.  

#### AWS CLI Example   
To create a new user
```
$ aws iam create-user --user-name john
```  
To confirm that a user exists
```
$ aws iam get-user --user-name jacob
```
To attach a policy to a user, use must pass the policy's Amazon Resource Name (ARN) as follows:  
```
$ aws iam attach-user-policy ––policy-arn arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess \
––user-name maxwell
```  
To show the access keys associated with a user
```
$ aws iam list-access-keys --user-name john
```
To create a new access key
```
$ aws iam create-access-key  --user-name john
```
To delete an access key  
```
$ aws iam delete-access-key --user-name john --access-key-id ACCESSKEYID
```

#### Review Questions  
Questions Page[170], Answers Page [364]
