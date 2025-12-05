const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { HttpRequest } = require("@aws-sdk/protocol-http");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { Sha256 } = require("@aws-crypto/sha256-js");
const Axios = require("axios");

const region = "eu-west-2";
const url =
  "https://b34dz6xi7uhr6z3u5xhvkt6fqu0bmjcq.lambda-url.eu-west-2.on.aws";

const invokeLambdaUrl = async () => {
  const credentials = await defaultProvider()();

  const signer = new SignatureV4({
    credentials,
    region,
    service: "lambda",
    sha256: Sha256,
  });

  const request = new HttpRequest({
    method: "GET", // or "POST" if your Lambda expects a body
    headers: {
      host: new URL(url).host,
    },
    hostname: new URL(url).hostname,
    path: "/", // or set a path like "/myroute"
    protocol: "https:",
  });

  const signedRequest = await signer.sign(request);

  const axios = Axios.create({ baseURL: url, headers: signedRequest.headers });
  const response = await axios.get("/");

  const body = await response.data;
  console.log(`Status: ${response.status}`);
  console.log(`Body: ${body}`);
};

invokeLambdaUrl().catch(console.error);
