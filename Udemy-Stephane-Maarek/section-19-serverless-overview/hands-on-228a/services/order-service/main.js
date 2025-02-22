#!/usr/bin/env node

const http = require("http");
const app = require("./app");

const port = process.env.PORT || 8002;
app.set("port", port);

const server = http.createServer(app);

const startMsg = `Order service is running on port ${port}`;
server.listen(port, () => console.log(startMsg));
