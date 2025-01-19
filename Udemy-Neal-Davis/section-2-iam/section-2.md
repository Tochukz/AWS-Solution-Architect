# Section 2: AWS Identity and Access Management
__Permissions Boundary__   
A permission boundary is an IAM identity based policy that sets the _maximum permissions_ that an entity can have.  
A permission boundary can be attached to users and roles.  

__Privilege Escalation__  
Privilege escalation can occur when a user say John, with only IAMFullAccess creates another user, Peter with AdministratorAccess thus having more permission than John.  
Privilege escalation can be mitigated by attaching a _Permission Boundary_ to the Users IAM account.
Permission Boundary can stop John from granting more permission than he have.  


__Types of Policy__  
1. __Identity-based policies__ - attaches to users groups or roles
2. __Resource-based policies__ - attached to a resource; define permissions for a principal accessing the resource
3. __IAM permission boundaries__ - set the maximum permissions an identity-based policy can grant an IAM entity
4. __AWS Organizations service control policies (SCP)__ - specify the maximum permissions for an organization or Organizational Unit (OU).
5. __Session policies__ - used with AssumeRole API action

__IAM Policy Simulator__  
Checkout the IAM policy Simulator at [policysim.aws.amazon.com](https://policysim.aws.amazon.com)

__Security best practices in IAM__  
[Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)  

### Cheat Sheets  
[AWS IAM Cheat Sheet](https://digitalcloud.training/aws-iam/)
