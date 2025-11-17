# Practice Test 3 - Atempt 2
## Question 1
A startup is building a serverless microservices architecture where client applications (web and mobile) authenticate users via a third-party OIDC-compliant identity provider. The backend APIs must validate JSON Web Tokens (JWTs) issued by this provider, enforce scope-based access control, and be cost-effective with minimal latency. The development team wants to use a fully managed service that supports JWT validation natively, without writing custom authentication logic.

Which solution should the team implement to meet these requirements?

1. Use Amazon API Gateway REST API with a Lambda function that manually validates JWT tokens
2. Use Amazon API Gateway HTTP API with a native JWT authorizer configured to validate tokens from the OIDC provider
3. Use Amazon API Gateway WebSocket API with JWT claims validated by a Lambda authorizer
4. Deploy a gRPC backend on Amazon ECS Fargate and expose it through AWS App Runner, handling JWT validation inside the containerized services

__Answer__
2. Use Amazon API Gateway HTTP API with a native JWT authorizer configured to validate tokens from the OIDC provider

__Explanation__  
* Amazon API Gateway HTTP API supports native JWT authorizers, allowing automatic validation of JWTs issued by an OIDC-compliant identity provider.
* This removes the need to write custom authentication logic in Lambda or backend services.
* It's also cost-effective and has lower latency compared to REST API, making it ideal for serverless microservices.
* Other options involve manual JWT validation or unnecessary infrastructure, making them less efficient and more costly:
  - Option 1 and 3 require custom logic in Lambda.
  - Option 4 introduces more complexity and manual JWT handling inside Docker containers.

Therefore, option 2 best meets the requirements for native support, scope-based access control, minimal latency, and low cost.
