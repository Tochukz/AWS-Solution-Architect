DnsName=AppLoadBalancer-977078372.eu-west-2.elb.amazonaws.com
websiteUrl=http://$DnsName
for i in {1..200}; do curl $websiteUrl & done; wait