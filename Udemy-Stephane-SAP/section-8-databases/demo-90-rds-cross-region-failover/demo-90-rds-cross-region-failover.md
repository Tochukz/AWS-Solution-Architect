# Lesson 90: RDS

## Demo 90: RDS Cross Region Failover

### Description
This solution configures an RDS cross region failover using RDS cross-region replication and CloudWatch Alarms for health check monitoring of the RDS primary instance and replica.  
If there is a failure on the primary instance, the CloudWatch Alarm triggers a Lambda function that promotes the replica to the primary instance and then updates the Route53 DNS record.  
