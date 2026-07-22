import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { POAP_CONTRACT_ADDRESS, POAP_ABI, giwaTestnet } from '../config'

export function POAPMinter() {
  const { address, isConnected, chain } = useAccount()
  const [name, setName] = useState('')
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)

  const { data: hasMinted, refetch: refetchMinted } = useReadContract({
    address: POAP_CONTRACT_ADDRESS,
    abi: POAP_ABI,
    functionName: 'hasMinted',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const { writeContract, isPending: isWritePending, error: writeError } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash,
      query: { enabled: !!txHash },
    })

  const handleMint = () => {
    if (!name.trim()) return
    writeContract(
      {
        address: POAP_CONTRACT_ADDRESS,
        abi: POAP_ABI,
        functionName: 'mintPOAP',
        args: [name.trim()],
      },
      {
        onSuccess: (hash) => {
          setTxHash(hash)
        },
      }
    )
  }

  useEffect(() => {
    if (isConfirmed) {
      refetchMinted()
      setName('')
    }
  }, [isConfirmed, refetchMinted])

  const needsNetwork = chain?.id !== giwaTestnet.id
  const isDisabled = !isConnected || needsNetwork || hasMinted || isWritePending || isConfirming
  const buttonText = getButtonText(isConnected, needsNetwork, hasMinted, isWritePending, isConfirming, isConfirmed)

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-6">
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/30">
          <span className="text-4xl">🏅</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">免费领取你的 POAP</h2>
        <p className="text-gray-400">输入名字，即刻铸造你的出席证明 NFT</p>
      </div>

      {!isConnected && (
        <div className="text-center text-gray-400 py-4">
          请先连接钱包以铸造 POAP
        </div>
      )}

      {isConnected && needsNetwork && (
        <div className="text-center text-yellow-400 bg-yellow-400/10 rounded-lg p-3 mb-4">
          请在 MetaMask 中切换到 GIWA Testnet (Chain ID: 91342)
        </div>
      )}

      {isConnected && !needsNetwork && (
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入你的名字..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-lg"
            disabled={hasMinted || isWritePending || isConfirming}
            maxLength={50}
          />

          <button
            onClick={handleMint}
            disabled={isDisabled || !name.trim()}
            className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold text-lg rounded-xl
              hover:from-yellow-300 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400
              disabled:cursor-not-allowed transition-all shadow-lg shadow-yellow-500/25
              active:scale-[0.98]"
          >
            {buttonText}
          </button>

          {writeError && (
            <div className="text-red-400 text-sm bg-red-400/10 rounded-lg p-3">
              {writeError.message?.includes('already minted')
                ? '你已铸造过 POAP，每人限领一次'
                : `交易失败: ${writeError.message?.slice(0, 100) || '请重试'}`}
            </div>
          )}

          {isConfirmed && (
            <div className="text-green-400 text-center bg-green-400/10 rounded-lg p-3 animate-pulse">
              🎉 POAP 铸造成功！
            </div>
          )}

          {txHash && (
            <div className="text-center">
              <a
                href={`${giwaTestnet.blockExplorers.default.url}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 text-sm hover:underline"
              >
                在区块浏览器中查看 →
              </a>
            </div>
          )}
        </div>
      )}

      {hasMinted && (
        <div className="text-center text-green-400 bg-green-400/10 rounded-lg p-4">
          ✅ 你已成功领取了 POAP！
        </div>
      )}
    </div>
  )
}

function getButtonText(
  connected: boolean,
  needsNetwork: boolean,
  hasMinted: boolean | undefined,
  writing: boolean,
  confirming: boolean,
  confirmed: boolean
): string {
  if (!connected) return '连接钱包'
  if (needsNetwork) return '切换网络'
  if (hasMinted) return '已领取 ✅'
  if (writing) return '确认交易...'
  if (confirming) return '铸造中... ⏳'
  if (confirmed) return '铸造成功! 🎉'
  return '✨ Mint POAP'
}
