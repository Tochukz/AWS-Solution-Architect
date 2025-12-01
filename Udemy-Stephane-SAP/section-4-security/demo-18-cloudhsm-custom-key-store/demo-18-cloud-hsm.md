# Lesson 18: CKMS

## Demo 18: CloudHSM Custom Key Store

### Description

The example configures CloudHSM as a custom key store and integrates it with KMS.
Your key materials will be stored in your CloudHSM
cluster and hence under your control.  
The cryptographic operations are performed in the HSMs.

Use cases:

- You need direct control over the HSMs
- KMS keys needs to be stored in a dedicated HSMs

**CloudHSMv2 Unsupported in CloudFormation**  
CloudFormation doesn’t expose a first-class CloudHSMv2 resource or a KMS::CustomKeyStore resource. So there is no `AWS::CloudHSM::Cluster` or `AWS::KMS::CustomKeyStore` resource type.

The aternative is to use AWS CLI or other IaC tool such as Terraform or Pulumi.

In this example, we use Terraform.

### Operation

**Deployment**

**After Deployment**

**Testing**

**Debug Errors**

**Cleanup**

To delete the stack

```bash
$
```
