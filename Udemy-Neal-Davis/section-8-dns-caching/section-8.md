# Section 8: DNS, Caching, and Performance Optimization

## Amazon Route 53 Resolver
__DNS Forwarding__  
When a DNS Server cannot answer a query and it knows where to forward the request unto, it when do so. This can be a recursive process as the query moves from one DNS service to the other until it finds the result.  

__Route 53 Resolver__  
Route 53 resolver it enables us to work with out on-Premises DNS service and the Route 53 DNS service so that we can bring the two together and get resolution of domain name whether they are in the Hosted Zone in Route 53 or in our internal DNS service on-premise.   

__Route 53  Resolver Types__  
1. Outbound Endpoints
2. Inbound Endpoint

## Server Name Indication (SNI)
__Introduction__  
It is a method where you are able to have multiple SSL/TLS certificate which correspond with different domain name running on the same IP address on CloudFront.   
With this you can have two alter names - mydomain.com and anotherdomain.com with their seperate ACM certificate both configured on the same CloudFront Distribution.   


## CloudFront
__Somethings about Regional Cache__  
* Regional Edge Caches are located between origin web servers and global edge locations and have a larger cache than any individual edge location, so your objects remain in cache longer at these locations.
* Regional Edge caches aim to get content closer to users and are enabled by default for CloudFront Distributions (so you don't need to update your distributions)
* There are no additional charges for using Regional Edge Caches
* You can write to regional edge caches too

### Cheat Sheets  
[Amazon Route 53 Cheat Sheet](https://digitalcloud.training/amazon-route-53/)  
[Amazon CloudFront Cheat Sheet](https://digitalcloud.training/amazon-cloudfront/)  
[AWS Global Accelerator Cheat Sheet](https://digitalcloud.training/aws-global-accelerator/)
