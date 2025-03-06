# Section 6: Amazon Virtual Private Cloud (VPC)

### AWS Global Infrastructure
__AWS Outputs__  
If you have a cooperate data center, you can have a peice of hardware that comes into your data center that is called AWS Output.  
AWS Output supports a subset of services from AWS e.g EC2 instances and then it has connectivity back to an AWS region.

__AWS local Zone__  
Local zones are like availability zones and they are usually in metropolitan areas. The idea is that they get your resources closer to where you are. It provides lower latency.

__AWS Wavelength Zone__  
These are for 5G network, for example if you have mobile application and you want to make it available over the 5G network, you can deploy your application in a Wavelength Zone. It provides lower latency.


### Security Groups and Network ACLs
__Stateful Versus Stateless Firewalls__  
A stateful firewall allows the return traffic automatically.   
A stateless firewall checks for an allow rule for both connections.  

__Networks ACLs__  
Network Access Control List (NACLs)are applied at the subnet level. They screen the traffic that comes into the subnet and the traffic that leaves the subnet.
Network ACLs are _stateless firewalls_ which means a rule have to be applied for inbound traffic and outbound traffic.

__Security Group__  
Security groups are assigned at the instance level, they are attached to the Elastic Network Interface of the adaptors that are connected to you instance.  
Security group can be applied to instances in any subnet.  
The security group is a _stateful firewall_ which means it will allow return traffic if the inbound traffic is allowed.  

#### VPC Peering
VPC Peering enables routing using private IPv4 and IPv6 addresses between two VPC.  
For VPC Peering to work, the CIDR blocks of the VPC must not overlap.  

VPC Peering does not support _transitive peering_ or _transitive routing_ which mean that you cannot have access from VPC 1 to 3 through 2 if VPC 1 and 3 does not have a direct peering.   

### VPC Endpoints
There are two kinds of VPC endpoints
1. _VPC Gateway Endpoint_: can be used for S3 and DynamoDB only
2. _VPC Interface Endpoint_: can be used for API Gateway, CloudFormation, CloudWatch etc

### VPC Flow Logs
* Flow logs capture information about the IP traffic going to and from network interfaces in a VPC
* Flow log data is stored using Amazon CLoudWatch Logs or S3
* Flow logs can be created at the following levels:
  - VPC
  - Subnet
  - Network Interface 



### Resources
[Subnet Calculator](https://www.site24x7.com/tools/ipv4-subnetcalculator.html)  
