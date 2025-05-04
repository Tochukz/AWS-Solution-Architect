# Section 10: Docker Container and ECS
__Amazon ECS Key Features__  
* __Serverless with AWS Fargate__ – managed for you and fully scalable
* __Fully managed container orchestration__ – control plane is managed for you
* __Docker support__ – run and manage Docker containers with integration into the Docker Compose CLI
* __Windows container support__ – ECS supports management of Windows containers
* __Elastic Load Balancing integration__ – distribute traffic across containers using ALB or NLB
* __Amazon ECS Anywhere__ – enables the use of Amazon ECS control plane to manage on-premises implementations

__Amazon ECS Components__  

ECS CoMponent      | Description
-------------------|-------------
Cluster            | Logical grouping of tasks or services
Container instance | EC2 instance running the EC2 agent (applicable to EC2 Launch type only)
Task Definition    | Blueprint that describe how docker container should launch
Task               | A running container using settinggs in a task definition
Image              | A docker image referenced in the task definition
Service            | Defines long running tasks - can control task count with Auto Scaling and attached ELB

#### Launch Types - EC2 and Fargate
__EC2 Launch Type__  
* You explicitly provision EC2 instances
* You are responsible for managing EC2 instances
* Charged per running EC2 instance
* EFS, FSx, and EBS integration
* You handle cluster optimization
* More granular control over infrastructure
* Supported Registry: ECR, Docker Hub and Self-hosted

__Fargate Launch Type__  
* Fargate automatically provisions reesources
* Fargate provisions and manages compute
* Charged for running tasks
* EFS integration only
* Fargate handles cluster optimization
* Supported Registry: ECR and Docker Hub

__ECS and IAM Roles__  
* The _container instance_ IAM role provides permissions to the _host_.  
You can use the `AmazonEC2ContainerServiceforEC2Role` managed policy to create the role - `arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role`.   
* The _ECS task_ IAM role provides permission to the _container_.
* With the Fargate launch type the container instance role is replaced with the _Task Execution Role_

There are several roles used with ECS:
* __Amazon ECS container instance IAM role__ – used by EC2 and external instances to provide permissions to the container agent to call AWS APIs
* __Task IAM role__ – the permissions granted in this IAM role are assumed by the containers running in the task
* __Amazon ECS task execution IAM role__ – the task execution role grants the Amazon ECS container and Fargate agents permissions to make AWS API calls on your behalf
* __Amazon ECS infrastructure IAM role__ – allows Amazon ECS to manage infrastructure resources in your clusters on your behalf (e.g. EBS volumes)
* __ECS Anywhere IAM role__ – On-premises servers or virtual machines (VM) require an IAM role to communicate with AWS APIs
* __Amazon ECS CodeDeploy IAM Role__ – the CodeDeploy service needs permissions to update ECS when performing blue/green deployments
* __Amazon ECS EventBridge IAM Role__ – to use Amazon ECS scheduled tasks with EventBridge rules and targets, the EventBridge service needs permissions

#### Auto Scaling for ECS
Two types of sclaing
1. Service auto scaling
2. Cluster auto scaling

__Service auto scaling__  
* Automatically adjust the desired task count up or down using the _Application Auto Scaling_ service
* Server auto scaling supports
  - Target tracking scaling policy
  - Step scaling policy
  - schedule scaling policy

__Cluster auto scaling__  
* Uses a _Capacity Provider_ to scale the number of EC2 cluster instances using _EC2 Auto Scaling_  
* A Capacity Provider can be associated with an EC2 _Auto Scaling Group_ (ASG)
* ASG can automatically scale using:
  - __Managed scaling__ - with an automatically-created scaling policy on your ASG
  - __Managed instance termination protection__ - which enables container-aware termination of instance in the  ASG when scale-in happens

### Cheat Sheets  
[Amazon ECS and EKS](https://digitalcloud.training/amazon-ecs-and-eks/)    
