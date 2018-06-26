import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { MinimarkContext } from 'minimark-renderer'
import Fence from 'minimark-plugin-fence/lib/Fence'
import TableOfContents from 'minimark-plugin-table-of-contents/lib/TableOfContents'
import AnchorHeading from 'minimark-plugin-table-of-contents/lib/AnchorHeading'
import PropsDoc from 'minimark-plugin-propsdoc/lib/PropsDoc'

@withRouter
class MarkdownContainer extends Component {
	static propTypes = {
		markdown: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired
	}

	componentDidMount() {
		// make relative links use HistoryApi
		this.containerRef.addEventListener('click', event => {
			const target = event.target
			if (target.tagName === 'A') {
				const href = target.getAttribute('href')
				if (href[0] === '/') {
					event.preventDefault()
					this.props.history.push(href)
				}
			}
		})
	}

	render() {
		const { markdown } = this.props
		return (
			<div
				className="minibook__markdown"
				ref={ref => {
					this.containerRef = ref
				}}
			>
				<MinimarkContext.Provider
					value={{
						AnchorHeading,
						TableOfContents,
						Fence,
						PropsDoc
					}}
				>
					{React.createElement(markdown)}
				</MinimarkContext.Provider>
			</div>
		)
	}
}

export default MarkdownContainer
