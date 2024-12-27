# Lesson 99: Elastic Cache - Hands on

### Description

This configuration provisions an Redis ElastiCache instance

### Operation

**Deployment**

Lint the template

```bash
$ cfn-lint ElastiCache.yaml
```

Setup your DB master username and password in `env.sh` (copied from `sample-env.sh`) and then export it to the terminal

```bash
$ cp sample-env.sh env.sh
# Update env.sh with your choosen DB username and password
$ . ./env.sh
```

Now that the master username and password are available as environment variables you can deploy the first stack

```bash

$ aws cloudformation deploy \
  --stack-name ElastiCache \
  --template-file ElastiCache.yaml \
  --parameter-overrides MasterUsername=${User} MasterPassword=${Pass}
```

**Testing**
A Redis ElastiCache cluster does not allow direct access from the internet for security reasons.  
To access the Redis Cluster, we use a _Bastion Host_, an EC2 instance
in the same VPC as the ElasticCache cluster can act as a Bastion host.

SSH into your EC2 instance and test to see if you have access to the Redis Cluster

```bash
# Install redis client
$ sudo amazon-linux-extras install redis6
$ redis-cli --version
# Connect to redis cluster
$ redis-cli -h <redis-endpoint> -p 6379
# After you are in the Redis shell, send a ping command
xxxx.xxxx.0001.euw2.cache.amazonaws.com:6379> PING
# You should get the PONG reposne
```

Remember to replace the redis-endpoint with the RedisEndpoint output from the stack outputs.

Another way to access the Cluster is by Creating a Tunnel.
You create an SSH tunnel by using the baston host to forward traffic from your local machine to the ElastiCache cluster.

```bash
$ ssh -i dev-simple-key.pem -L 6379:<elasticache-endpoint>:6379 ec2-user@xx.xxx.xx
```

Once the SSH tunnel is established, use the `redis-cli` or any Redis client of your choice to connect to the cluster.

```bash
$ redis-cli -h 127.0.0.1 -p 6379
```

After connecting to the Redis Cluster, you can test it with a PING command

```bash
$ 127.0.0.1:6379> PING
```

**Debug Errors**
In the case of error during deployment, checkout the stack events leading to the failure

```bash
$ aws cloudformation describe-stack-events --stack-name ElastiCache
```

**Cleanup**
To delete the stack

```
$ aws cloudformation delete-stack --stack-name ElastiCache
```

**Useful commands**  
To list all of the available engine versions for REdis

```bash
$  aws elasticache describe-cache-engine-versions --engine redis --query "CacheEngineVersions[].EngineVersion"
```

To list all the engine version for Memcached or Valkey just replace the `--engine` value by `memcached` or `valkey` respectively.
