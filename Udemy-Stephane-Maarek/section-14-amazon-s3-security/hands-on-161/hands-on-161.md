# Lesson 161: S3 Presigned URLs - Hands On

### Description

A Pre-signed URL is a way to give temporal access or permission to any user to read or write a file to your private S3 bucket.

### Operation

**Create a read-only presigned URL**

1. Copy a sample file to you private S3 bucket

```bash
$ aws s3 cp data/users.json s3://chucks-workspace-storage/data/users.json
```

2. Generate a read-only presigned URL for the object

```bash
# Will expire in 60 seconds
$ aws s3 presign s3://chucks-workspace-storage/data/users.json --expires-in 60
```

3. Use the generated presigned url to access the file on a Browser or an API client like Postman.

**Create a write presigned URL**
