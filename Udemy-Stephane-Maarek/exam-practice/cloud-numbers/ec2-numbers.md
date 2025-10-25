### EC2
__EC2 and EBS Limits__  
* 20 On-Demand EC2 instances and 300 TiB of aggregate PIOPS
volume storage per region


### Auto Scaling Group
__Default Termination Policy Order of Termination__  
1. Terminate instance from the AZ with higher number of instances
2. Terminate the instance that was launched from a launch configuration, a different launch template, or the oldest version of the current launch template.
3. Terminate the instance that is closest to the next billing hour.

__Note__
When rebalancing, Amazon EC2 Auto Scaling launches new instances before terminating the old ones, so that rebalancing does not compromise the performance or availability of your application.

[Control which Auto Scaling instances terminate during scale in](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-termination.html)  
