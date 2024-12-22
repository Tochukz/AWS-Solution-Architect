# Udemy Course - AWS Certified Solution Architect
__By Stephane Maarek__  
[AWS Certified Solution Architect](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)

__Connection Draining__  
* Connection Draining - for CLB
* Deregistration Delay - for ALB & NLB


__Auto Scaling Groups - Scaling Policies__  
1. Dynamic Scaling
  * Target Tracking Scaling
    - Simple to setup
    - Example: I want the average ASG CPU to stay at around 40%
  * Simple / Step Scaling
    - When a CloudWatch alarm is triggered (example CPU > 70%), then add 2 units
    - When a CloudWatch alarm is triggered (example CPU < 30 %), then remove
2. Schedules Scaling
  * Anticipate a scaling based on known usage pattern
  * Example: increase the min capacity to 10 at 5 pm on Fridays
3. Predictive Scaling:
  * continuously forecast load and schedule scaling ahead
  * useful for patterns that repeat themselves.  
  * you analyze historical load, generate forecast and schedule scaling action.

__Good metrics to scale on__  
1. __CpuUtilization__: Average CPU utilization across your instances
2. __RequestCountPerTarget__: to make sure the number of requests per EC2 instance is stable
3. __Average Network In / Out__ (if your application is network bound)
4.  __Any custom metric__(that you push using CloudWatch)

### Resources
[Slide and Code Download](https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/)  
[AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure)  
[EC2 Instance-Types Comparison](https://instances.vantage.sh/)

## Readings
[53 - Elastic Network Interface](https://aws.amazon.com/blogs/aws/new-elastic-network-interfaces-in-the-virtual-private-cloud/)

## References
[EBS Volume Types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html)
