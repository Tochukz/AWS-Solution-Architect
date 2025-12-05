function handler(event) {
  const request = event.request;
  const uri = request.uri;
  const token = "Bearer ${ApiToken}";

  request.headers["authorization"] = { value: token };
  if (uri.startsWith("/simulation/api")) {
    request.uri = uri.replace("/simulation", "");
  }
  return request;
}
