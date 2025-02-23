const jwt = require("jsonwebtoken");

const jwtOptions = require("./jwt-options");

const args = process.argv.slice(2);
const secret = args[0];
const username = args[1];
if (!secret) {
  console.error("Please provide a secret as first argument");
  process.exit(1);
}
if (secret.length !== 32) {
  console.error("Secret must be at least 32 characters long");
  process.exit(1);
}
if (!username) {
  console.error("Please provide an app name as second argument");
  process.exit(1);
}

const payload = {
  username,
  userId: 1,
};
const token = jwt.sign(payload, secret, jwtOptions);

console.log(`Token: ${token}`);
