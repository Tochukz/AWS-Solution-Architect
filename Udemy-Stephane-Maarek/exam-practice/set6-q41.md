# Set 6
## Question 41
You work as an Enterprise Architect for a global organization which employs
20,000 people. The company is growing at around 5% per annum. The company
strategy is to increasingly adopt AWS cloud services. There is an existing
Microsoft Active Directory (AD) service that is used as the on-premise identity
and access management system. You want to enable users to authenticate using
their existing identities and access AWS resources (including the AWS
Management Console) using single sign-on (SSO).
What is the simplest way to enable SSO to the AWS management console using
the existing domain?
1. Install a Microsoft Active Directory Domain Controller on AWS and
add it into your existing on-premise domain
2. Launch an Enterprise Edition AWS Active Directory Service for
Microsoft Active Directory and setup trust relationships with your on premise
domain
3. Use a large AWS Simple AD in AWS
4. Launch a large AWS Directory Service AD Connector to proxy all
authentication back to your on-premise AD service for authentication

✅ **Correct Answers:**
**(4) Launch a large AWS Directory Service AD Connector to proxy all authentication back to your on-premise AD service for authentication.**

---

### **Explanation:**

Here’s how each option works:

1. ❌ **Install a Microsoft Active Directory Domain Controller on AWS and add it into your existing on-premise domain**

   * This creates a *replica domain controller* in AWS.
   * While functional, it requires **manual setup, maintenance, replication configuration, and failover management** — not the *simplest* or most cost-effective method.

2. ⚙️ **Launch an Enterprise Edition AWS Managed Microsoft AD and set up a trust relationship with your on-prem AD**

   * This **works** and provides a **fully managed AD in AWS**.
   * However, it’s **more complex and costly** than needed if all you want is to authenticate against your existing on-prem AD.
   * Use this option if you need to *extend* your directory into AWS (e.g., for RDS SQL Server, domain-joined EC2s, or GPOs).

3. ❌ **Use a large AWS Simple AD in AWS**

   * Simple AD is a **standalone directory** — it **cannot connect to or trust** your on-prem AD.
   * So users would **not** be able to use their existing credentials.

4. ✅ **Launch a large AWS Directory Service AD Connector**

   * **Best option for SSO with existing AD.**
   * It acts as a **proxy** — it does **not store user credentials** but **redirects authentication requests** to your on-prem Active Directory.
   * This allows:

     * AWS Management Console SSO
     * IAM role-based access via existing AD groups
   * **Simplest and most cost-effective** for large organizations that already have on-prem AD.

---

### **Summary Table**

| Option | Description                  | Simplicity | Cost   | SSO with On-Prem AD | Recommended                  |
| ------ | ---------------------------- | ---------- | ------ | ------------------- | ---------------------------- |
| 1      | Self-managed AD in EC2       | ❌ Complex  | 💰💰   | ✅                   | No                           |
| 2      | Managed Microsoft AD (trust) | ⚙️ Medium  | 💰💰💰 | ✅                   | Only if you need domain join |
| 3      | Simple AD                    | ✅ Simple   | 💰     | ❌                   | No                           |
| 4      | AD Connector                 | ✅✅ Easiest | 💰     | ✅✅                  | ✅ Yes                        |

---

**Final Answer:**
👉 **(4) Launch a large AWS Directory Service AD Connector**


## Follow up Question
What is the maximum number of users supported by the large AWS Directory Service AD Connector?

**Answer**  
According to the AWS documentation for AD Connector:

> “There are **no enforced user or connection limits** for either the small or large AD Connector.” ([AWS Documentation][1])

However – in AWS best-practice guidance (especially for use with Amazon WorkSpaces) you will find recommended sizing guidelines:

* A *Small* AD Connector is recommended for up to ~500 users. ([AWS Documentation][2])
* A *Large* AD Connector is recommended for up to ~5,000 users (or ~5,000 WorkSpaces-entitled users) in some guidance. ([AWS Documentation][3])

So in short:

* There is **no hard maximum user limit** documented for a *Large* AD Connector.
* But for practical operational sizing, AWS suggests a Large AD Connector supports around **5,000 users**.

If you have ~20,000 users (as per your scenario) you would likely need multiple AD Connectors or consider using AWS Managed Microsoft AD instead for scale. ([AWS Documentation][2])

[1]: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_ad_connector.html?utm_source=chatgpt.com "AD Connector - AWS Directory Service"
[2]: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/ad_connector_best_practices.html?utm_source=chatgpt.com "Best practices for AD Connector - AWS Directory Service"
[3]: https://docs.aws.amazon.com/whitepapers/latest/best-practices-deploying-amazon-workspaces/ad-connector-role-with-workspaces.html?utm_source=chatgpt.com "The Role of the AWS AD Connector with Amazon WorkSpaces - Best Practices for Deploying WorkSpaces"
