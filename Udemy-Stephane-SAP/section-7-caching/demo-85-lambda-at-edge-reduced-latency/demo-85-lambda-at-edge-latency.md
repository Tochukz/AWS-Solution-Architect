# Lesson 85: Lambda@Edge Reduced Latency

## Demo 85: Lambda@Edge Reduced Latency

### Description
Lambda@Edge is used to route request to the S3 Origin closest to the user.  
For example, we a bucket in `eu-west-1` and a replica of the bucket in `us-east-2`, then Lambda@Edge  will send the request to `us-east-2` if the request source in in america.
This is useful to reduce the latency of the first request before it is being cached by the CloudFront distribution.   
