'use client'

import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, HTMLAttributes, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

export default function ChatInput({ className, ...props }: ChatInputProps) {
	const [input, setInput] = useState<string>('')

	const { mutate: sendMessage, isLoading } = useMutation({
		mutationFn: async () => {
			const res = await fetch('/api/message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ messages: 'hello' }),
			})

			return res.body
		},
		onSuccess: () => {
			console.log('success')
		},
	})

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value)
	}

	return (
		<div {...props} className={cn('border-t border-zinc-300', className)}>
			<div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
				<TextareaAutosize
					rows={2}
					maxRows={4}
					autoFocus
					value={input}
					onChange={handleChange}
					placeholder='Write a message...'
					className='peer block w-full resize-none border-0 bg-zinc-100 py-1.5 pr-14 text-sm text-gray-900 focus:ring-0 disabled:opacity-50 sm:leading-6'
				/>
			</div>
		</div>
	)
}
