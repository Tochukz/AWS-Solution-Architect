import redis

primary_endpoint="master.simplerediscluster.sua2pq.euw2.cache.amazonaws.com"
cache = redis.StrictRedis(host=primary_endpoint, port=6379, db=0)

cache.set('name', 'Tochukwu')
cache.set('role', 'Staff Engineer')

value = cache.get('role')

# Decoding the bytes literal to a string
decoded_value = value.decode('utf-8')
print(decoded_value)