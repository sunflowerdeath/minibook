import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MinimarkContext } from 'minimark-renderer'
import Fence from 'minimark-plugin-fence/lib/Fence'
import TableOfContents from 'minimark-plugin-table-of-contents/lib/TableOfContents'
import AnchorHeading from 'minimark-plugin-table-of-contents/lib/AnchorHeading'
import PropsDoc from 'minimark-plugin-propsdoc/lib/PropsDoc'

import { useTheme } from './ThemeContext'

const MarkdownContainer = props => {
	const { markdown } = props
	const theme = useTheme()
	const containerRef = useRef()
	const history = useHistory()
	useEffect(() => {
		// make relative links use HistoryApi
		containerRef.current.addEventListener('click', event => {
			const target = event.target
			if (target.tagName === 'A') {
				const href = target.getAttribute('href')
				if (href[0] === '/') {
					event.preventDefault()
					history.push(href)
				}
			}
		})
	}, [])

	const className = `minibook__markdown minibook__markdown-theme-${theme.type}`
	return (
		<div className={className} ref={containerRef}>
			<MinimarkContext.Provider
				value={{
					theme,
					components: {
						AnchorHeading,
						TableOfContents,
						Fence,
						PropsDoc
					}
				}}
			>
				{React.createElement(markdown)}
			</MinimarkContext.Provider>
		</div>
	)
}

MarkdownContainer.propTypes = {
	markdown: PropTypes.func.isRequired
}

export default MarkdownContainer
