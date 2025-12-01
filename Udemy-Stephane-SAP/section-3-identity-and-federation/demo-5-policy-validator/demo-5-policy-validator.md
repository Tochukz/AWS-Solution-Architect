# Lesson 5: IAM Access Analyzer

## Demo 5: Policy Validator - IAM Access Analyzer

### Description

IAM Access Analyzer can be used to validate IAM policies, resource policies, and SCPs before you deploy them. It checks for things like unsupported actions, bad JSON syntax, overly permissive statements, or missing conditions.

### Operation

1. Validate IAM policy document

```bash
$ aws accessanalyzer validate-policy --policy-type IDENTITY_POLICY --policy-document file://sample-policy-1.json
$ aws accessanalyzer validate-policy --policy-type IDENTITY_POLICY --policy-document file://sample-policy-2.json
```

The first sample policy should return a _finding_ pointing to the invalid action `s3:ListBuckt` in the document.  
The second sample policy should return no _finding_, indicating a valid policy document.

**Policy Types**

- IDENTITY_POLICY
- RESOURCE_POLICY
- SERVICE_CONTROL_POLICY
- RESOURCE_CONTROL_POLICY
