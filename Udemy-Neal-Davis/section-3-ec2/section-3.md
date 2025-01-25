# Section 3: Amazon Elastic Compute Cloud
### EC2 Placement Groups
There are 3 types of placement Groups
1. __Cluster__ -  packs instances close together inside an Availability Zone. This strategy enabled workloads to achieve the _low-latency_ network performance necessary for _tight-coupled_ node-to-node communication that is typical of _High Performace Computing_ applications.
2. __Partition__ - spreads your instances across logical partitions such that groups of instances in one partition _do not share the underlying hardware_ with groups of instances in different partitions. This strategy is typically used by large _distributed and replicated workloads_, such as Hadoop, Cassandra and Kafka.
3. __Spread__ - strictly places a small group of instances across _distinct underlying hardware_ to reduce correlated failures.  

### Network Interface
1. __Elastic Network Interface__
* Basic adapter type for when you don't have any high-performace requirement
* Can use with all instance types
2. __Elastic Network Adapter__  
* Enhances networking performance
* Higher bandwidth and lower inter-instance latency
* Must choose supported instance type
3. __Elastic Fabric Adapter__  
* Use with High Performance Computing (HPC) and Message Parsing Interface (MPI) and Machine Learning (ML) use cases
* Tightly coupled application
* Can use with all instance types
