import React, { useRef, useEffect } from 'react'
// import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import {
	MinimarkComponentsContext,
	MinimarkThemeContext
} from 'minimark-renderer'
import Fence from 'minimark-plugin-fence/lib/Fence'
import TableOfContents from 'minimark-plugin-table-of-contents/lib/TableOfContents'
import AnchorHeading from 'minimark-plugin-table-of-contents/lib/AnchorHeading'
import PropsDoc from 'minimark-plugin-propsdoc/lib/PropsDoc'

import { useTheme } from './ThemeContext'

const MarkdownContainer = props => {
	const { markdown } = props
	const theme = useTheme()
	const containerRef = useRef()

	// const history = useHistory()
	useEffect(() => {
		// make relative links use HistoryApi
		containerRef.current.addEventListener('click', event => {
			const target = event.target
			if (target.tagName === 'A') {
				const href = target.getAttribute('href')
				if (href[0] === '/') {
					event.preventDefault()
					// history.push(href)
				}
			}
		})
	}, [])

	const className = `minibook__markdown minibook__markdown-theme-${theme.type}`
	return (
		<div className={className} ref={containerRef}>
			<MinimarkThemeContext.Provider value={theme}>
				<MinimarkComponentsContext.Provider
					value={{
						AnchorHeading,
						TableOfContents,
						Fence,
						PropsDoc
					}}
				>
					{React.createElement(markdown)}
				</MinimarkComponentsContext.Provider>
			</MinimarkThemeContext.Provider>
		</div>
	)
}

MarkdownContainer.propTypes = {
	markdown: PropTypes.func.isRequired
}

export default MarkdownContainer
