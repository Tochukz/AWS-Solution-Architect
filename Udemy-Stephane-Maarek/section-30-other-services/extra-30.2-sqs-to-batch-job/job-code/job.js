require("dotenv").config();
const { receiveMessage } = require("./sqs-service");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  const { NODE_ENV, AWS_REGION, QUEUE_URL } = process.env;

  console.log(`Running job in ${NODE_ENV} environment, ${AWS_REGION} region`); // Running job in development environment, eu-west-2 region

  for (let i = 0; i < 10; i++) {
    console.log(`Iteration ${i + 1} at ${new Date().toLocaleTimeString()}`);
    await delay(2000); // Wait for 2 seconds
  }

  const result = await receiveMessage(QUEUE_URL);
  console.log("SQS Process Queue Result:", result);
}

run();
