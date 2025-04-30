# Section 9: Block and File Storage
__Amazon EBS Volume__   
* EBS Volumes exists within a single availability zones
* The data is replicated to multiple copies for durability but will only remain in the same availability zone
* EBS Volume must be in the same availability zone with the EC2 instances that it is connected to
* Each EBS Volume is normally attached to one EC2 instance at a time exist in the case of _EBS multi-attach_ as explain below  
* EBS volume can be copied from one availability zone to another by creating a snapshot and copying it over.
* Root EBS volumes are deleted by default on termination of the EC2 instance they are attached to
* Extra non-boot volumes are not deleted on termination by default  

__Amazon EBS Multi-Attach__
* Normally an EBS volume can only be attached to one instance at a time
* But with EBS Multi-attach, an EBS volume can be attached to a _maximum 16 EC2 instances_
* Multi-attach is only available for _Nitro system-bases_ EC2 instances
* The volume must be a a _provisioned IOPS i01 volume_
* All the instance connecting to the volume must be in the same availability zone as the volume

__SSD EBS Volume Types__  
![ssd-ebs-volume-types](slides/ssd-ebs-volume-types.png)

__HDD EBS Volume Types__  
![hdd-ebs-volume-types](slides/hdd-ebs-volume-types.png)

__EBS Copying, Sharing and Encryption__  
* When you create a snapshot of an EBS volume, it is stored in an S3 bucket.
* Since S3 is a regional service, you can simple restore the snapshot to a new volume in another availability zone.

__Create AMU from Snapshot__  
* You can create a snapshot from an EBS volume
* The snapshot can then be used to create an AMI  
* The AMI can then be used to create a volume in another availability zone.

__Amazon Data Lifecycle Manager (DLM)__   
* DLM automates the creation, retention, and deletion of EBS snapshots and EBS-BACKED AMIs
* DLM helps with the following
  - Protects valuable data by enforcing a regular backup schedule
  - Create standardized AMIs that can be refreshed at regular intervals
  - Retain backups as required by auditors or internal compliance
  - Reduce storage costs by deleting outdated backups
  - Create disaster recovery backup policies that back up data to isolated accounts

  __EBS vs instance store__  
  * Instance Stores are ephemeral - data is lost when the instance is powered down.    
  * Instance store volume root devices are created from AMI templates stored on S3
  * Instance store volumes cannot be detached/reattached 
