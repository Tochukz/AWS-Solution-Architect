# Set 6
## Question 19
A client with 400 staff has started using AWS and wants to provide AWS
Management Console access to some of their staff. The company currently uses
Active Directory on-premise and would like to continue to configure Role Based
Access Control (RBAC) using the current directory service. The client would
prefer to avoid complex federation infrastructure and replicating security
credentials into AWS.
What is the simplest and most cost-effective solution? (choose 2)
1. Use the AWS Directory Service Simple AD
2. Use the AWS Directory Service AD Connector

3. Use Active Directory Service for Microsoft Active Directory
4. Install an Active Directory Domain Controller on EC2 and add it to
the on-premise domain
5. Use IAM Roles

✅ **Correct answers:**

> **2️⃣ Use the AWS Directory Service AD Connector**
> **5️⃣ Use IAM Roles**

---

### 🧠 Explanation

Let’s unpack the scenario step by step:

* The client already has **on-premises Active Directory (AD)**.
* They want to use **existing AD identities** for AWS console access.
* They want **role-based access control (RBAC)** in AWS.
* They want to **avoid complex federation (like ADFS)** and **not replicate credentials** into AWS.
* They want the **simplest and most cost-effective** solution.

---

### ✅ **Option 2: AWS Directory Service AD Connector**

**AD Connector** is the **ideal fit** here.

* It acts as a **proxy** between AWS and your existing on-premises AD.
* **No need to synchronize or store passwords** in AWS.
* AWS simply **authenticates users against your existing AD** over a secure connection (VPN or Direct Connect).
* Easy to configure with **AWS IAM Identity Center (formerly AWS SSO)** to grant AWS Management Console access.
* Low cost and low maintenance compared to full managed AD or federation servers.

**In short:**

> AD Connector lets AWS “talk” to your existing AD without copying credentials.

---

### ✅ **Option 5: Use IAM Roles**

* You can map **Active Directory groups** to **IAM Roles**.
* This provides **Role-Based Access Control (RBAC)**.
* Each AD group corresponds to a different IAM Role with specific permissions.

Users then:

1. Log in via AWS Single Sign-On / IAM Identity Center using AD credentials.
2. Are presented with the **IAM Roles** (based on group membership) they can assume.

---

### ❌ Why the Others Are Not Suitable

| Option                          | Reason                                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **1. Simple AD**                | Creates a **new standalone directory** inside AWS — not connected to on-prem AD. Would require duplicate accounts. |
| **3. AWS Managed Microsoft AD** | A **fully managed AD in AWS**, but it **duplicates** your AD data and is **more expensive** — unnecessary here.    |
| **4. Install AD on EC2**        | Complex, costly, and redundant since you already have on-prem AD. Adds management overhead.                        |

---

### 🧩 **Summary Table**

| Option         | Works with existing AD | Stores passwords in AWS? | Complexity | Cost      | Recommended? |
| -------------- | ---------------------- | ------------------------ | ---------- | --------- | ------------ |
| Simple AD      | ❌ No                   | ✅ Yes                    | Low        | Low       | ❌            |
| AD Connector   | ✅ Yes (proxy)          | ❌ No                     | Low        | ✅ Low     | ✅            |
| AWS Managed AD | ✅ Yes (replica)        | ✅ Yes                    | Medium     | 💰 Higher | ❌            |
| AD on EC2      | ✅ Yes                  | ✅ Yes                    | High       | 💰 High   | ❌            |
| IAM Roles      | ✅ Integrated with AD   | ❌ No                     | Low        | ✅ Low     | ✅            |

---

✅ **Final Answer:**

> **2. Use the AWS Directory Service AD Connector**
> **5. Use IAM Roles**

These together give a **simple, cost-effective, and secure** solution for providing AWS Console access based on existing Active Directory RBAC — **without** federation or credential replication.
