# Lesson 157: S3 MFA Delete Hands On

### Description

When Multi Factor Authentication (MFA) delete is enabled on a S3 bucket, the user will be required to provide an authentication code from an Authenticator device before they can

- Permanently delete an object version
- Suspend Versioning on the bucket

There are conditions required before MFA delete can be enabled

1. The bucket must have versioning enabled
2. It must be done by the root account (only root account can enable or disable MFA delete)
3. The root account must have MFA enabled
4. It must be done using AWS CLI, AWS SDK, or the Amazon S3 REST API but NOT on the Console.

### Operation

**How to configure MFA delete**

1. Login to the console using the root account and generate an access key
2. Use the access key to configure an AWS CLI profile

```bash
$ aws configure --profile root-account
```

3. Enable MFA delete on the bucket

```bash
$ aws s3api put-bucket-versioning --bucket simple-bucket --versioning-configuration Status=Enabled,MFADelete=Enabled --mfa "arn-of-mfa-device mfa-code" --profile root-account
```

Remember to replace _arn-of-mfa-device_ by your actual MFA device ARN.  
The MFA device ARN can be found by going to your account in the console > Security Credential and then scroll down to the _Multi-factor authentication (MFA)_ section. Remember that you must be logged in with the root account.  
Copy the ARN shown under _Identifier_.  
Also remember to replace _mfa-code_ by the current code on you Authenticator device.

4. After MFA delete is enabled, you can check it by looking at the Bucket's Properties in the S3 console.  
   Under the _Bucket Versioning_ section MFA delete should be marked as _Enabled_.

5. To delete an object version using the MFA

```bash
$ aws s3api delete-object --bucket bucket-name --key filename.txt --version-id xxxxxxx --mfa "arn-of-mfa-device mfa-code"
```

6. To disable the MFA delete on the bucket

```bash
$ aws s3api put-bucket-versioning --bucket mfa-demo-stephane --versioning-configuration Status=Enabled,MFADelete=Disabled --mfa "arn-of-mfa-device mfa-code" --profile root-mfa-delete-demo
```
