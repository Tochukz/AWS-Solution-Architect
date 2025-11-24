# Practice Test 6 - Attempt 1
## Question 53
A global enterprise maintains a hybrid cloud environment and wants to transfer large volumes of data between its on-premises data center and Amazon S3 for backup and analytics workflows. The company has already established a Direct Connect (DX) connection to AWS and wants to ensure high-bandwidth, low-latency, and secure private connectivity without traversing the public internet. The architecture must be designed to access Amazon S3 directly from on-premises systems using this DX connection.

Which configuration should the network engineering team implement to allow direct access to Amazon S3 from the on-premises data center using Direct Connect?
1. Configure a VPN connection over the public internet to AWS and route S3 traffic through the tunnel instead of using Direct Connect
2. Provision a Public Virtual Interface (Public VIF) on the Direct Connect connection to access Amazon S3 public IP addresses from the on-premises data center
3. Use a Transit Gateway with Direct Connect Gateway to route on-premises traffic through a VPC and then to Amazon S3 using private IP addressing
4. Use a Private Virtual Interface (Private VIF) on the Direct Connect connection and create a VPC endpoint to route traffic to S3 over the private network

__

__Answer:__   
2. Provision a Public Virtual Interface (Public VIF) on the Direct Connect connection to access Amazon S3 public IP addresses from the on-premises data center.**

**Why:** S3 is a regional public AWS service that exposes public endpoints/IP address ranges. To access public AWS services over Direct Connect (so traffic doesn’t traverse the Internet), you create a **Public Virtual Interface** on your Direct Connect connection; that lets your on-premises network reach AWS public service endpoints (S3, DynamoDB, etc.) over the private DX link.

**Why the other choices are incorrect**

* **1 (VPN over Internet):** That defeats the requirement — it sends traffic over the public internet instead of using the existing Direct Connect private link.
* **3 (Transit Gateway → VPC → S3 using private IP):** Transit Gateway/Direct Connect Gateway can get you into a VPC, but S3 itself doesn’t have private VPC addresses by default. You would still need to reach S3 endpoints (public) or use a VPC endpoint — this option as stated is not the direct/standard way to reach S3 from on-prem via DX.
* **4 (Private VIF + VPC endpoint):** A Private VIF connects you to a VPC, and gateway VPC endpoints allow VPC resources to access S3 without Internet — however, the exam/architecture best practice for directly accessing S3 from on-prem over DX is to use a **Public VIF**. (Using a Private VIF + VPC endpoint is more complex, has routing considerations and is not the standard pattern cited for direct on-prem→S3 via DX.)
