## Chapter 5: Elastic Load Balancing, Amazon CloudWatch, and Auto Scaling  
### Introduction
_Elastic Load Balancing_ distributes traffic across multiple EC2 instances and includes options that provide flexibility and control of incoming requests to Amazon EC2 instances.  
_Amazon CloudWatch_ monitors AWS cloud resources and applications. It collects and tracks metrics, collects and monitors log files, and sets alarms. The basic level of monitoring has no cost but a more detailed level of monitoring has an additional cost.  
_Auto Scaling_ allows you to maintain the availability of your applications by scaling Amazon EC2 capacity up or down in accordance with conditions you set.   

### Elastic Load Balancing
#### Features of Elastic Load Balancing
Elastic Load Balancing supports the following load balancers:
* Application Load Balancers
* Network Load Balancers
* Gateway Load Balancers
* Classic Load Balancers

#### Elastic Load Balancing
Elastic Load Balancing supports routing and load balancing of HTTP, HTTPS, TCP, and SSL traffic to Amazon EC2 instances. Elastic Load Balancing also supports integrated certificate management and SSL termination.  
Elastic Load Balancing seamlessly integrates with the Auto Scaling service to automatically scale the EC2 instances behind the load balancer.
Elastic Load Balancing also supports integrated certificate management and SSL termination.  

__Types of load balancers__    
1. Internet-Facing load Balancer
2. Internal Load Balancers
3. HTTPS Balancers

Elastic Load Balancing does not support _Server Name Indication_ (SNI) on your load balancer. This means that if you want to host multiple websites on a fleet of Amazon EC2 instances behind Elastic Load Balancing with a single SSL certificate, you will need to add a Subject Alternative Name (SAN) for each website to the certificate to avoid site users seeing a warning message when the site is accessed.  

__Tip:__ An AWS recommended best practice is always to reference a load balancer by its DNS name, instead of by the IP address of the load balancer, in order to provide a single, stable entry point.

__Listeners__  
Every load balancer must one one or more listeners configured.

#### Configuring Elastic Load Balancing
__Idle connection timeout__   
After the idle timeout period has elapsed, if no data has been sent or received, the load balancer closes the connection.
By default, Elastic Load Balancing sets the idle timeout to 60 seconds for both connection to the client and connection to the EC2 instance.  
If you use HTTP and HTTPS listeners, we recommend that you enable the keep-alive option for your Amazon EC2 instances. This reduces CPU utilization.

__Tip:__ To ensure that the load balancer is responsible for closing the connections to your back-end instance, make sure that the value you set for the keep-alive time is greater than the idle timeout setting on your load balancer.

__Cross-Zone Load Balancing__  
To ensure that request traffic is routed evenly across all back-end instances for your load balancer, regardless of the Availability Zone in which they are located, you should enable cross-zone load balancing on your load balancer.  

__Connection Draining__   
You should enable connection draining to ensure that the load balancer stops sending requests to instances that are deregistering or unhealthy, while keeping the existing connections open.   

__Proxy Protocol__  
If you enable Proxy Protocol, a human-readable header is added to the request header with connection information such as the source IP address, destination IP address, and port numbers. The header is then sent to the back-end instance as part of the request.  
Before using Proxy Protocol, verify that your load balancer is not behind a proxy server with Proxy Protocol enabled.

__Sticky Sessions__   
You can use the sticky session feature (also known as _session affinity_), which enables the load balancer to bind a user’s session to a specific instance.

__Health check__  
 A health check is a ping, a connection attempt, or a page that is checked periodically.   
 You can set the time interval between health checks and also the amount of time to wait to respond in case the health check page includes a computational aspect.  
 The status of the instances that are healthy at the time of the health check is _InService_. The status of any instances that are unhealthy at the time of the health check is _OutOfService_.  

### Amazon CloudWatch  
With Amazon CloudWatch, you can collect and track metrics, create alarms that send notifications, and make changes to the resources being monitored based on rules you define.
You might choose to monitor CPU utilization to decide when to add or remove Amazon EC2 instances in an application tier.   
You can specify parameters for a metric over a time period and configure alarms and automated actions when a threshold is reached. Amazon CloudWatch supports multiple types of actions such as sending a notification to an Amazon Simple Notification Service (Amazon SNS) topic or executing an Auto Scaling policy.  
Amazon CloudWatch supports an Application Programming Interface (API) that allows programs and scripts to PUT metrics into Amazon CloudWatch as name-value pairs that can then be used to create events and trigger alarms in the same manner as the default Amazon CloudWatch metrics.
__Amazon CloudWatch Logs__  
Amazon CloudWatch Logs can be used to monitor, store, and access log files from Amazon EC2 instances, AWS CloudTrail, and other sources. You can then retrieve the log data and monitor in real time for events—for example, you can track the number of errors in your application logs and send a notification if an error rate exceeds a threshold. Amazon CloudWatch Logs can also be used to store your logs in Amazon S3 or Amazon Glacier.

__Amazon Cloudwatch limitation__  
Amazon CloudWatch has some limits that you should keep in mind when using the service. Each AWS account is limited to 5,000 alarms per AWS account, and metrics data is retained for two weeks by default (at the time of this writing).  

### Auto Scaling  
With Auto Scaling, you can ensure that the number of running Amazon EC2 instances increases during demand spikes or peak demand periods to maintain application performance and decreases automatically during demand lulls or troughs to minimize costs.  

#### Auto Scaling Plans  
Auto Scaling has several schemes or plans that you can use to control how you want Auto Scaling to perform.  
__Maintain Current Instance Levels__   
To maintain the current instance levels, Auto Scaling performs a periodic health check on running instances within an _Auto Scaling group_. When Auto Scaling finds an unhealthy instance, it terminates that instance and launches a new one.  
__Tip:__
Steady state workloads that need a consistent number of Amazon EC2 instances at all times can use Auto Scaling to monitor and keep that specific number of Amazon EC2 instances running.

__Manual Scaling__  
You only need to specify the change in the maximum, minimum, or desired capacity of your Auto Scaling group.  
Manual scaling out can be very useful to increase resources for an infrequent event, such as the release of a new game version that will be available for download and require a user registration.   

__Schedule Scaling__   
Scheduled scaling means that scaling actions are performed automatically as a function of time and date.  

__Dynamic Scaling__   
Dynamic scaling lets you define parameters that control the Auto Scaling process in a scaling policy. For example, you might create a policy that adds more Amazon EC2 instances to the web tier when the network bandwidth, measured by Amazon CloudWatch, reaches a certain threshold.

#### Auto Scaling Components  


[User Guide - Elastic Load Balancing](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html)  
[User Guide - Application Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)



?Setting up a virtual load balancers. Not elastic load balancer?
