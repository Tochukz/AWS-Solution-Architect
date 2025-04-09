# Section 29: More Solution Architecture

## High Performance Computing (HPC)
__Introduction__  
* Perform geinomics, computational chemistry, financial risk modeling, weather prediction, machine learning, deep learning, autonomous driving
* Which servies help you perform HPC ?

__Data Management & Transfer__  
* AWS Direct Connect:
  - Move GB/s of data to the cloud over a private secure network
* Snowball & Snowmobile
  - Move PB of data to the cloud
* AWS DataSync
  - Move large amount of data between on-premise and S3, EFS, FSx for Windows

__Compute and Networking__  
__Computing__:
* EC2 Instances
  - CPU optimized, GPU optimized
  - Spot Instances / Spot Fleets for cost saving + Auto Scaling
* EC2 Placement Groups: Cluster for good network performance

__Networking:__
* EC2 Enhanced Networking (SR-IOV)
  - Higher bandwidth, higer PPS (packet per second), lower latency
  - Option 1: _Elastic Network Adapter (ENA)_ up to 100 Gbps
  - Option 2: Intel 82599 VF up to 10Gbps - LEGACY
* _Elastic Fabric Adapter (EFA)_  
  - Improved ENA for HPC, only works for Linux
  - Great for inter-node communications, tightly coupled workloads
  - Leverages Message Passing Interface (MPI) standard
  - Bypasses the underlying Linux OS to provide low-latency, reliable transport

__Storage__  
* Instance-attached storage:
  - _EBS_: scale up to 256,000 IOPS with io2 Block EXPRESS
  - _Instance Store_: scale to millions of IOPS, linked to EC2 instance, low latancy
* Network storage:
  - Amazon S3: large blob, not a file system
  - Amazon EFS: scale IOPS based on total size, or use provisioned IOPS
  - Amazon FSx for Lustre:
    * HPC optimized distributed file system, millions of IOPS
    * Backed by S3

  __Automation and Orchestration__
  * AWS Batch
    - AWS Batch supports multi-node parallel jobs, which enables your to run single jobs that span multiple EC2 instances
    - Easily schedule jobs and launch EC2 instances accordingly
  * AWS ParallelCluster
    - Open-source cluster management tool to deploy HPC on AWS
    - Configure with text file
    - Automate creation of VPC, Subnet, cluster type and instance type
    - Ability to enable EFA on the cluster (improved network performance)  
