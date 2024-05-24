import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@rainbow-me/rainbowkit/styles.css'
import useCheckNftOwnership from './hooks/useCheckNftOwnership'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import {
	arbitrum,
	base,
	mainnet,
	optimism,
	polygon,
	sepolia,
} from 'wagmi/chains'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'

const config = getDefaultConfig({
	appName: 'thePolacy DRAW',
	projectId: 'YOUR_PROJECT_ID',
	chains: [
		mainnet,
		polygon,
		optimism,
		arbitrum,
		base,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
	],
	ssr: true,
})

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	
	<React.StrictMode>
		<WagmiProvider config={config}>
			
							<App />
			
		</WagmiProvider>
	</React.StrictMode>,
)
