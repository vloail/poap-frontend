# GIWA GASOK — POAP Attendance 项目提交包

> 提交截止: 2026年7月31日
> 赛道: Consumer / Social (Track 02)
> 项目地址: https://poap-frontend.vercel.app

---

## 📋 项目概述

**POAP Attendance** — 一个在 GIWA 测试网上运行的免费出席证明 NFT 铸造 dApp。

用户只需连接钱包、输入名字，即可免费铸造一枚 ERC-721 POAP NFT。
所有元数据和图片完全在链上生成，不依赖 IPFS 或任何外部存储。

目标：成为 GIWA 生态的「链上身份证明」基础设施，
让每个活动、会议、课程都能发行唯一的出席证明。

---

## 🧩 技术架构

```
用户 ── MetaMask ── GIWA Testnet ── POAP.sol
                  (Chain 91342)     (ERC-721)
                                      │
                                  ┌───┴───┐
                              Metadata  SVG Image
                              (on-chain) (on-chain)
```

### 智能合约 (`src/POAP.sol`)
- **标准**: ERC-721 + URIStorage (OpenZeppelin v5 审计通过的模板)
- **链上元数据**: metadata JSON 和 SVG 图片全部 base64 编码嵌入链上
  - ✅ 无需 IPFS / Arweave
  - ✅ 永久可用，永不丢失
  - ✅ 零依赖外部服务
- **每人限制**: 每个地址限 mint 一次
- **批量空投**: owner 可批量发放 (适合活动主办方)
- **事件**: `POAPMinted(tokenId, attendee, name)` 方便前端监听

### 前端 (`poap-frontend/`)
- **框架**: Vite + React + TypeScript
- **链交互**: wagmi + viem (最前沿的 web3 React 库)
- **钱包**: 原生 MetaMask 集成，自动切换到 GIWA Testnet
- **样式**: Tailwind CSS 暗色主题

### 测试
- **Foundry 测试**: 8 个测试用例全部通过
  - 基本 Mint ✓
  - 重复 Mint 拒绝 ✓
  - 空名字拒绝 ✓
  - 多人 Mint ✓
  - 批量空投 ✓
  - 权限控制 ✓
  - TokenURI 输出 ✓

---

## 🎯 GIWA 链适配性

> **为什么选择 GIWA？**

1. **低 gas 成本** — POAP 的核心场景是免费/极低成本铸造，GIWA 测试网零 gas 门槛完美匹配
2. **韩国市场** — GIWA × Upbit 的战略定位，POAP 天然适合韩国线下活动、会议、教育场景
3. **钱包嵌入潜力** — POAP 作为轻量级身份证明，可以无缝嵌入 GIWA Wallet 作为活动参与记录
4. **Phase 1 已验证** — 合约和 dApp 已在测试网跑通，8 个测试覆盖全部核心路径

---

## 🔥 独创性

链上 NFT + 出席证明本身不新，但 **全链上元数据 + 零成本铸造 + 名字存储在合约中可查询** 的组合是独特卖点：

| 特性 | POAP Attendance | 传统 POAP (poap.xyz) |
|------|----------------|---------------------|
| 元数据存储 | 链上 (data URI) | IPFS |
| 图片存储 | 链上 SVG | IPFS/中心化 |
| 名字链上可查 | ✅ 合约内 mapping | ❌ 仅 off-chain |
| 铸造费用 | 零 gas / 极低 | 需支付 mint 费 |
| 部署 | Foundry 已验证 | 合约不开源 |

---

## 💰 市场规模

- 全球活动 NFT 市场 (2024): ~$2.1B
- POAP.xyz 累计铸造: >1000 万枚
- 韩国 Web3 活动市场: KBW, Korea Blockchain Week, BUIDL Asia 等大型活动每年数十场
- GIWA 链的韩国本土优势竞争壁垒

---

## 🛠 使用场景

1. **活动签到** — 线下会议、Meetup、黑客松的出席证明
2. **教育认证** — 完成课程/研讨会的链上证明
3. **社区贡献** — DAO 贡献者的参与记录
4. **粉丝互动** — KOL 直播/线下见面的参与凭证
5. **GIWA Wallet 内嵌** — 用户的链上活动履历

---

## 📈 路线图

| 阶段 | 时间 | 目标 |
|------|------|------|
| MVP完成 | ✅ 2026.07 | 合约测试网部署 + dApp 上线 |
| Phase 1 & 2 提交 | 2026.07.31 | GASOK 申请提交 |
| 用户增长 | 2026.08-09 | 在韩国活动推广，目标 500 次 Mint |
| 主办方工具 | 2026.09 | 活动创建仪表盘、批量空投 UI |
| GIWA 主网 | 2026 Q4 | 随 GIWA 主网上线迁移 |
| 钱包集成 | 2026 Q4 | 嵌入 GIWA Wallet |

---

## 👤 团队

**个人开发者** — 全栈工程师

- Solidity / Foundry 智能合约开发
- React / TypeScript 前端开发
- Web3 全栈 dApp 构建经验
- 已有 ERC-8257 AI Agent Tool 部署经验 (Base 主网)

---

## 🚀 快速启动

```bash
# 合约
cd poap-attendance
forge build
forge test

# 部署 (需要 GIWA 测试网私钥)
forge script script/DeployPOAP.s.sol --rpc-url giwa --broadcast

# 前端
cd poap-frontend
npm install
npm run dev
```

---

## 🔗 相关链接

- GIWA GASOK: https://giwa.io/gasok
- GIWA Testnet Explorer: https://sepolia-explorer.giwa.io
- 项目代码: `~/poap-attendance` + `~/poap-frontend`
