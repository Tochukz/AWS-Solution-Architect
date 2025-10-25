### Subnet CIDR
* The allowed CIDR block size for your VPC is between a _/16 netmask (65,536 IP addresses)_ and _/28 netmask (16 IP addresses)_  
* A _/27_ subnet mask provides _32 addresses_
* The first four IP addresses and the last IP address in each subnet
CIDR block are not available for you to use, and cannot be assigned to an instance
* The following list shows total addresses for different subnet masks:
_/32 = 1 ; /31 = 2 ; /30 = 4 ; /29 = 8 ; /28 = 16 ; /27 = 32_
