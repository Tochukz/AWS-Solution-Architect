## Section 18: Container Section
### Containers on AWS: ECS, Fargate, ECR and EKS
__Docker Images__  
Docker images are stored in Docker Repositories
* Docker Hub [hub.docker.com](hub.docker.com)
  - Pubic repository
  - Find base images for many technologies or OS
* Amazon ECR (Elastic Container Registry)
  - Private repository
  - Public repository (ECR Public Gallary) [gallery.ecr.aws](gallery.ecr.aws)

__Amazon ECS - Data Volumes (EFS)__  
* Mount EFS file systems onto ECS tasks
* Works for both EC2 and Fargate launch types
* Tasks running in any AZ will share the same data in the EFS file system
* Fargate + EFS = Serverless
* Use cases: persistent multi-AZ shared storage for your containers

__ECS Service Auto Scaling__   
* Automatically increase/decrease the desired number of ECS tasks
* Amazon ECS Auto Scaling uses __AWS Application Auto Scaling__
* ECS Auto Scaling can scale on following 3 metrics:
  1. ECS Service Average CPU Utilization
  2. ECS Service Average Memory Utilization - Scale on RAM
  3. ALB Request Count Per Target - metric coming from the ALB
* ECS Service Auto Scaling (task level) NOT the same as EC2 Auto Scaling (EC2 instance level)
* Fargate Auto Scaling is much easier to setup (because Serverless)

__Type of Scaling__  
* __Target Tracking__ - scaling in response to actual workloads
* __Step Scaling__ - scale based on a specific CloudWatch Alarm
* __Scheduled Scaling__ - scale based on a specific date/time (predictable changes)

__EC2 Launch Type - Auto Scaling EC2 Instances__  
* Accommodate ECS Service Scaling by adding underlying EC2 Instances
* __Auto Scaling Group Scaling__
  - Scale your ASG based on CPU Utilization
  - Add EC2 instances over time
* __ECS Cluster Capacity Provider__
  - Used to automatically provision and scale the infrastructure for your ECS Tasks
  - Capacity Provider paired with an Auto Scaling Group
  * Add EC2 Instances when you are missing capacity (CPU, RAM)


#### Amazon Elastic Kubernetes Service
__Amazon EKS Overview__  
Amazon Elastic Kubernetes Services is a way to launch managed Kubernetes clusters on AWS.  
* EKS support EC2 if you want to deploy worker nodes or Fargate to deploy serverless containers.  
* EKS is an open source alternative to ECS and it is cloud agnostic
* If your company already use Kubernetes on-premise or in another cloud you can use AWS EKS to migrate to AWS

__EKS Terms__
* EKS node - This are EC2 instances running EKS optimized AMI
* EKS Pods - This is Synanimous to ECS Task

__Amazon EKS - Node Types__  
* __Managed Node Group__
  - Creates and manages Nodes (EC2 instances) for you
  - Nodes are part of an ASG managed EKS
  - Support On-DeMAND or Sport Instances
* __Self-Managed Nodes__  
  - Nodes created by you and registered to the EKS cluster and managed by an ASG
  - You can use prebuilt AMI - Amazon EKS Optimized AMI
  - Supports On-Demand or Spot Instances
* __AWS Fargate__  
  - No maintenance required; no nodes managed

#### AWS App Runner
__Description__  
* Fully managed service that makes it easy to deploy web
applications and APIs at scale
* No infrastructure experience required
* Start with your source code or container image
* Automatically builds and deploy the web app
* Automatic scaling, highly available, load balancer, encryption
* VPC access support
* Connect to database, cache, and message queue services
* Use cases: web apps, APIs, microservices, rapid production
deployments

#### AWS App2Container (A2C)
__Description__   
* CLI tool for migrating and modernizing Java and .NET web apps into Docker Container
* __Lift-and-shift__ your apps running in on-premises bare metal, virtual machines, or in any Cloud to AWS
* Accelerate modernization, no code changes, migrate legacy apps
* Generates CloudFormation templates (compute, network...)
* Register generated Docker containers to ECR
* Deploy to ECS, EKS, or App Runner
* Supports pre-built CI/CD pipelines

### Resource
[ECS Public Gallery](https://gallery.ecr.aws/)   
[Application Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/application/userguide/what-is-application-auto-scaling.html)
