import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import floral from 'floral'
import { MinimarkContext } from 'minimark-renderer'
import Fence from 'minimark-plugin-fence/lib/Fence'
import TableOfContents from 'minimark-plugin-table-of-contents/lib/TableOfContents'
import AnchorHeading from 'minimark-plugin-table-of-contents/lib/AnchorHeading'

/*
<MinimarkContext.Provider
    value={{ AnchorHeading, TableOfContents, Fence }}
>
</MinimarkContext.Provider>
*/

import { StoryPropType, SectionPropType } from './propTypes'

@withRouter
@floral
class Story extends Component {
	static propTypes = {
		section: SectionPropType.isRequired,
		story: StoryPropType.isRequired,
		history: PropTypes.object.isRequired
	}

	static styles = props => ({
		root: {
			display: props.story.src ? 'flex' : 'block',
			flexDirection: 'column',
			height: '100%'
		},
		container: {
			maxWidth: 800,
			margin: '0 auto',
			padding: 20
		},
		header: {
			borderBottom: '1px solid #eee'
		},
		title: {
			fontSize: '32px',
			fontWeight: 'bold'
		},
		description: {
			marginTop: 10
		},
		frame: {
			width: '100%',
			border: 'none',
			flexGrow: 1
		}
	})

	componentDidMount() {
		if (!this.containerRef) return

		// make relative links use HistoryApi
		this.containerRef.addEventListener('click', event => {
			const target = event.target
			if (
				target.tagName === 'A' &&
				target.dataset.useHistoryApi === '1'
			) {
				const href = target.getAttribute('href')
				if (href[0] === '/') {
					event.preventDefault()
					this.props.history.push(href)
				}
			}
		})
	}

	render() {
		const { section, story } = this.props
		const { component } = section
		const { description, props, render, src } = story

		return (
			<div style={this.styles.root}>
				<div style={this.styles.header}>
					<div style={this.styles.container}>
						<div style={this.styles.title}>
							{section.name} / {story.name}
						</div>
						{description && (
							<div style={this.styles.description}>
								{description}
							</div>
						)}
					</div>
				</div>
				{src ? (
					<iframe style={this.styles.frame} src={src} title="story" />
				) : (
					<div
						style={this.styles.content}
						className="minibook__story"
					>
						<div
							style={this.styles.container}
							ref={ref => {
								this.containerRef = ref
							}}
						>
							{render
								? render(component, props)
								: React.createElement(component, props)}
						</div>
					</div>
				)}
			</div>
		)
	}
}

export default Story
