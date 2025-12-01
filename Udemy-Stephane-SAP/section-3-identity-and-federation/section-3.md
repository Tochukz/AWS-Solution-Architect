# Section 3: Identity & Federation

__NotAction__    
You can use the _NotAction_ instead to limit the actions the user can have while avoiding _explicit deny_ that may deny the user permission all together.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "NotFullPermission",
      "Effect": "Allow",
      "NotAction": [
        "iam:*",
        "organizations:*",
        "account:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "SpecificPermission",
      "Effect": "Allow",
      "Action": [
        "iam:CreateServiceLinkedRole",
        "iam:DeleteServiceLinkedRole",
        "iam:ListRoles",
        "organizations:DescribeOrganization",
        "account:ListRegions"
      ],
      "Resource": "*"
    }
  ]
}
```
In the policy above the first statement ensures that the user may not be given full IAM permission `iam:*` but they may he may be given a specific iam permission like `"iam:ListRoles"` as seen in the second statement.  
If a _deny_ statment was used, it would have stopped the user from having any IAM permission all together.  

#### IAM Policies Conditions
__Syntax__   
```json
"Condition" : { "{condition-operator}" : { "{condition-key}" : "{condition-value}" }}
```
__Operators__    
* _String_ (StringEquals, StringNotEquals, StringLike…)
  - `"Condition": {"StringEquals": {"aws:PrincipalTag/job-category": "iamuser-admin"}}`
  - `"Condition": {"StringLike": {"s3:prefix": [ "", "home/", "home/${aws:username}/" ]}}``
* _Numeric_ (NumericEquals, NumericNotEquals, NumericLessThan…)
* _Date_ (DateEquals, DateNotEquals, DateLessThan…)
* _Boolean_ (Bool):
  - `“Condition": {"Bool": {"aws:SecureTransport": "true"}}`
  - `"Condition": {"Bool": {"aws:MultiFactorAuthPresent": "true"}}`
* _(Not)IpAddress:_
  - `"Condition": {"IpAddress": {"aws:SourceIp": "203.0.113.0/24"}}`
* _ArnEquals, ArnLike_
* _Null_: "Condition":{"Null":{"aws:TokenIssueTime":"true"}}

#### IAM Policies Variables and Tags
__Example__: `${aws:username}`  
* `"Resource": ["arn:aws:s3:::mybucket/${aws:username}/*"]`

__AWS Specific:__   
* `aws:CurrentTime`, `aws:TokenIssueTime`, `aws:principaltype,` `aws:SecureTransport`, `aws:SourceIp`, `aws:userid`, `ec2:SourceInstanceARN`

__Service Specific:__   
* `s3:prefix`, `s3:max-keys`, `s3:x-amz-acl`, `sns:Endpoint`, `sns:Protocol` etc

__Tag Based:__    
* `iam:ResourceTag/key-name`, `aws:PrincipalTag/key-name` etc

# IAM Access Analyzer
