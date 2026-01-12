## Chapter 4: Amazon Virtual Private Cloud  
#### Introduction   
Amazon's Virtual Private Cloud service provides the networking layer of EC2. A VPC is a virtual network that can contain EC2 instances as well as network resources for other AWS services.  

#### VPC CIDR (Classless Interdomain Routing) Blocks
The CIDR block determines which IP address may be assigned to instances and other resources within the VPC.
You must assign a primary CIDR block when creating a VPC.   
Although you can specify any valid IP range for your VPC CIDR, it's best to use one in the RFC 1918 range to avoid conflicts with public internet addresses.   
* 10.0.0.0–10.255.255.255 (10.0.0.0/8)
* 172.16.0.0–172.31.255.255 (172.16.0.0/12)
* 192.168.0.0–192.168.255.255 (192.168.0.0/16)  
Be sure that the VPC CIDR you choose doesn't overlap with addresses already in use in your other network on-premise or in the cloud.

You can't change the primary CIDR block, so think carefully about your address requirements before creating a VPC.  

__Secondary CIDR Bocks__  
If you need a secondary CIDR you must chose a block that does not overlap with the primary or other secondary blocks. For example, if your VPC's primary CIDR is 72.16.0.0/16, you may specify a secondary CIDR of 172.17.0.0/16. Be careful about your choice of primary CIDR. If you choose 192.169.0.0/16 as your primary CIDR, your won't be able to create a secondary CIDR using any of the RFC 1918 ranges.  

__IPv6 CIDR Blocks__  
Unlike primary CIDR, you can't choose your own IPv6 CIDR. AWS assigns one to your VPC at your request. The prefix length of an IPv6 VPC CIDR is always /56 for example, 2600:1f18:2551:8900/56 .  

__Subnets__  
A subnet is a logical container within a VPC that holds your EC2 instances.  For example, you can create one subnet for public web servers that is accessible over the Internet and create another subnet for database servers that only the web instances can access.   
You cannot move and instance from one subnet to another.  

__Subnet CIDR Blocks__  
The CIDR lock your subnet must be a subset of the VPC CIDR that it resides in.  For example, if your VPC has CIDR of 172.0.0/16, one of your subnets may have a CIDR of 172.16.100.0/24.   
AWS reserves the first four and last IP addresses in every subnet. You can't assign these addresses to any instances.  
commonly, each subnet's prefix length will be longer than the VPC's to allow for multiple  subnets to exist in the same VPC.  

__To Creating a VPC using the Management Console__  
* Go to the VPC section  of the management console  
* Click on the  `VPC Dashboard` on the Navigation menu if you are not already on the dashboard page.  
* Click the `Launch VPC Wizard` button.  
* Select the `VPC with a Single Public Subnet` block and click the `Select` button
* You may use the default values and just change the `VPC name` and `Subnet name`.
* Click the `Create VPC` button and wait a few seconds for the VPC to be created.  

__To create a Second Subnet in the VPC__    
* Click on the `Subnets` menu on the Navigation bar  
* Click the `Create Subnet` button, Select the VPC under which you want to create the subnet
* Enter a name for your subnet and an IPv4 CIDR e.g  `10.0.1.0/24`
* You may want to select an `Availability Zone` that is different from the availability one of your first subnet.  
* Click the create subnet button  and wait a few second.     

Learn more [how to create VPC](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/gsg_create_vpc.html)

__To Create A VPC using the CLI__  
```
$ aws ec2 create-vpc—cidr-block 172.16.0.0/16
```  
__To Create A Subnet using the CLI__  
```
$ aws ec2 create-subnet-vpc-id [VPC resource ID] --cidr-block 172.16.100.0/24
--availability-zone us-east-1a
```

__Availability Zones__   
You can achieve resiliency for your applications by creating two subnets in different availability zones and then spreading your instances across those zones. You can redirect traffic from a failed instance to a working instance by detaching the ENIN from the failed instance and reattaching it to the working instance.  

#### Elastic Network Interfaces (ENI)
ENI performs the same basic functions as a network interface on a physical server, although ENIs have more restrictions on how you can configure them.  Every instance must have a _primary network interface_ (also known as _primary ENI_), which is connected to only one subnet. You cannot remove the primary ENI from an instance.  

__Primary and Secondary Private IP Addresses__    
Each instance have a _primary private IP address_ that is bound to the primary ENI of the instance. You can also assign a secondary IP address but you can not change the primary IP address.  
You can attached additional ENIs to an instance but they must be in the same availability zone as the instance.  
Addresses associated with an ENI must come from the subnet to which it is attached.  

__Attaching Elastic Network Interfaces__   
You can create ab ENI in one subnet and then attach it to an instance as the primary ENI when you launch the instance. If you disable the Delete on Termination attribute of the ENI, you can terminate the instance without deleting the ENI. You can then associate the ENU with another instance.  

__To Create an ENI in a subnet__  
* Go to the EC2 management console
* Click on the `Network Interfaces` link under the `Network and Security` section of the navigation bar.  
* Click the `Create Network Interface` button  
* Enter a description, select a subnet, use `Auto-assign` or `Custom` IPv4
* Click the `Create Network interface` button.  

You can inspect you network interfaces using AWS CLI
```
$ aws ec2 describe-network-interfaces
```

__To launch an instance into a subnet and attach the ENI to the instance__  
* Go to the EC2 console and lick the `Lunch Instance` button
* When you get to the `Configure Instance` step (Step 3),
* Under the network selection choose your VPC
* Under Subnet choose the subnet under which you created the ENI  
* At the `Network interfaces` section, select your network interface to be attached.  
* Configure other options as necessary and launch the instance.  

#### Internet Gateways  
You can create an Internet gateway and associate it with a VPC manually. This will give you instances a public IP address.  An Internet gateway doesn't have a management IP address or network interface, instead, AWS identifies an Internet gateway by its resource IP, which begins with `igw-`.   
To use an Internet gateway, you must create a `default router` in a `route table` that points to the Internet gateway as a target.  

#### Route Tables  
Each route table consists of on or more routes and at least one subnet association.  
When you create a VPC, AWS automatically creates a default route table called the _main route table_ and associated it with every subnet in that VPC.  You can use the main route table or create a custom one that you can manually associate with one or more subnets.  
If you do not explicitly associate a subnet with a route table you've created, AWS will implicitly associate it with the main route table. A subnet cannot exists without a route table association.  

__Routes__  
The local route is the only mandatory route that exists in every route table.  It's what allows communication between instances in the same VPC.  

__The Default Route__  
To enable Internet access for your instance, you must create a default route pointing to the Internet gateway. Any subnet that is associated with a route table containing a default route pointing to an Internet gateway is called a _public subnet_. A _private subnet_ does not have a default route.  

__To create an Internet Gateway and Default Route__    
* Go to the VPC management console and click on the `Internet Gateway` link on the navigation bar  
* Click the `Create internet gateway`  button  
* Enter a tag name and click `Create internet gateway`  
* Go back to your list of internet gateways and selected your newly created internet gateway  
* Click on `Action` > `Attach to VPC`
* Select your VPC and click `Attach internet gateway`  

__To create a default route in the route table__  
* Go to the VPC management console and click `Route Tables` on the navigation bar  
* Select the route table that is Main and have the relevant VPC ID
* Click on Action > Edit routes  
* Click the `Add route` button
* Enter `0.0.0.0/0` for the `Destination` and select `Internet Gateway` for the `Target`
* Click the `Save routes` button  

#### Security Groups  
Every ENI must have at least one security group associated with it. When an instance has multiple ENI, take care to note whether those ENIs use different security groups.  

#### Network Access Control Lists  (NACL)
Instead of being attached to an ENI (as is Security groups), a NACL is attached to a subnet. This means that NACLs can't be used to control traffic between instances in the same subnet like you can do with security groups.  
You can associate the same NACL with multiple subnets, provided those subnets are all in the same VPC as the NACL.  Unlike a security group, a NACL is stateless which means it wont't automatically allow return traffic. Therefor if you permit HTTPS traffic with an inbound rule, you must also explicitly permit the return traffic using an outbound rule.

__Inbound Rules__  
NACL rules are processed in ascending order of the rule number.  You can't delete or otherwise change the default rule.


__To create a NACL rule to allow remote access from any IP address___  
* On the VPC management console click the `Network ACLs` link under `Security` on the navigation bar  
* Click the `Create network ACL` button  
* Enter a name for your ACL, select your VPC and click the `Create network ACL` button
* Go back to the `Network ACLs` list and select your newly created ACL  
* Click `Action` > `Edit inbound rules`  
* Add a new rule and click the `Save changes` button  

__Outbound Rules__  
_Ehpermeral ports_ are reserved TCP or UDP ports that clients listen for reply traffic on. As an example, when a client sends an HTTPS request to your instance over TCP  port 80, that client may listen for reply on TCP port 36034. Your NACL's outbound rules must allow traffic to egress the subnet on TCP port 36034.    
To maintain compatibility, do not restrict outbound traffic using a NACL. Use a security group instead.  

#### Public IP Addresses  
Even if you don't plan to stop your instance, keep in mind that AWS may perform maintenance events that cause your instance to restart. If this happens, its public IP address will change.  

#### Elastic IP Addresses (EIP)
Once your request for an EIP and AWS allocates it to your account, you have exclusive use of that address until you manually release it.  When an EIP is allocated to you, initially it is not bound to any instance. Instead, you must associate it with an ENI. You can associated it with only one ENI at a time.

__To allocate and Use an Elastic IP Address__   
* Go to the VPC management console and click on the `Elastic IPs` link on the navigation bar.
* Click the `Allocate Elastic IP address` button  
* Click the `Allocate` button
* Go back to the list of `Elastic IP addresses` and select your newly created EIP
* Go to `Action` > `Associate Elastic IP address`
* Select either `instance` or `Network interface` for the `Resource type`
* Select your desired instance or network interface.  
* Click the `Associate` button

#### Network Address Translation   
When you associate an ENI with a public IP address, the ENI maintains its private IP address.  Network address translation occurs automatically at the Internet gateway when an instance has a public IP address. NAT is also sometimes called _one-to-one NAT_ because one private IP address gets mapped to one public address.  

#### Network Address Translation Devices  
Network address translation occurs at the Internet gateway. Also there are two other resources that can also perform NAT.  
* NAT gateway  
* NAT instance  
Multiple instances can use the same NAT device, thus sharing the same public IP address for outbound connections. The function that NAT devices perform is also called _port address translation_ (PAT).  

__Configuring Route Tables to Use NAT Devices__  
The NAT device and the instance that use it must use different default routes, they must use different route tables and hence reside in separate subnets.  
A route target must be a VPC resource such as instance, Internet gateway, or ENI.

__NAT Gateway__  
A NET gateway is a NAT device managed by AWS. It automatically scales to accommodate your bandwidth requirements. When you create a NET gateway, you must assign it an EIP and must reside only in one subnet which must be a public subnet for it to access the Internet.

__NAT Instance__  
Unlike a NET gateway, a NAT instance doesn't automatically scale to accommodate increased bandwidth requirements. Also, a NAT instance has an ENI, so you must apply a security group to it and a public IP address. An also disable the _source/destination check_ on the NAT instance's ENI.   
One advantage of a NAT instance is that you can use it as a _bastion host_ sometimes called a _jump host_ to connect to instances that don't have a public IP. You can't do this with a NET gateway.   

__VPC Peering__  
You can connect instances in one VPC to instances in another or even in a different region of belonging to another customer.  Peered VPCs must not have overlapping CIDR block.  
VPC peering connection allows only instance-to-instance communication. You can't use it to share Internet gateways or NAT devices. You can, however, use it to share a Network Load Balancer (NLB).
If you have more than two VPCs you need to connect, you must create a peering connection between each pair. This configuration is called transitive routing.   
To use a peering connection, you must create new routes in both VPCs to allow traffic to travel in both directions. The target of each route must be the peering connection's identifier, which begins with `pcx-`.  
Inter-region VPC peering is not available for some AWS regions. Peering connections between regions have a maximum transmission unit (MTU) of 1500 bytes and do not support IPv6.

__Review Question__  
Questions - Page[124] , Answers - Page[360]   
