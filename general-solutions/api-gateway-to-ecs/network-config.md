VPC (10.0.0.0/16)
│
├── Availability Zone A (az-a)
│   ├── Public Subnet A   (e.g., 10.0.1.0/24)  ──> Internet Gateway
│   └── Private Subnet A  (e.g., 10.0.10.0/24) ──> NAT Gateway in Public A
│
└── Availability Zone B (az-b)
    ├── Public Subnet B   (e.g., 10.0.2.0/24)  ──> Internet Gateway
    └── Private Subnet B  (e.g., 10.0.20.0/24) ──> NAT Gateway in Public B