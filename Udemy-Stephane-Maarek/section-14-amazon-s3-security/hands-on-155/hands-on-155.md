# Lesson 155: S3 CORS Hands On

### Description

This template configures two S3 buckets. One without CORS enabled and the other with CORS enabled.

### Operation

**Deployment**  
Lint all templates

```bash
$ cfn-lint S3Cors.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3Cors.yaml  --stack-name S3Cors
```

**Post Deployment**  
Copy data file to each buckets

```bash
$ aws s3 cp data/users.json s3://cors-disabled-bucket-01-25/data/users.json
$ aws s3 cp data/users.json s3://cors-enabled-bucket-01-25/data/users.json
```

**Testing**  
First to test that the data is avaiable from the buckets for public read.
Try this two urls using a browser or preferable an API client tool like Postman

- https://cors-disabled-bucket-01-25.s3.eu-west-2.amazonaws.com/data/users.json
- https://cors-enabled-bucket-01-25.s3.eu-west-2.amazonaws.com/data/users.json

Install `lite-server` or use something equivalent if you have one:

```bash
$ npm install --global lite-server
```

Run the local website using `lite-server`

```bash
$ cd local-website
$ lite-server
```

Visit the local website on your browser at http://localhost:3000
First click on the button to get data from the first bucket with CORS disabled. This should throw an error.
Next, click on the button to get data from the second bucket with CORS enabled. This should successfully return the data.

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name S3Cors > events.json
```

**Cleanup**  
Delete all the objects in the buckets

```bash
$ aws s3 rm s3://cors-disabled-bucket-01-25/ --recursive
$ aws s3 rm s3://cors-enabled-bucket-01-25/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3Cors
```
