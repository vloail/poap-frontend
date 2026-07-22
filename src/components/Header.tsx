import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { giwaTestnet, POAP_CONTRACT_ADDRESS } from '../config'

export function Header() {
  const { address, isConnected, chain } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })

  return (
    <header className="border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center font-bold text-lg">
            P
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">POAP Attendance</h1>
            <p className="text-gray-400 text-xs">GIWA Testnet</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {chain && (
            <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
              {chain.name || 'GIWA Testnet'}
            </span>
          )}

          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-white text-sm font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
                {balance && (
                  <p className="text-gray-400 text-xs">
                    {parseFloat(String(balance.formatted)).toFixed(4)} {balance.symbol}
                  </p>
                )}
              </div>
              <button
                onClick={() => disconnect()}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors border border-white/10 rounded-lg hover:border-white/30"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0], chainId: giwaTestnet.id })}
              className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg shadow-yellow-500/25"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
