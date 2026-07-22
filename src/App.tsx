import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { config, queryClient } from './config'
import { POAPMinter } from './components/POAPMinter'
import { Header } from './components/Header'
import { AttendeesList } from './components/AttendeesList'

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-2xl">
            <POAPMinter />
            <AttendeesList />
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
