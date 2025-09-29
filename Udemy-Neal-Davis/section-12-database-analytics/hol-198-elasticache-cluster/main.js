const Redis = require("ioredis");

const client = new Redis({
  host: "master.simplerediscluster.sua2pq.euw2.cache.amazonaws.com",
  port: 6379,
  //   port: 6380,
  //   tls: {}, // Enables TLS
});

(async () => {
  // Set and assert
  const setResult = await client.set("key", "value");
  console.assert(setResult === "OK");

  // Get and assert
  const getResult = await client.get("key");
  console.assert(getResult === "value");

  // Close the connection
  client.disconnect();
})();
