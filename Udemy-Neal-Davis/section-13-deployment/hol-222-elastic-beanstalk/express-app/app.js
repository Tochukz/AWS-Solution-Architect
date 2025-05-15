const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined")); // Logging
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Express.js application running on AWS Elastic Beanstalk",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production" ? "An error occurred" : err.message,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
