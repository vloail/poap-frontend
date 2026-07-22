import { useReadContract } from 'wagmi'
import { useAccount } from 'wagmi'
import { POAP_CONTRACT_ADDRESS, POAP_ABI, giwaTestnet } from '../config'

export function AttendeesList() {
  const { isConnected } = useAccount()

  const { data: totalSupply } = useReadContract({
    address: POAP_CONTRACT_ADDRESS,
    abi: POAP_ABI,
    functionName: 'totalSupply',
    query: { refetchInterval: 10_000 },
  })

  const supply = Number(totalSupply || 0)

  if (!isConnected) return null

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">参与者</h3>
        <span className="px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-sm border border-yellow-400/20">
          总计: {supply}
        </span>
      </div>

      {supply === 0 ? (
        <p className="text-gray-400 text-center py-4">还没有人铸造 POAP，成为第一个吧！</p>
      ) : (
        <div className="space-y-2">
          {Array.from({ length: Math.min(supply, 20) }, (_, i) => {
            const tokenId = supply - i // show newest first
            return <AttendeeRow key={tokenId} tokenId={tokenId} />
          })}
          {supply > 20 && (
            <p className="text-gray-500 text-center text-sm pt-2">
              ...及另外 {supply - 20} 名参与者
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function AttendeeRow({ tokenId }: { tokenId: number }) {
  const { data: name } = useReadContract({
    address: POAP_CONTRACT_ADDRESS,
    abi: POAP_ABI,
    functionName: 'attendeeNames',
    args: [BigInt(tokenId)],
  })

  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
      <span className="text-gray-500 text-sm w-8">#{tokenId}</span>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm font-bold">
        {name?.charAt(0) || '?'}
      </div>
      <span className="text-white flex-1">{name || '加载中...'}</span>
      <a
        href={`${giwaTestnet.blockExplorers.default.url}/token/${POAP_CONTRACT_ADDRESS}?a=${tokenId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-yellow-400 transition-colors text-sm"
      >
        查看 ↗
      </a>
    </div>
  )
}
