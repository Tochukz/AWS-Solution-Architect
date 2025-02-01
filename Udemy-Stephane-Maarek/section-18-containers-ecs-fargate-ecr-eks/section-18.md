## Section 17: Container Section
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

### Resource
[ECS Public Gallery](https://gallery.ecr.aws/)   
[Application Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/application/userguide/what-is-application-auto-scaling.html)
