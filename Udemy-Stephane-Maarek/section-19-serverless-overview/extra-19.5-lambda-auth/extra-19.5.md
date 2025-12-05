# Extra 19.5: Lambda Authentication

### Description

This configuration creates a Lambda Url with `AWS_IAM` AuthType and grants permission to an EC2 instance to invoke the Lambda Url.

Lambda Url with `AWS_IAM` AuthType does not honour regular `curl` or HTTP request even from within a compute environment that have the proper permission to invoke the Lambda Url.  
The request needs to be signed using `SigV4` before it can be accepted.
See the `node-app/main.js` and `python-app/main.py` for the implementation details.

### Operation

**Before deployment**

**Deployment**

Lint the template

```bash
$ cfn-lint LambdaAuth.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaAuth.yaml --stack-name LambdaAuth  --capabilities CAPABILITY_NAMED_IAM
```

**After deployment**

1. Get the `LambdaUrl` and `PublicIp` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name LambdaAuth --query "Stacks[0].Outputs" --no-cli-pager
```

2. Use the `LambdaUrl` to update the `url` variable in `node-app/main.js` and `python-app/main.py` scripts.
3. SSH into the EC2 instance
4. On another terminal, zip and copy the `node-app` code to the EC2 instance

```bash
$ zip -r node-app.zip node-app -x "node-app/node_modules/*"
$ scp -i dev-simple-key.pem node-app.zip ec2-user@3.10.20.101:~/node-app.zip
```

**Testing**

1. Try a curl request against the `Lambdaurl` from your local machine

```bash
$ curl https://b34dz6xi7uhr6z3u5xhvkt6fqu0bmjcq.lambda-url.eu-west-2.on.aws
```

This should return `{"Message":"Forbidden"}` response because `LambdaUrl` with `AWS_IAM` AuthType does not honor regular `curl` or HTTP request even from environment such as EC2 instance with the proper IAM permission.

2. Run the `app/main.js` script from your local environment

```bash
$ node app/main.js
```

You should get the output

```
Status: 200
Body: Hello from Lambda!
```

3. Try the Python script

```bash
$ python python-app/main.py
```

You should get the response `200 "Hello from Lambda!\n"`

4. SSH into the EC2 instance

5. Invoke the Lambda function directly

```bash
$ aws lambda invoke --function-name BasicFunc output.txt
```

6. Run the `node-app/main.js` script

```bash
$ unzip node-app.zip
$ cd node-app
$ npm install
$ node main.js
```

You should get the output

```
Status: 200
Body: Hello from Lambda!
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaAuth
```
