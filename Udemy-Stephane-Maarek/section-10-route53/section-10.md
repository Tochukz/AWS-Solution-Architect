## Section 10: Route 53

__Routing Policies__  
Route 53 supports the following Routing Policies
* __Simple__: Can map a subdomain to a single or multiple values
* __Weighted__: Control the % of request to each resource
* __Failover__:
* __Latency based__: Redirects to the resource that has the least latency for the user
* __Geolocation__:
* __Multi-Value Answer__:
* __Geoproximity__:  (using Route 53 Traffic Flow feature)

When configuring `AWS::Route53::RecordSet` the properties expects one of Weight, Region, Failover, GeoLocation, MultiValueAnswer, GeoProximityLocation, or CidrRoutingConfig.
