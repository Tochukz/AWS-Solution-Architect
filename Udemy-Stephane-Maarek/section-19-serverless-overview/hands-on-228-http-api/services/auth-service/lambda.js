const jwt = require("jsonwebtoken");
// require("dotenv").config();

const jwtOptions = require("./jwt-options");

exports.handler = async (event) => {
  const authorization = event.headers?.authorization;
  const xApiKey = event.headers["x-api-key"];
  if (!authorization && !xApiKey) {
    return {
      isAuthorized: false,
      context: {
        error: "No token provided",
      },
    };
  }

  let payload;
  let isAuthorized = false;
  const secret = process.env.JWT_SECRET;
  try {
    if (authorization?.startsWith("Bearer ")) {
      const token = authorization.split(" ")[1];
      payload = jwt.verify(token, secret, jwtOptions);
      isAuthorized = true;
    } else if (xApiKey) {
      payload = jwt.verify(xApiKey, secret, jwtOptions);
      isAuthorized = true;
    }
    return {
      isAuthorized,
      context: {
        currentUser: payload,
      },
    };
  } catch (error) {
    console.error("Auth error:", error);
    return { isAuthorized: false };
  }
};
