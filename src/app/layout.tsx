import Chat from '@/app/components/Chat'
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'BookFarm',
	description: 'An online book store with a kick-ass chatbot!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<Providers>
				<body className={inter.className}>
					<Chat />
					{children}
				</body>
			</Providers>
		</html>
	)
}
