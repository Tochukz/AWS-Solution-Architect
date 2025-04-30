# Lesson 75: Application Load Balancer - Hands on (Part 2)

### Description

This template extends and modify the Application Load balancer configured in hands-on-74.  
Here we add rules to the Listener to route traffic to different Target groups based on the URL path.

This presents us with a useful configuration that can be used in a Microservices architecture where requests are routed to different microservices based on their path.

### Operation

**Pre deployment**  
This configuration required NodeJS code packages to be deployed to S3 bucket for use in the Shared Lambda Layer and Lambda functions representing the Micro services.

Deploy the code and shared layer.

```bash
# Deploy the product microservice
$ ./deploy-express.sh product-service 0.0.1
# Deploy the user microservice
$ ./deploy-express.sh user-service 0.0.1
```

If you make changes to the code after the Lambda infrastructure has been deployed, do a reload, run the deploy above again, and then do a reload as shown below

```bash
$ ./reload-lambda.sh catalog-management
$ ./reload-lambda.sh user-management
```

This reloads the update code into the lambda functions.

**Deployment**  
Lint the templates

```bash
$ cfn-lint AlbLambdaChild.yaml
$ cfn-lint AlbEc2Child.yaml
$ cfn-lint AlbDemo.yaml
```

Upload the child templates to S3

```bash
$ aws s3 cp AlbEc2Child.yaml s3://chucks-workspace-storage/templates/AlbEc2Child.yaml
$ aws s3 cp AlbLambdaChild.yaml s3://chucks-workspace-storage/templates/AlbLambdaChild.yaml
```

Deploy a stack using the _AlbDemo_ template

```bash
$ aws cloudformation deploy --template-file AlbDemo.yaml  --stack-name AlbDemo --parameter-overrides file://private-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

Get the load balancer Dns name and instance Ids from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name AlbDemo  --query "Stacks[0].Outputs" --no-cli-pager
```

**Stack diff**  
When you make a change to the template you can check the diff against the current stack by creating a change set

```bash
# Create change set
$ aws cloudformation create-change-set --template-body file://AlbDemo.yaml --stack-name AlbDemo --parameters file://parameters.json --change-set-name AlbDemoChange --capabilities CAPABILITY_NAMED_IAM
# Checkout the change set
$ aws cloudformation describe-change-set --change-set-name AlbDemoChange --stack-name AlbDemo > diff.json
# Optionally you can execute the change set to apply the changes
$ aws cloudformation execute-change-set --stack-name AlbDemo --change-set-name AlbDemoChange
# Finally, you can delete the change set
$ aws cloudformation delete-change-set --stack-name AlbDemo --change-set-name AlbDemoChange
```

**After deployment**  
Get the `LoadBalancerDns`, `ProductLambdaUrl` and `UserLambdaUrl` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name AlbDemo --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Use the Load balancer DNS name to access the web server on a web browser.

The root path `/` routes to the EC2 instance which is the default action for the Application Load Balancer.  
The table below showS the endpoint available for the microservices via the Application Load Balancer.

| Path                               | Method | Microservice    |
| ---------------------------------- | ------ | --------------- |
| /user-service/users/               | GET    | User Service    |
| /user-service/users/create         | POST   | User Service    |
| /product-service/categories/       | GET    | Product Service |
| /product-service/categories/create | POST   | Product Service |

**Debug Errors**  
In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name AlbDemo
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name AlbDemo
```
