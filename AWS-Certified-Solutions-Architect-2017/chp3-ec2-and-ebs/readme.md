## Chapter 3: Amazon Elastic Compute Cloud (Amazon EC2) and Amazon Elastic Block Store (Amazon EBS)  
__Amazon Elastic Compute Cloud (Amazon EC2)__   
Amazon EC2 is AWS primary web service that provides resizable compute capacity in the cloud.  

__Compute Basics__  
Because you are paying for the computing power of the instance, you are charges per hour while the instance is running. When you stop the instance, you are no longer charged.  
They key to launching instances are   
1. the amount of virtual hardware dedicated to the instance  
2. the software loaded on the instance  

These two dimensions of a new instance are controlled, respectively, by the instance type and the AMI(Amazon Machine Image).  

__Sample Instance Type Families__    

| Type | Summary                                                                          |  
|------|----------------------------------------------------------------------------------|
| c4   | __Compute optimized__ - For workloads requiring significant processing           |
| r3   | __Memory optimized__ - For memory-intensive workloads                            |  
| i2   | __Storage optimized__ - For workloads requiring high amounts of fast SSD storage |  
| g2   | __GPU-based instances__ - Intended for graphics and general-purpose GPU compute  |

See [AWS Instance types](https://aws.amazon.com/ec2/instance-types/) to for the current list.  
Enabling enhanced networking on an instance involves ensuring the correct drivers are installed and modifying an instance attribute.  Enhances networking is available only for instances launched in an Amazon Virtual Private cloud (Amazon VPC).  

For workloads requiring greater network performance, many instance types support enhanced networking. Enhanced networking reduces the impact of virtualization on network performance by enabling a capability called Single Root I/O Virtualization (SR-IOV).
Enhanced networking is available only for instances launched in an Amazon Virtual Private Cloud (Amazon VPC).  

__Amazon Machine Images (AMIs)__   
The _Amazon Machine Image (AMI)_ defines the initial software that will be on an instance when it is launched.  Am AMU defined every aspect of the software state at instance launch.  
There are four sources of AMIs:  
1. __Published by AWS__ - These include multiple distributions of Linux (including Ubuntu, Red Hat, and Amazon's own distribution) and Windows 2008 and Windows 2012. As with any OS installation, you should immediately apply all appropriate patches upon launch.  
2. __The AWS Marketplace__  - Instances launched from an AWS Marketplace AMI incur the standard hourly cost of the instance type plus an additional per-hour charge for the additional software except for open-source packages which have no additional charge.  
3. __Generating from Existing Instances__ - Am AMI can be created from an existing Amazon EC2 instance. A launched instance is first configured to meet all the customer's corporate standards and then an AMI is generated from the configured instances and used to lunch new instances of that OS.  
4. __Uploading Virtual Servers__ - Using AWS VM Import/Export service, customers can create images from various virtualization formats, including raw, VHD, VMDK, and OVA.  Make sure you are compliant with the licensing terms of your OS vendor.   

__Addressing an Instance__  
There are several ways that an instance may be addressed over the web upon creation:  
* __Public Domain Name System (DNS) Name__ - This DNS name cannot be specified and persists only while the instance is running and cannot be transferred to another instance.  
* __Public IP__ - This address persists only while the instance is running and cannot be transferred to another instance.   
* __Elastic IP__ - This address is a public address that can be reserved and associated with an Amazon EC2 instance. This IP address persists until the customer releases it and can be transferred to a replacement or another instance.   

In the context of an Amazon VPC, we also have __Private IP addresses__ and __Elastic Network Interfaces__ (ENIs).  

__Initial Access__   
When Amazon EC2 launches a Linux instance, the public key is store in the `~/.ssh/authorized_keys` file on the instance and an initial user is created.   
When launching a Windows instance, Amazon EC2 generated a random password for the local administrator account and encrypts the password using the public key.  Initial access to the instance is obtained by decrypting the password with the private key, either in the console or through the API.  The decrypted password can be used to log into the instance with the local administrator account via RDP.  

__Virtual Firewall Protection page__  
Security groups are applied at the instance level, as opposed to a traditional on-premises firewall that protects at the perimeter.  

#### The Lifecycle of Instances  
__Bootstrapping__    
The process of providing code to be run on an instance at launch is called _bootstrapping_.  
One of the parameters when an instance is launched is a string value called _UserData_. This string is passed to the operating system to be executed as part of the launch process the first time the instance is booted. ON Linux instances this can be shell script, and on Windows instances this can be a batch style scrip or a PowerShell script. The script can perform tasks such as:  
* Installing _Chef_ or _Puppet_ and assigning the instance a role as the configuration management software can configure the instance.

__Tip__: UserData is stored with the instance and is not encrypted, so it is important to not include any secret such as password or keys in the UserData.

__VM Import/Export__   
VM Import/Export enables you to easily import Virtual Machines (VMs) from you existing environment as an Amazon EC2 instance and export then back to your on-premise environment. You can only export previously imported Amazon EC2 instances. Instances launched within AWS from AMIs cannot be exported.   

__Instance Metadata__  
```
$ curl http://169.254.169.254/latest/meta-data
```

__Managing Instances__  
Tags can be used to identify attributes of an instance like projects, environment, billable department, and so forth. You can apply up to 10 tags per instance.  

__Modifying an Instance__  
To change the _Instance Type_    
* Stop the instance
* Select the desired instance type
* Restart the instance

For instances running on Amazon VPC, you can change the _Security Groups_ associated with an instance while the instance is running. For instances in `EC2-Classic`, you cannot change the security group after launch.

__Termination Protection__  
In order to prevent termination via the AWS Management Console, CLI, or API, _termination protection_ can be enabled for an instance. While enabled, calls to terminate the instance will fail until termination protected is disabled.  
Note that _termination protection_ does not prevent termination triggered by an OS shutdown command, termination from an Auto Scaling group, or termination of a Spot Instance due to Spot price changes.  

__Pricing Options__  
1. __On-Demand Instances__: It is the most flexible and the least cost effective pricing option per compute hour.  
2. __Reserves Instances__: You can save up to 75 percent over the on-demand hourly rate. Two factors determines the cost of the reservation:
  * __Term commitment__: It can be either one or three years. The longer the commitment, the bigger the discount.  
  * __Payment options__:
    1. All Upfront - No monthly charge
    2. Partial Upfront - Pay a portion of the charge and the rest in monthly installment
    3. No Upfront - Pay the entire reservation in monthly installments.  

 You can change you reserves instance's from on Availability zone to another. You can also change the instance type within the same instance family if you instance AMI is Linux.  
3. __Spot Instances__: Offers the greatest discount for non-critical and interruption tolerant workload. If Amazon EC2 needs to terminate a Sport Instance, the instance will receive a termination notice providing a two-minute warning prior to Amazon EC2 terminating the instance.

__Tenancy Options__  
__Shared Tenancy__  Shared tenancy is the default tenancy model for all Amazon EC2 instances  
__Dedicated Instances__ Dedicated Instances run n hardware that is dedicated to a single customer.
__Dedicated Host__  Dedicated Hosts can help you address licensing requirements and reduce costs by allowing you to use your existing server bound software licenses.  This differs from Dedicated Instances in that s Dedicated Instance can launch on any hardware that has been dedicated to the account.    

__Placement Groups__   
A _placement group_ is a logical grouping of instances within a single Availability Zone. Placement groups enable applications to participate in a low-latency, 10 Gbps network. To fully use this network performance for your placement group, choose an instance type that supports enhanced networking and 10 Gbps network performance.   

__Instance Stores__   
An _instance store_ is also referred to as _ehpemeral storage_. Storage available with various instance types ranges from no instance store up to 242 TN instance store. The data will be lost of an instance is stopped but will persist if an instance reboots.

#### Amazon Elastic Block Storage (Amazon EBS)
__Elastic Block Store Basics__   
Each Amazon EBS volume is automatically replicated within its Availability Zone. Multiple Amazon EBS volume can be attached to a single Amazon EC2 instance, although a volume can only be attached to a single instance at a time.  

##### Types of Amazon EBS Volumes  
Types vary in areas such as underlying hardware, performance, and cost.  
__Magnetic Volumes__  
Magnetic volumes are the cheapest and also have the lowest performances. A magnetic EBS volume can range in size from 1 GB to 1TB and will average 100 IOPS, but has the ability to burst to hundreds of IOPS. They are best suited for:
* Cold workloads where data is accesses infrequently
* Sequential reads  
* Situation where low-cost storage is a requirement
Magnetic volumes are billed based on the amount of data space provisioned, regardless of how much data you actually store on the volume.

__General-Purpose SSD__   
General-purpose SSD volumes  deliver strong performance at a moderate price point that is suitable for a wide range of workloads.   
A general-purpose SSD volume can range in size from 1 GB to 16 TB and provision a baseline performance of 3 IOPS per gigabyte provisioned, capping at 10,000 IOPS.   
If you provision a 1TB volume, you can expect a baseline performance of 3,000 IOPS because 3 IOPS per gigabyte provisioned.  
If you provision a 5TB volume, you can expect a baseline performance of 10,000 IOPS not 15,000 IOPS because the capping is at 10,000 IOPS.   
If you provision less than  1TB you volume can burst up to 3,000 IOPS for extended periods of time because when you are not using IOPS, they accumulate as I/O credits and is used during heavy traffic up to a rate of 3,000 IPS until they are depleted and then return to baseline performance of the volume.   
At  1TB, the baseline performance of the volume is already 3, 000 IOPS, so bursting behavior does not apply.   

General-purpose SSD volumes are billed based on the amount of space provisioned regardless of how much data you actually store on the volume. They are suited for:
* workloads where very high disk performance is not critical.   
* System boot volume
* Virtual desktops
* Small-to-medium size database
* Development and test environment

__Provisioned IOPS SSD__  
Provisioned IOPS SSD are the most expensive EBS volume type per gigabyte and they provide the highest performance. A provisioned IOPS SSD volume range in size from 4GB to 16TB.   
When you provision a Provisioned IOPS SSD volume, you specify the size and the desired number of IOPS, up to the lowest of the maximum of 30 times the number of GB of the volume, or 20, 000 IOPS. You can strip multiple volumes together in a RAID configuration for larger size and greater performance.   
Pricing is based on the size of the volume and the amount of IOPS reserves. An additional monthly fee is applied based on the number of IOPS provisioned, whether they are consumed or not.  
Provisioned IOPS SSD are well suited for:
* applications requiring sustained IOPS performance
* critical application requiring mote than 10, 000 IOPS or 160MB of throughput per volume
* large database workloads.

__EBS Volume Type Comparison__  

Characteristic     | Magnetic                | General-Purpose SSD | Provisioned IOPS SSD |
-------------------|-------------------------|---------------------|----------------------|
Volume size        | 1 GiB - 1 TiB           | 1 GiB - 16 TiB      | 4 GiB - 16 TiB       |
Maximum throughput | 40-90MB                 | 160MB               | 320MB                |
IOPS performance   | Avg. 100 IOPS burstable t0 100s of IOPS | baseline 3 IOPS/GiB up to 10,000 IOPS capline, bustable to 3,000 IOPS| provision level up to 20,000 IOPS max. |

##### Other EBS Volume (HDD)
Overtime it is expected that _Throughput-Optimized HDD_ and _Cold HDD_ will replace the current magnetic volume type.
__Throughput-Optimized HDD__  
Throughput-Optimized HHD volumes are low-cost HDD volume designed for frequent-access, throughput-intensive workload. It is well suited for
* big data,
* data warehouse
* log processing
Throughput-Optimized are significantly less expensive than general purpose SSD volumes.
__Cold HDD__  
Cold HHD volumes are designed for less frequently accessed workloads, such as colder data requiring fewer scans per day. It is significantly less expensive then Throughput-Optimized HDD volumes.

__EBS HHD volume comparison__  

Characteristic     | Magnetic      | Cold HDD    | Throughput-Optimized HDD |
-------------------|---------------|-------------|--------------------------|
Volume Size        | 1 GiB - 1 TiB | 16 TiB max. | 16 TiB max               |
Maximum throughput | 40-90MB       | 250MB       | 500 MB                   |
IOPS performance   | 100           | 250         | 500                      |

__Amazon EBS-Optimized Instances__   
When you select Amazon EBS-optimized for an instance, you pay an additional hourly charge for that instance. Check the AWS documentation to confirm which instance types are available as Amazon EBS-optimized instance.  

#### Protecting Data
__Backup/Recovery (Snapshots)__  
Snapshots are incremental backups. You can take snapshots though the Console, CLI, API or by setting up a schedule of regular snapshots.   
Snapshot are free. Data for the snapshot is stores using Amazon S3 and you pay only for the storage cost.  
When you request a snapshot, the point-in-time snapshot is created immediately and the volume may continue to be used.  
Snapshots are stores using Amazon S3 in AWS-controlled storage. You must use the Amazon EBS snapshot feature to manage them. You can use snapshots to create new volumes only in the same region or you can copy the snapshot to another region to use it in that region.  

__Creating a Volume from a Snapshot__  
When you create a new Amazon EBS volume from a snapshot, the volume is created immediately but the data is loaded lazily. Because of this, it is a best practice to initialize a volume created from a snapshot by accessing all the blocks in the volume.  
You can increase the size of an Amazon EBS volume as follows:
1. take a snapshot of the volume
2. create a new volume of the desired size from the snapshot  
3. replace the original volume with the new volume  

__Recovering Volumes__   
If an Amazon EBS-backed instance fails and there is data on the bot drive, it is relatively straightforward to detach the volume from the instance. The volume can then be attached as a data volume to another instance and the data read and recovered.  

__Encryption Options__  
Amazon EBS offers native encryption on all volume types.  
When you launch an encrypted Amazon EBS volume, Amazon uses the _AWS Key Management Service (KMS)_ to handle key management. A new master key will be created unless you select a master key that you created separately in the service. You data and associated key are encrypted using the industry-standard _AES-256_ algorithm. The data is actually encrypted in transit between the host and the storage media and also on the media. Consult the AWS documentation for a list of instance types that support Amazon EBS encryption.  
Encryption is transparent, so all data access is the same as unencrypted volumes, and you can expect the same IOPS performance on encrypted volumes as you would with unencrypted volumes, with a minimal effect on latency.

__Learn More__  
[AWS EC2 Linux Guide ](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)   
[AWS EC2 Windows Guide](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/concepts.html)  
[AWS EBS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html)    

__Summary__  
Instance stores may be used only for temporal data or in architectures providing redundancy such as Hadoop's HDFS.

__Exam Essentials__  
Page [113]

__Exercises__
Page 115 - 123

__Review Questions__  
Questions - Page [127], Answers - Page[494]
