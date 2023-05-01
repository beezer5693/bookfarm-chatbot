'use client'

import { MessagesProvider } from '@/context/messages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

type ProviderProps = {
	children: ReactNode
}

export default function Providers({ children }: ProviderProps) {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<MessagesProvider>{children}</MessagesProvider>
		</QueryClientProvider>
	)
}
