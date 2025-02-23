const lambda = require("./lambda");

const goodToken = "";
const badToken = "";
const token = badToken;
const event1 = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};
const event2 = {
  headers: {
    "x-api-key": token,
  },
};
lambda
  .handler(event1)
  .then((result1) => console.log(result1))
  .catch((err) => console.log("err1", err));

lambda
  .handler(event2)
  .then((result2) => console.log(result2))
  .catch((err) => console.log("err2", err));
