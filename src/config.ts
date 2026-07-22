import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { QueryClient } from '@tanstack/react-query'

// GIWA Testnet
export const giwaTestnet = {
  id: 91_342,
  name: 'GIWA Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'GIWA',
    symbol: 'GIWA',
  },
  rpcUrls: {
    default: { http: ['https://sepolia-rpc.giwa.io'] },
  },
  blockExplorers: {
    default: { name: 'GIWA Explorer', url: 'https://sepolia-explorer.giwa.io' },
  },
  testnet: true,
} as const

// Your deployed contract address — update after deployment
export const POAP_CONTRACT_ADDRESS = '0x8Cd7207d60D236F2b71c7AD677fcd45053Da0d1c'

// POAP ABI (minimal — only what the frontend needs)
export const POAP_ABI = [
  {
    type: 'function',
    name: 'mintPOAP',
    inputs: [{ name: 'name', type: 'string', internalType: 'string' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'hasMinted',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'attendeeNames',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenURI',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'POAPMinted',
    inputs: [
      { name: 'tokenId', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'attendee', type: 'address', indexed: true, internalType: 'address' },
      { name: 'name', type: 'string', indexed: false, internalType: 'string' },
    ],
    anonymous: false,
  },
] as const

export const config = createConfig({
  chains: [giwaTestnet],
  connectors: [injected()],
  transports: {
    [giwaTestnet.id]: http(),
  },
})

export const queryClient = new QueryClient()
