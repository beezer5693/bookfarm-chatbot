import Link from 'next/link'
import React from 'react'

interface MarkdownLiteProps {
	text: string
}
export default function MarkdownLite({ text }: MarkdownLiteProps) {
	const linkRegex = /\[(.+?)\]\((.+?)\)/g
	const parts = []

	let lastIndex = 0
	let match

	while ((match = linkRegex.exec(text)) !== null) {
		const [fullMatch, linkText, linkUrl] = match
		const matchStart = match.index
		const matchEnd = matchStart + fullMatch.length

		if (lastIndex < matchStart) {
			parts.push(text.slice(lastIndex, matchStart))
		}

		parts.push(
			<Link
				href={linkUrl}
				key={linkUrl}
				target='_blank'
				rel='noopener noreferrer'
				className='break-words underline underline-offset-2 text-blue-600'
			>
				{linkText}
			</Link>
		)

		lastIndex = matchEnd
	}

	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex))
	}

	return (
		<>
			{parts.map((part, i) => (
				<React.Fragment key={i}>{part}</React.Fragment>
			))}
		</>
	)
}
