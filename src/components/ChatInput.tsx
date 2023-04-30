'use client'

import { cn } from '@/lib/utils'
import { nanoid } from 'nanoid'
import { useMutation } from '@tanstack/react-query'
import { HTMLAttributes, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Message } from '@/lib/validators/message'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

export default function ChatInput({ className, ...props }: ChatInputProps) {
	const [input, setInput] = useState<string>('')

	const { mutate: sendMessage, isLoading } = useMutation({
		mutationFn: async (message: Message) => {
			const response = await fetch('/api/message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ messages: [message] }),
			})

			return response.body
		},
		onSuccess: async stream => {
			if (!stream) throw new Error('Stream is undefined')

			const reader = stream.getReader()
			const decoder = new TextDecoder()
			let done = false

			while (!done) {
				const { value, done: doneReading } = await reader.read()
				done = doneReading
				const chunkValue = decoder.decode(value)
				console.log(chunkValue)
			}
		},
	})

	return (
		<div {...props} className={cn('border-t border-zinc-300', className)}>
			<div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
				<TextareaAutosize
					rows={2}
					maxRows={4}
					autoFocus
					value={input}
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							const message: Message = {
								id: nanoid(),
								isUserMessage: true,
								text: input,
							}

							sendMessage(message)
						}
					}}
					onChange={e => setInput(e.target.value)}
					placeholder='Write a message...'
					className='peer block w-full resize-none border-0 bg-zinc-100 py-1.5 pr-14 text-sm text-gray-900 focus:ring-0 disabled:opacity-50 sm:leading-6'
				/>
			</div>
		</div>
	)
}