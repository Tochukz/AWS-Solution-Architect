const dnsName = "AppLoadBalancer-977078372.eu-west-2.elb.amazonaws.com";
const websiteUrl = `http://${dnsName}`;

const maxRequest = 100000;
let requestCount = 0;
const repeat = setInterval(() => {
  requestCount++;
  fetch(websiteUrl)
    .then((res) => res.text())
    .then((html) => console.log(`Result ${requestCount}: ${html}`))
    .catch((error) => console.log("Err", error));

  if (requestCount > maxRequest) {
    clearInterval(repeat);
    process.exit(0);
  }
}, 200);
