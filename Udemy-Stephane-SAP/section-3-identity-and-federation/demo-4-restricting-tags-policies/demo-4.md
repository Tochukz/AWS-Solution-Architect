# Lesson 4: IAM

# Demo 4: Restricting Tags with IAM Policies

### Description
Using the `aws:TagKeys` condition key, we can validate the tag keys attached to a resource against a specific set of required tag keys.   
For example, we can allow an IAM user to create a resource, say EBS volumes only if it has the _Env_ and _CostCenter_ tags.  

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:CreateVolume",
      "Resource": "arn:aws:ec2:*:*:volume/*",
      "Condition": {
        "ForAllValues:StringEquals": {
          "aws:TagKeys": ["Env", "CostCenter"]
        }
      }
    }
  ]
}

```
Use either `ForAllValues` (must have all keys) or `ForAnyValue` (must have any of these keys at minimum).  

These may be applied to Service Control Policy.   

### Operation
