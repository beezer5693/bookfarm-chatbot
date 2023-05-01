import { Message } from '@/lib/validators/message'
import { nanoid } from 'nanoid'
import { ReactNode, createContext, useState } from 'react'

type MessageContextType = {
	messages: Message[]
	isMessageUpdating: boolean
	addMessage: (message: Message) => void
	removeMessage: (id: string) => void
	updateMessage: (id: string, updateFn: (prevText: string) => string) => void
	setIsMessageUpdating: (isUpdating: boolean) => void
}

export const MessagesContext = createContext<MessageContextType>({
	messages: [],
	isMessageUpdating: false,
	addMessage: () => {},
	removeMessage: () => {},
	updateMessage: () => {},
	setIsMessageUpdating: () => {},
})

export function MessagesProvider({ children }: { children: ReactNode }) {
	const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)
	const [messages, setMessages] = useState<Message[]>([
		{
			id: nanoid(),
			text: 'Hello, How can I help you today?',
			isUserMessage: false,
		},
	])

	const addMessage = (message: Message) => {
		setMessages(prevMessages => [...prevMessages, message])
	}

	const removeMessage = (id: string) => {
		setMessages(prevMessages => prevMessages.filter(message => message.id !== id))
	}

	const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
		setMessages(prevMessages =>
			prevMessages.map(message =>
				message.id === id
					? {
							...message,
							text: updateFn(message.text),
					  }
					: message
			)
		)
	}

	return (
		<MessagesContext.Provider
			value={{
				messages,
				isMessageUpdating,
				addMessage,
				removeMessage,
				updateMessage,
				setIsMessageUpdating,
			}}
		>
			{children}
		</MessagesContext.Provider>
	)
}
