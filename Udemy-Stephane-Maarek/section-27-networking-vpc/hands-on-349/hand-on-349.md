# Lesson 349: Egress only Internet Gateway - Hands On

### Description
An `EgressOnlyInternetGateway` is an IPv6-only Internet Gateway.    
It is used to route IPv6 outbound traffic from a private subnet while preventing inbound IPv6 traffic from reaching your private instances.    

The _EgressOnlyInternetGateway_ resource works in the same way for IPv6 as _NAT Gateway_ does for IPv4.  
Checkout `hand-on-347` CloudFormation template to see `AWS::EC2::EgressOnlyInternetGateway` in action.
