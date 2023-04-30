'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

type ProviderProps = {
	children: ReactNode
}

export default function Providers({ children }: ProviderProps) {
	const queryClient = new QueryClient()
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}