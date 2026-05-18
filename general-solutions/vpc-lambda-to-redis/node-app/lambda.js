const redis = require('redis');

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;
console.log(`Redis Host: ${REDIS_HOST}`);

const client = redis.createClient({
  socket: {
    host: REDIS_HOST ?? 'localhost',
    port: REDIS_PORT ? Number(REDIS_PORT) : 6379,
    connectTimeout: 5000,
    tls: true,
  },
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  maxRetriesPerRequest: 3
});

client.on('error', (err) => console.log('Redis Client Error', err));

exports.handler = async (event) => {
  try {
    await client.connect();

    // Read from Redis
    if (event.action === 'read') {
      const value = await client.get(event.key);
      return {
        statusCode: 200,
        body: JSON.stringify({
          key: event.key,
          value: value
        })
      };
    }

    // Write to Redis
    if (event.action === 'write') {
      const expiry = event.expiry || 3600; // default 1 hour
      await client.set(event.key, event.value, { EX: expiry });
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Successfully written to Redis',
          key: event.key,
          value: event.value
        })
      };
    }

    // Delete from Redis
    if (event.action === 'delete') {
      await client.del(event.key);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Successfully deleted from Redis',
          key: event.key
        })
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid action' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    await client.quit();
  }
};
