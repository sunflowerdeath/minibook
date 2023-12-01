import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { MinimarkContext } from 'minimark-renderer'

import { useTheme } from './ThemeContext'

interface MarkdownContainerProps {
	markdown: React.ComponentType
}

const MarkdownContainer = (props: MarkdownContainerProps) => {
	const { markdown } = props
	const theme = useTheme()

	/*
	const containerRef = useRef()
	const history = useHistory()
	useEffect(() => {
		// make relative links use HistoryApi
		containerRef.current.addEventListener('click', event => {
			const target = event.target
			if (target.tagName === 'A') {
				const target = target.getAttribute('target')
				const href = target.getAttribute('href')
				if (target === null && href[0] === '/') {
					event.preventDefault()
					history.push(href)
				}
			}
		})
	}, [])
    */

	const className = `minibook__markdown minibook__markdown-theme-${theme.kind}`
	return (
		<div className={className}>
			<MinimarkContext.Provider value={{ theme }}>
				{React.createElement(markdown)}
			</MinimarkContext.Provider>
		</div>
	)
}

export default MarkdownContainer
