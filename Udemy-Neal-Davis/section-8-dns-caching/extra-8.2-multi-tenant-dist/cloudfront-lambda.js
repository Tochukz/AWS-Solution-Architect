exports.handler = async (event) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const hostHeader = headers["host"][0].value;

  // Tenant-to-Origin Mapping
  const tenantOrigins = {
    "tenant1.example.com": "Tenant1Origin",
    "tenant2.example.com": "Tenant2Origin",
    // Add more tenants as needed
  };

  // Route to the appropriate origin
  if (tenantOrigins[hostHeader]) {
    request.origin = {
      s3: {
        domainName: `${tenantOrigins[hostHeader]}.s3.amazonaws.com`,
        region: "", // Auto-detected
        authMethod: "origin-access-identity",
        path: "",
        customHeaders: {},
      },
    };
    request.headers["host"] = [
      { key: "host", value: `${tenantOrigins[hostHeader]}.s3.amazonaws.com` },
    ];
  } else {
    // Fallback to default origin (or reject)
    return {
      status: "403",
      statusDescription: "Forbidden",
      body: "Invalid tenant domain",
    };
  }

  return request;
};
