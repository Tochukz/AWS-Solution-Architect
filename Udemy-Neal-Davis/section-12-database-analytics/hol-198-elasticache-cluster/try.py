from redis import Redis, RedisCluster

# For Redis Cluster (if cluster mode is enabled)
# redis = RedisCluster(
#     host='master.simplerediscluster.sua2pq.euw2.cache.amazonaws.com',
#     port=6379,
#     socket_timeout=10,  # Increase timeout if needed
#     decode_responses=True
# )

# For Non-Cluster Mode (single node)
redis = Redis(
    host='master.simplerediscluster.sua2pq.euw2.cache.amazonaws.com',
    port=6379,
    socket_timeout=10,
    decode_responses=True
)

redis.set('name', 'Tochukwu')
redis.set('role', 'Staff Engineer')

# value = redis.get('role')

# Decoding the bytes literal to a string
# decoded_value = value.decode('utf-8')
# print(decoded_value)

