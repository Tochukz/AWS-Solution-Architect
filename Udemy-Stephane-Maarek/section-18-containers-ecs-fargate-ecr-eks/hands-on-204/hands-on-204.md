# Lesson 204: Amazon ECS Auto Scaling

### Description

This template builds ontop of the `hands-on-203` templates which configures an Application Load Balancer on an ECS Task.  
Here we update the ECS Cluster to only support FARGATE capacity provider and no longer _AutoScalingGroup_ capacity provider.  
We than add Application Auto Scaling to increases the number of ECS Task based on the _ALB Request Count Per Target_.  
In production the Scaling Policy may be based on _ECS Service Average CPU Utilization_ rather than _ALB Request Count Per Target_.

### Operation

**Deployment**  
There are two template files `Network.yaml` and `EcsAutoScaling.yaml`.  
The Stack created from the `Network` template will be a dependency for the Stack created from `EcsAutoScaling` template beecause `EcsAutoScaling` stack imports exported output from `Network` stack.  
For this reason, `Network` stack must be deployed successfully before `EcsAutoScaling` stack is deployed.

Lint the templates

```bash
$ cfn-lint Network.yaml
$ cfn-lint EcsAutoScaling.yaml
```

1. Deploy the Network Stack

```bash
$ aws cloudformation deploy --template-file Network.yaml  --stack-name Network --capabilities CAPABILITY_NAMED_IAM
```

2. Deploy the EcsAutoScaling Stack

```bash
$ aws cloudformation deploy --template-file EcsAutoScaling.yaml  --stack-name EcsAutoScaling --capabilities CAPABILITY_NAMED_IAM
```

**Testing**

1. Get the Application Load Balancer's DnsName from the ouputs

```bash
$ aws cloudformation describe-stacks --stack-name EcsAutoScaling --query "Stacks[0].Outputs" --no-cli-pager
```

2. Update the dns_name of the `load-server.py` script.  
   Run the script to simulate loading the application

```bash
$ python load-server.py
```

3. Repeat this for 15 or more terminal window and allow them to run at this same time. You can spread it run across different machines. I did on 3 of my laptop with each running about 5 instances of the script.

4. Go to the ECS Console and locate the Service.  
   Check the _Health_ section of the _Health and metric_ tab to see if the _Average CPU Utilization_ has reached 3%.
5. When the _Average CPU Utilization_ reaches 3%, a new Task will automatically be Launched on the ECS Service by the Application Auto Scaling. You should then have 2 or 3 running Tasks.
6. When you refresh the Browser continuesly with the Web page of the Dns loaded, you should see the Server address change from time to time.
7. Stop the running script that is loading the server and check to see of the numbe of running Tasks falls.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EcsAutoScaling > events.json
```

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EcsAutoScaling
$ aws cloudformation delete-stack --stack-name Network
```
