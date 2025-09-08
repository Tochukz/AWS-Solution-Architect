const { listBuckets } = require("./s3-service");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function func1() {
  console.log("func1() called");
}

function funcX() {
  console.log("funcX() called");
}

async function run() {
  const { NODE_ENV, AWS_REGION, JOB_FUNCTION: funcName } = process.env;
  const args = process.argv.slice(2); // ["arg1", "arg2", "arg3"]

  console.log(`Running job in ${NODE_ENV} environment, ${AWS_REGION} region`); // Running job in development environment, eu-west-2 region
  console.log({ args, funcName }); // {args: ["arg1", "arg2", "arg3"], funcName: "func1"}

  switch (funcName) {
    case "func1":
      func1();
      break;
    case "funcX":
      funcX();
      break;
  }

  const result = await listBuckets();
  console.log("Buckets Count:", result.data?.length);
  console.log("First Buckets", result.data?.[0]);

  for (let i = 0; i < 100; i++) {
    console.log(`Iteration ${i + 1} at ${new Date().toLocaleTimeString()}`);
    await delay(2000); // Wait for 2 seconds
  }
}

run();
