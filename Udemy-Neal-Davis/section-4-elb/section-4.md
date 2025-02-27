# Section 4: Elastic Load Balancing and Auto Scaling
### High Availability Vs Fault Tolerance
__High Availability__  
* Minimal service interruption
* Designed with no single point of failure (redundancy)
* Uptime measured in %, e.g 99.99%
* Synchronous or asynchronous replication
* Lower cost compared to Fault Tolerance
* Services that create High Availability
  - Elastic Load Balancing
  - EC2 Auto Scaling
  -  Amazon Route 53

__Fault Tolerance__  
* No service interruption
* Specialized hardware with instantaneoud failover
* No downtime
* Synchronous replication
* Higher cost compared to High Availability
* Examples of Fault Tolerance
  - Fault tolerant NICs
  - Disk mirroring (RAID 1)
  - Synchronous DB replication
  - Redundant power

AWS takes care of a lot of the Fault Tolerance component for you system.  
Your role is to implement High Availability on top of the Fault Tolerance that AWS provides.  

### Amazon Elastic Load Balancer
* Provides high availability and fault tolerance
* Targets include:
  - Amazon EC2 instances
  - Amazon ECS containers
  - IP addresses
  - Lambda functions
  * Other load balancers

#### Types of Elastic Load Balancer (ELB)
__Application Load Balancer__  
* Operates at the request level
* Routes based on the content of the request (Layer 7)
* Supports path-based routing, host-based routing, query string parameter-based routing and source IP address-based routing
* Supports instances, IP addresses, Lambda functions and containers as target

__Network Load Balancer__  
* Operated at the connection level
* Routes connections based on IP protocol data (Layer 4)
* Offers ultra high performance, low latency and TLS offloading at scale
* Can have a static IP / Elastic IP
* Supports UDP and static IP address as targets

__Gateway Load Balancer___  
* Used in front of virtual appliances such as firewalls, IDS/IPS, and deep packet inspection systems
* Operates at Layer 3 - listens for all packets on all ports
* Forwards traffic to the TG specified in the listener rules
* Exchanges traffic with appliances using the GENEVE protocol on port 6081

### Auto Scaling Policies
1. __Simple Scaling__: Will launch a new instance when Alarm is breached
2. __Step Scaling__: May launch more than one instance depending on the level of the Alarm e.g percentage CPU utilization
3. __Scheduled Scaling__: Launches new instances at a scheduled time.
4. __Target Tracking Scaling__: Scales instances count in Auto Scaling Group based on a target Metric value e.g CPU Utilization
AWS recommends you use _Target Tracking_ over _Simple and Step Scaling_ whenever possible.  

### Cheat Sheets  
[AWS Elastic Load Balancing and EC2 Auto Scaling Cheat Sheet](https://digitalcloud.training/auto-scaling-and-elastic-load-balancing/)  
