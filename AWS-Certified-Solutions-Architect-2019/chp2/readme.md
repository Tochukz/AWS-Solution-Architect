## Chapter 2: Amazon Elastic Compute Cloud and Amazon Elastic Block Store
__EC2 Amazon Machine Images__   
There are four kinds of AMIs.
1. Amazon Quick Start AMIs
2. AWS Marketplace AMIs
3. Community AMIs
4. Private AMIs  

A particular AMI will be available in only a single region - although there will often be images with identical functionality in all regions. Keep this in mind as you plan your deployments: invoking the ID of an AMI in one region while working from within a different region will fail.    

__Instance Types__  

Instance Type Family  | Types
----------------------|-----------
General purpose       | T3, T2, M5, M4
Compute optimized     | C5, C4
Memory optimized      | X1e, X1, R5, R4, z1d
Accelerated computing | P3, P2, G3, F1
Storage optimized     | H1, I3, D2

See [AWS Instance types](https://aws.amazon.com/ec2/instance-types/) for the most recent collection  

__Note__: T2s are burstable, which means you can accumulate CPU credits when your instance is underutilized that can be applied during high-demand periods in the form of higher CPU performance.  

Unlike T2, which requires EBS virtual volumes for storage, some M* instances come with their own instance storage drives that are actually physically attached to the host server.

__Configuring an Environment for Your Instance__  
Here there are three primary details to get right: geographic region, virtual private cloud (VPC), and tenancy model.   

__AWS Regions__  
EC2 resources can be managed only when you're "located within" their region. You set the active region in the console through the drop-down menu at the top of the page or through default configuration values for the AWS CLI/SDK. You can update your CLI configuration by running `aws configure`.   
Bear in mind that the costs and even functionality of service and features might vary between regions. It's always a good idea to consult the most up-to-date official documentation.  

__Virtual Private Cloud (VPCs)__    
VPCs are AWS network organizers and great tool to organize your infrastructure. You might want to create a new VPC for each one of your projects or project stages. e.g VPC-Testing, VPC-Staging and VPC-Production.

__Tenancy__  
The dedicated Host option allows you to actually identify and control the physical server you've been assigned to meet more restrictive licensing or regulatory requirements.   

__To Login to an EC2 instance using SSH__    
If you go to the EC2 management console, you click the `Instances` link on the left navigation bar to see your list of instances. Check the box beside the instance you want to connect to and drop down the __Action__ selector, then select _Connect_ and then click on the __SSH client__ tab to find instruction on how to connect.  

You will be instructed to make your key not publicly viewable by running the command.  
```
$ chmod 400 my-key-file.pem
```
The command to connect using SSH should look like this:
```
$ ssh -i my-key-file.pem my-user@ec2-xx-xxx-xx-xxx.eu-west-2.compute.amazonaws.com
```     
__Instance Pricing__  
It will often make sense to combine multiple models within a single application infrastructure. An online store might, for instance, purchase one or two instances to cover its normal customer demand but also allow autoscaling to automatically launch on-demand instances during periods of unusually high demand.

__Instance Lifecycle__  
A stopped instance that had been using a non-persistent public IP address will most likely be assigned a different address when it's restarted. If you need a predictable IP address that can survive restart, allocate an Elastic IP address and associate it with your instance.  

__Resource Tags__  
The best way to keep track of your resources when they become many is by establishing a consistent naming convention and applying it to tags. For example, the key of the tag may represent the resource's environment and the value will then represent what the resource is. For example:

| Key               | Value           |
|-------------------|-----------------|
| production-server | server 1        |
| production-server | server 2        |  
| production-server | security-group1 |
| staging-server    | server 1        |
| staging-server    | security-group1 |

__Service Limits__   
For example you're allowed only five VPCs per region and 5,000 key pairs across your account.  
You can find up-to-date details regarding the limits of all AWS services at [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).  

__Elastic Block Store Volumes__   
The AWS SLA guarantees the reliability of the data you store on its EBS volumes with a promise of at least 99.999 percent availability.  
There are currently four EBS volume types, two using solid-state-drive (SSD) technologies and two using the older spinning hard drives (HDDs).  Performance is measured in IOPS.   

EBS Volume Type | Volume Size | Max IOPS/volume | Max throughput/volume (MB/s) | Price
----------------|-------------|-----------------|------------------------------|-------
EBS-Provisioned IOPS SSD | 4 GB–16 TB | 32,000  | 500 | $0.125/GB + $0.065/prov IOPS
EBS General-Purpose SSD | 1 GB–16 TB | 10,000 | 160 | $0.10/GB
Throughput-Optimized HDD | 500 GB–16 TB | 500 | 500 | $0.045/GB
Cold HDD | 500 GB–16 TB | 250 | 250 | $0.025/GB


#### Accessing your EC2 Instance
You can create and then attach one or more virtual Elastic Network Interfaces to your instance. You can optionally assign a static IP address within the subnet range.  Also an instance can be assigned a public IP through which full Internet access is possible. There is no charge for elastic IPs.  

Run the following command in when logged into an instance  
```
$ curl http://169.254.169.254/latest/meta-data
```  
This will give you a list of phrases that you can then append to the command to lean more about that item. For example
```
$ curl http://169.254.169.254/latest/meta-data/instance-type
```

#### Securing Your EC2 Instance  
AWS provides four tools to help you manage access to you EC2 instances: _Security Groups_, _Identity and Access Management (IAM) roles_, _network address translation (NAT)_ and _key pairs_.  

__Security Groups__  
Security groups controls traffic at the instance level. However, AWS also provides you with network access control lists (NACLs) that are associated with entire subnets rather than individual instances.    

__IAM Roles__  
You can assign an IAM role to an EC2 instance so that processes running within it can access the external tools -- like an RDS database instance -- it needs to do its work.  

__NAT Devices__  
If you want your EC2 instance to be private (no public IP) but also provide a limited Internet access to it, you can do so by routing the traffic through a NAT instance or NAT gateway.  Both approaches will incur monthly charges.  The NAT gateway is a managed service which you do not need to maintain.  

__Key Pairs__  
Each key pair that AWS generates for your will remain installed within its original region and available for use with newly launched instances until you delete it. You should delete the AWS copy in the event your public key is lost or exposed.  

#### Other EC2-Releated Services  
__AWS Systems Manager__  
Use System manager to group and manager your AWS resources.    

__Placement Groups__    
Use placement groups for multiple EC2 instances to achieve low-latency network connectivity. You can use one of two strategies:  
* _Cluster groups_ which associate instances within a single availability zone in close physical proximity  
* _Spread groups_ which separate instances across hardware to reduce risk of data lose when failure occurs.  

__AWS Elastic Beanstalk__  
Elastic Beanstalk lets you upload your application code, define a few parameter and AWS will configure, launch and maintain all the infrastructure required to keep it running. The charges are the same as running the individual services involved.   

__Amazon Elastic Container Service and AWS Fargate__  
Amazon Elastic Container Service (ECS) lets you launch a prebuilt Docker host instance and define the way you want your Docker containers to behave (called a task).  
The new _Fargate_ tool further abstracts the EC2 configuration process, removing the need for you to run and configure instances for your containers.  

__AWS Lambda__  
Lambda allow you to instantly perform almost any operation on demand at almost any time but without having to provision and pay for always-on servers.  

__VM Import/Export__   
VM Import/Export can make it much simpler to manage hybrid environment.    

__Elastic Load Balancing and Auto Scaling__  
Elastic Load Balancing (ELB) and Auto Scaling can be closely integrated with your EC2 infrastructure, making for simple and seamless operation.   

__Launching an EC2 instance__  
```
$ aws ec2 run-instances --image-id ami-xxxxxxxx --count 1 \
  --instance-type t2.micro --key-name MyKeyPair \
  --security-group-ids sg-xxxxxxxx --subnet-id subnet-xxxxxxxx \
  --user-data file://my_script.sh \
  --tag-specifications \
  'ResourceType=instance,Tags=[{Key=webserver,Value=production}]' \
  'ResourceType=volume,Tags=[{Key=cost-center,Value=cc123}]'
```

__Review Questions__   
Question on Page[76], Answer on Page[357]
