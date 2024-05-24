import { Tldraw, track, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import { useYjsStore } from './useYjsStore'
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'
import useCheckNftOwnership from './hooks/useCheckNftOwnership'
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
import { ConnectButton, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'

const config = getDefaultConfig({
	appName: 'thePaint',
	projectId: 'YOUR_PROJECT_ID',
	chains: [
		mainnet,
		polygon,
		optimism,
		arbitrum,
		base,
		...(process.env.VITE_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
	],
	ssr: true,
})

const client = new QueryClient()
let CONTRACT_ADDRESS = '0x99903e8eC87b9987bD6289DF8eff178d6E533561'

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://demos.yjs.dev'

export default function YjsExample() {

	const hasNFT = useCheckNftOwnership(CONTRACT_ADDRESS)
	const store = useYjsStore({
		roomId: 'example17',
		hostUrl: HOST_URL,
	})

	console.log('Rendering YjsExample: hasNFT =', hasNFT);

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>
				<RainbowKitProvider>
					<div className='app-container'>
					<ConnectButton />
					{hasNFT ? (
						<div className="tldraw__editor">
							<Tldraw
								autoFocus
								store={store}
								components={{
									SharePanel: NameEditor,
								}}
							/>
						</div>
					):""}
					</div>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}

const NameEditor = track(() => {
	const editor = useEditor()

	const { color, name } = editor.user.getUserPreferences()

	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
			<input
				type="color"
				value={color}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						color: e.currentTarget.value,
					})
				}}
			/>
			<input
				value={name}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						name: e.currentTarget.value,
					})
				}}
			/>
		</div>
	)
})
