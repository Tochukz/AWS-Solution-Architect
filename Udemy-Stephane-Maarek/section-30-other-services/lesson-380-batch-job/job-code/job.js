const { listBuckets } = require("./s3-service");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log(`Running job in ${process.env.NODE_ENV} environment`);
  const result = await listBuckets();
  console.log("S3 Buckets: ", result.data);

  for (let i = 0; i < 100; i++) {
    console.log(`Iteration ${i + 1} at ${new Date().toLocaleTimeString()}`);
    await delay(2000); // Wait for 2 seconds
  }
}

run();
