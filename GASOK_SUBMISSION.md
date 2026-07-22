# GIWA GASOK — POAP Attendance Submission

**Submission Deadline:** July 31, 2026

**Track:** Consumer / Social (Track 02)

**Live Demo:** https://poap-frontend.vercel.app

---

# 📋 Project Overview

**POAP Attendance** is a free Proof of Attendance NFT minting dApp built on the GIWA Testnet.

Users simply connect their wallet, enter their name, and mint a unique ERC-721 POAP NFT.

All metadata and artwork are generated entirely on-chain without relying on IPFS, Arweave, or any centralized storage.

Our vision is to become the on-chain attendance infrastructure of the GIWA ecosystem, enabling conferences, hackathons, meetups, educational programs, and community events to issue permanent attendance credentials.

---

# 🧩 Architecture

```
User
   │
MetaMask Wallet
   │
GIWA Testnet (Chain ID: 91342)
   │
POAP.sol (ERC-721)
   │
├── On-chain Metadata
└── On-chain SVG Image
```

---

# 📜 Smart Contract

**Standard**

- OpenZeppelin ERC-721
- ERC-721 URI Storage

**Features**

- 100% On-chain Metadata
- Fully On-chain SVG Artwork
- Base64 Encoded Metadata
- No IPFS
- No Arweave
- No External Storage
- Permanent NFT Assets
- One Mint Per Wallet
- Batch Airdrop Support
- Event Emission

```solidity
event POAPMinted(
    uint256 tokenId,
    address attendee,
    string name
);
```

---

# 💻 Frontend

- React
- Vite
- TypeScript
- wagmi
- viem
- Tailwind CSS
- MetaMask Integration
- Automatic GIWA Network Switching

---

# ✅ Testing

All Foundry test suites passed.

- Mint NFT
- Prevent Duplicate Mint
- Reject Empty Name
- Multiple Users
- Batch Airdrop
- Access Control
- TokenURI Generation
- Metadata Validation

---

# 🎯 Why GIWA?

### Low Transaction Fees

POAPs are designed to be free or extremely inexpensive to mint.

GIWA's low-cost infrastructure makes it an ideal environment for large-scale attendance NFTs.

### Korean Web3 Ecosystem

GIWA's ecosystem is well positioned for conferences, hackathons, universities, and community events throughout Korea.

### Wallet Integration

POAP Attendance can naturally evolve into an activity history module inside the GIWA Wallet.

### Proven MVP

The smart contract and dApp have already been deployed and tested on the GIWA Testnet.

---

# 🔥 Innovation

While attendance NFTs already exist, POAP Attendance introduces several improvements.

| Feature | POAP Attendance | Traditional POAP |
|----------|-----------------|------------------|
| Metadata | Fully On-chain | IPFS |
| Artwork | On-chain SVG | IPFS |
| Name Storage | On-chain | Off-chain |
| External Storage | None | Required |
| Gas Cost | Near Zero | Higher |
| Open Source | Yes | Limited |

---

# 📈 Market Opportunity

- Global Event NFT Market: ~$2.1B
- POAP NFTs Minted Worldwide: 10M+
- Strong demand from conferences, hackathons, DAOs, universities, and Web3 communities
- Excellent fit for Korea's growing blockchain ecosystem

---

# 🛠 Use Cases

- Conference Attendance
- Meetups
- Hackathons
- Educational Certificates
- DAO Contributor Records
- Community Achievements
- KOL Fan Events
- GIWA Wallet Activity History

---

# 🗺 Roadmap

| Phase | Timeline | Goal |
|--------|----------|------|
| MVP | Jul 2026 | Smart Contract + Testnet Deployment |
| GASOK Submission | Jul 2026 | Builder Program |
| Growth | Aug–Sep 2026 | 500+ POAP Mints |
| Organizer Dashboard | Sep 2026 | Event Creation & Batch Distribution |
| Mainnet | Q4 2026 | Deploy on GIWA Mainnet |
| Wallet Integration | Q4 2026 | GIWA Wallet Support |

---

# 👤 Team

Independent Full-Stack Web3 Builder

### Expertise

- Solidity
- Foundry
- React
- TypeScript
- Smart Contract Development
- Web3 Frontend Engineering
- EVM Infrastructure

### Previous Experience

- ERC-8257 AI Agent Tool Deployment
- Base Mainnet Smart Contract Development

---

# 🚀 Quick Start

## Smart Contract

```bash
cd poap-attendance

forge build

forge test
```

Deploy:

```bash
forge script script/DeployPOAP.s.sol \
--rpc-url giwa \
--broadcast
```

---

## Frontend

```bash
cd poap-frontend

npm install

npm run dev
```

---

# 🔗 Links

### Live Demo

https://poap-frontend.vercel.app

### GIWA GASOK

https://giwa.io/gasok

### GIWA Testnet Explorer

https://sepolia-explorer.giwa.io

### Repository

- Smart Contract
- Frontend

![Solidity](https://img.shields.io/badge/Solidity-0.8.x-black)
![Foundry](https://img.shields.io/badge/Built%20With-Foundry-orange)
![React](https://img.shields.io/badge/React-19-blue)
![License](https://img.shields.io/badge/License-MIT-green)
