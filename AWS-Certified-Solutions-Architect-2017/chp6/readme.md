## Chapter 6: AWS Identity and Access Management (IAM)
#### Introduction   
The control provided by IAM is granular enough to limit a single user to the ability to perform a single action on a specific resource from a specific IP address during a specific time window.
If your application identities are bases on Active Directory, your on-premise Active Directory can be extended into the cloud to continue to fill that need. A great solution for using Active Directory in the cloud is _AWS Directory Service_, which is an Active Directory-compatible directory service that can work on its own or integrate with your on-premise Active Directory.  
Finally, if you are working with a mobile app, consider _Amazon Congito_ for identity management for mobile applications.  

__Authentication Technologies__    

Use Case                | Technology Solutions                                            |  
------------------------|-----------------------------------------------------------------|
Operating System Access | Active Directory, LDPA Machine-Specific accounts                |
Application Access      | Active Directory, Application User Repositories, Amazon Cognito |
AWS Resources           | IAM                                                             |

The AWS Partner Network (APN) includes a rich ecosystem of tools to manage and extend IAM.  

__Principals__  
A _principal_ is an IAM entity that is allowed to interact with AWS resources. There are three types of principals: root users, IAM users, and roles/temporary security tokens.  

__Root User__  
It is recommended to not use the root user for your everyday task, but instead to create IAM users and the securely lock away the root user credentials.  

__IAM Users__  
IAM users can be created by principals with IAM administrative privileges at any time and delete at any time. Users are an excellent way to enforce the principle of least privilege. Users can be associated with very granular policies that define these permission.

__Roles/Temporary Security Tokens__  
Roles are used to grant specific privileges to specific actors for a set duration of time. These actors can be authenticated by AWS or some trusted external system. When one of these actors assumes a tole, AWS provides the actor with a temporary security token from the _AWS Security Token Service (STS)_ that the actor can use to access AWS Cloud services. The range of a temporary security token lifetime is 15 minutes to 36 hours.  
Roles and temporary security tokens enable a number of use cases:    
* __Amazon EC2 Roles__ - Granting permissions to applications running on an Amazon EC2 instance.  
* __Cross-Account Access__ - Granting permission to users from other AWS accounts  
* __Federation__ - Granting permissions to users authenticated by a trusted external system.  

__Amazon EC2 Roles__  
An application running on an EC2 instance can use the access key of an IAM user to access other Amazon services, for example to Read or Write to an S3 bucket. There are a number of problems with this approach because the process foe obtaining, encrypting and storing the access key is complicated and a hinderance to agile development. There are also problems involved with rotating the access key and risk involved with passing the key around.   
Using IAM roles for Amazon EC2 removes the need to store AWS credentials in a configuration file.    
When the Amazon EC2 instance is launched, the role is assigned to the instance. When the application running on the instance uses the API to access the Amazon S3 bucket, it assumes the role assigned to the instance and obtains a temporary token that is sends to the API. The process of obtaining the temporary token and passing it to the API is handled automatically by most of the AWS SDKs, allowing the application to make a call to access the Amazon S3 bucket without worrying about authentication. This removes the need to store an access key in a configuration file. Also there is no need  for a rotation since the APIC access uses a temporary token.  

__Cross-Account Access__  
You can set up an IAM roe with the permissions you want to grant to users in the other account, then users in the other account can assume that role to access your resources. This is highly recommended as a best practice, as opposed to distributing access keys outside your organization.  

__Federation__  
_IAM Identity Providers (IdP)_ provides the ability to federate outside identities with IAM and assign privileges to those users authenticated outside of IAM.   
IAM can integrate with two different types of outside _Identity Providers(IdP)_:
* __OpenID Connect (OIDC)__ - IAM supports integration via OIDC for federating web identities such as Facebook, Google or Login with Amazon . This allow IAM to grant privileges to users authenticated with some of the major web-bases IdPs.  
* __Security Assertion Markeup Language 2.0 (SAML)__ - IAM support SAML for federtin internal identities, such as Active Directory and Lightweight Directory Access Protocol (LDAP). A SAML-compliant IdP such as Active Directory Federation Service (ADFS) is used to federate internal directory to IAM   

In each case, federation works by returning a temporary token associated with role to the IdP for the authenticated identity to use for calls to the AWS API.


#### Authentication
There are three ways that IAM _authenticated_ a principal:
* __User Name/Password__ - IAM allows you to create a password policy enforcing password complexity and expiration.  
* __Access Key__ - An access key is a combination of an access key ID (20 characters) and access secret key (40 characters).  
* __Access Key/Session Token__ - The Temporary security token provides an access key for authentication. In addition to the access key, then token also include a _session token_.  

#### Authorization
Authorization is handled in IAM by defining specific privileges in _policies_ and associating those policies with principals.  

__Policies__  
Policy document contains one or more permissions, with each permission defining:
* __Effect__ - Allow or Deny
* __Service__ - For what service
* __Resource__ - This is specified as an _Amazon Resource Name (ARN)_ which has the format `arn:aws:service:region:account-id:[resourceType:]resource`
* __Action__ - A set of actions can be specified with an enumerated list or by using wildcards
* __Conditins__ - Optionally defined one or more additional restrictions that limit the actions allowed by the permission. See the IAM documentation for lists of supported conditions for each service.  
```
{
  "Version": "2012–10–17",
  "Statement": [
     {
        "Sid": "Stmt1441716043000",
        "Effect": "Allow",
        "Action": [
          "s3:GetObject",
          "s3:ListBucket"
        ],
        "Condition": {
          "IpAddress": {  
             "aws:SourceIp": "192.168.0.1"
          }
        },
        "Resource": [
          "arn:aws:s3:::my_public_bucket/*"
        ]
      }
    ]
}
```
__Associating Policies with Principals__  
A policy can be associated directly with an IAM user in one of two way:  
* __User Policy__ A user policy is entered into the user interface on the IAM user page.  
* __Managed Policies__  There are a large number of predefined managed policies and you can write your own policies.  

There are two ways a policy can be associated with IAM group  
* __Group Policy__ - In the AWS Management Console, a group policy is entered into the user interface on the IAM Group page.
* _Managed Policies__ - A managed policy can be associated to a group same way it is associated to an individual user.  

The final was an actor can be associated with a policy is by assuming a role. I this case, the actor can be:  
* An authenticate IAM user (person or process)
* A person or process authenticated by a trusted service outside of AWS  

After an actor has assumed a role, it is provided with a temporary security token associated with the policies of that tole.

__Multi-Factor Authentication(MFA)__  
MFA, authentication also required entering a One-Time Password (OTP) from a small device. The MFA device can be either a small hardware device you carry with you or a virtual device via an app on your smart phone (for example, the AWS Virtual MFA app).   
MFA can be assigned to any IAM user account, whether the account represents a person or application. It is strongly recommended that AWS customer ass MFA protection to their root user.  

__Rotating Keys__  
It is a security best practice to _rotate access keys_ associated with your IAM users. IAM facilitates this process by allowing tow active keys at a time. Access keys should be rotated on a regular schedule.   

__Resolving Multiple Permissions__    
If an _AssumeRole_ call includes a role and a policy, the policy cannot expand the privileges of the role (for example, the policy cannot overrise any permission that is denied by default in the role.)

#### Exercises
Page [208]

#### Review Questions
Questions - Page [211], Answers Page [500]
