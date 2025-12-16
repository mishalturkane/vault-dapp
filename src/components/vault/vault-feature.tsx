'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import { useVaultProgram } from './vault-data-access'
import { 
  VaultInitialize, 
  VaultDeposit, 
  VaultWithdraw, 
  VaultClose, 
  VaultDashboard,
  VaultProgramInfo 
} from './vault-ui'

import { ellipsify } from '@/lib/utils'

export default function VaultFeature() {
  const { publicKey } = useWallet()
  const { programId, getVaultAccount } = useVaultProgram()

  const hasVault = getVaultAccount.data?.vaultAccount !== null

  return publicKey ? (
    <div className="min-h-screen  dark:bg-[#0a0a0a] text-white dark:text-gray-100">
      {/* Hero Section */}
      <div className="dark:bg-[#0a0a0a] text-black dark:text-gray-100">
        <div className="container mx-auto  py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">💰 Secure Vault</h1>
            <p className="text-xl  mb-6">
              Store and manage your SOL in a secure on-chain vault
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-black/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">Program ID:</span>
                <ExplorerLink 
                  path={`account/${programId}`} 
                  label={ellipsify(programId.toString(), 24)} 
                  className="ml-2 font-mono text-black dark:text-gray-100 hover:text-white underline"
                />
              </div>
              {hasVault && (
                <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-sm">🛡️ Vault Active</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Vault Status Dashboard */}
          <VaultDashboard />

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Initialize Vault</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Create a new vault for your account. This will generate PDAs for secure storage.
              </p>
              <VaultInitialize />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Deposit SOL</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Add SOL to your vault. Your funds will be securely stored on-chain.
              </p>
              <VaultDeposit />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Withdraw SOL</h3>
              <p className="text-gray-600 mb-13 text-sm">
                Withdraw SOL from your vault back to your wallet.
              </p>
              <VaultWithdraw />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Close Vault</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Close your vault and withdraw all remaining funds. This action is irreversible.
              </p>
              <VaultClose />
            </div>
          </div>

          
        </div>
      </div>
    </div>  
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-center">
      <div className="max-w-md mx-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-200">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8 flex items-center justify-center">
            <div className="text-white text-3xl">💰</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-black mb-4">Vault DApp</h1>
          <p className="text-gray-600 mb-8">
            Connect your wallet to create and manage your secure on-chain vault
          </p>
          <div className="transform hover:scale-105 bg-black p-2 border rounded-md shadow-lg transition-transform duration-300">
            <WalletButton className="bg-black hover:from-indigo-700 hover:to-purple-700 text-red-700 font-semibold py-4 px-8 rounded-xl shadow-lg w-full text-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}