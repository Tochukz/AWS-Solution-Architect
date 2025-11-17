# Question 1: HTTP API Native JWT Authorizer

### Description

The solution implements the answer to the question in `question-1.md`.

The question asks for the simplest method to validate token issued by an OIDC-complient provider. The solution must be cost-effective with minimal latency.  

The answer is the configure an API Gateway HTTP API with  native JWT authorizer.  
Here we configure the API Gateway HTTP API with native JWT authorizer.  

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint NativeJwtAuthorizer.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file NativeJwtAuthorizer.yaml  --stack-name NativeJwtAuthorizer
```

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name NativeJwtAuthorizer > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name NativeJwtAuthorizer
```

### Learn More
Of course. Let's break this down into two clear parts.

### 1. Full Meaning of OIDC

**OIDC** stands for **OpenID Connect**.

It is an open authentication protocol that sits on top of the **OAuth 2.0** authorization framework. While OAuth 2.0 is designed for *authorization* (giving an application permission to access your data), OIDC is specifically designed for *authentication* (proving who you are).

Think of it this way:
*   **OAuth 2.0:** "This app wants permission to read your Google Contacts. Do you allow this?" -> The app gets an **Access Token** (a key to your data).
*   **OIDC:** "This app wants to know who you are, using your Google account." -> The app gets an **ID Token** (a verifiable ID card) and often an Access Token as well.

The core innovation of OIDC is the **ID Token**. This is a JSON Web Token (JWT) that contains verifiable information (claims) about the user, such as their name, email, and profile picture.

---

### 2. OIDC Compliant Identity Provider

An **OIDC Compliant Identity Provider** (also called an **OP** or **IdP**) is a service that implements the OIDC protocol to authenticate users and provide their identity information to other applications.

In simpler terms, it's a service that you can use to "log in with..." and it follows the standard OIDC rules.

#### Key Responsibilities of an OIDC Compliant Identity Provider:

1.  **Authenticate the User:** Verify the user's credentials (e.g., password, multi-factor authentication).
2.  **Issue Tokens:** After successful authentication, provide the application with:
    *   **ID Token:** A signed JWT that contains the user's profile information.
    *   **Access Token:** (Optional) To access the user's resources from the IdP's API (e.g., their profile picture).
    *   **Refresh Token:** (Optional) To get new tokens when the old ones expire.
3.  **Provide a UserInfo Endpoint:** A standard API endpoint where the application can retrieve more detailed user information using the Access Token.
4.  **Publish its Configuration:** Make its capabilities and endpoints publicly available through a **Discovery Document** (typically at a well-known URL like `https://idp.com/.well-known/openid-configuration`). This makes it easy for applications to integrate with it.

#### Common Examples of OIDC Compliant Identity Providers:

*   **Social Logins:** Google, Microsoft Entra ID (Azure AD), Facebook, Apple, Amazon.
*   **Enterprise Identity Systems:** Okta, Ping Identity, Keycloak (open source), ForgeRock, OneLogin.
*   **Cloud Provider Services:** AWS Cognito, Google Identity Platform, Auth0.

### Analogy to Tie It All Together

Imagine a digital driver's license:

*   **OIDC** is the **government-standardized process** for issuing a secure, verifiable driver's license.
*   An **OIDC Compliant Identity Provider (like Google)** is the **Department of Motor Vehicles (DMV)**. It's the trusted authority that verifies your identity and issues the license.
*   The **ID Token** is the **digital driver's license itself**. A bouncer at a bar (the application) can scan it and trust that it's real because it was issued by the official DMV and has a secure signature.

### Summary

| Term | Full Name | Primary Purpose | Simple Analogy |
| :--- | :--- | :--- | :--- |
| **OIDC** | **OpenID Connect** | **Authentication** (Proving who you are) | The standardized process for issuing a secure ID card. |
| **OIDC Compliant Identity Provider** | (Same) | A service that performs authentication using the OIDC standard. | The trusted authority that issues the ID card (e.g., the DMV). |
