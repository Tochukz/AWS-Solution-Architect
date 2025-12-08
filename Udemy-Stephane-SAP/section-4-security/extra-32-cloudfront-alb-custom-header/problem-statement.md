## Question
I have a cloudfront distribution in from of an Application Load Balancer.
I want to make sure only traffic from the CloudFront distribution is allowed to go to the Application Load Balancer

## Solution
To make sure **ONLY CloudFront** can reach your **Application Load Balancer (ALB)**, you have three valid options depending on your architecture.

---

# ✅ **Option 1 — Insert CloudFront-Only Header + Check in ALB (Lambda@Edge or Function URL)**

Add a custom header from CloudFront:

```
X-From-CloudFront: my-secret-value
```

Then configure ALB listener rules:

```
If header X-From-CloudFront != my-secret-value → return 403
```

---

# ✅ **Option 2 — Use CloudFront Managed Prefix List for ALB Security Group**

AWS publishes CloudFront’s IP ranges as a **Managed Prefix List**.

You can restrict your ALB security group to only accept HTTP/HTTPS traffic from CloudFront:

### **Steps**

1. Go to VPC → **Prefix Lists**
2. Find: **com.amazonaws.global.cloudfront.origin-facing**
3. Edit ALB security group:

   * Inbound rule:

     ```
     Type: HTTP/HTTPS
     Source: AWS Managed Prefix List: com.amazonaws.global.cloudfront.origin-facing
     ```

### **Result**

Only CloudFront’s IPs can hit ALB.

**Downside:**
CloudFront IP ranges are wide → anyone using CloudFront could theoretically reach your ALB.

---

# 🏆 **Best Practice Recommendation**

| Option                         | Security | Difficulty | Notes                                    |
| ------------------------------ | -------- | ---------- | ---------------------------------------- |
| Custom Header                  | ⭐⭐⭐      | Medium     | Good layer, but header can be spoofed  |
| CloudFront Prefix List         | ⭐⭐       | Easy       | Limits to CloudFront but not YOUR distro |
