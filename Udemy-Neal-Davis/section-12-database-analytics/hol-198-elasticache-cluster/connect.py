from redis import Redis

r = Redis(
    host='master.simplerediscluster.sua2pq.euw2.cache.amazonaws.com',
    port=6379,
    socket_timeout=5,
    decode_responses=True
)
print(r.ping())  # Should return "True"