## Chapter 1: Introduction to Cloud Computing and AWS  
#### Cloud Computing Optimization
__Scalability__  
AWS offers its autoscaling service through which you define a machine image that can be instantly and automatically replicated and launched into multiple instances to meet demand.  
__Elasticity__  
An elastic infrastructure will automatically reduce capacity when demand drops.  

__Cost Management__  
Cloud computing transitions your IT spending from capital expenditure(capex) framework into something closer to operational expenditure(opex).  See [AWS Calculator](https://calculator.aws/) to estimate the cost of your architecture.  

#### AWS Platform Architecture  
It is important to always be conscious of the particular region you have selected when you launch new AWS resources, as pricing and service availability can vary from one to next.    
Endpoint addresses are used to access your AWS resources remotely from within application code or scripts. Prefixes like _ec2_, _apigateway_ or _cloudformation_ are often added to the endpoint to specify a particular AWS service e.g _cloudformation.us-east-2.amazonaws.com_. See [full list](https://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region) of endpoints.  

A VPC is effectively a network address space within which you can create network subnets and associate then with particular availability zones. When configures properly, this architecture can provide effective resource isolation and durable replication.  

__The AWS Service Level Agreement__  
The important thing to remember is that it's not if things will fail but when. Build your applications to be geographically disperses and fault tolerant so that when things do break, your users will barely notice.  

__AWS CLI__  
List buckets available in your AWS account
```
$ aws s3 ls
```  
Create a new Bucket
```
$ aws s3 mb s3://chucks.xyz
```
Here my bucket name will be `chucks.xyz`

Copy a file from you local machine to the bucket  
```
$ aws s3 cp folder/filename.txt s3://chucks.xyz
```  

__Other Support Resources__  
* [AWS community forums](https://forums.aws.amazon.com/)
* [AWS Documentation](https://docs.aws.amazon.com/)  
* [AWS Well-Architected page](https://aws.amazon.com/architecture/well-architected)  

__Reference__
List of AWS Regions and endpoints Page[47]  
Exercise Page[52]  

__Review Questions__
Questions Page[53]  
Answer Page[356]
