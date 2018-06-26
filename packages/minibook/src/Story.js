import React, { Component } from 'react'
import floral from 'floral'

import { StoryPropType, SectionPropType } from './propTypes'
import MarkdownContainer from './MarkdownContainer'

@floral
class Story extends Component {
	static propTypes = {
		section: SectionPropType.isRequired,
		story: StoryPropType.isRequired
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

	renderHeader() {
		const { section, story } = this.props
		const { description } = story

		return (
			<div style={this.styles.header}>
				<div style={this.styles.container}>
					<div style={this.styles.title}>
						{section.name} / {story.name}
					</div>
					{description && (
						<div style={this.styles.description}>{description}</div>
					)}
				</div>
			</div>
		)
	}

	renderContent() {
		const { section, story } = this.props
		const { component } = section
		const { props, render, src, markdown } = story

		if (src) {
			return <iframe style={this.styles.frame} src={src} title="story" />
		}

		const content = do {
			// eslint-disable-next-line no-unused-expressions
			if (markdown) <MarkdownContainer markdown={markdown} />
			else if (render) render(component, props)
			else React.createElement(component, props)
		}

		return <div style={this.styles.container}>{content}</div>
	}

	render() {
		const { story } = this.props

		return (
			<div style={this.styles.root}>
				{!story.markdown && this.renderHeader()}
				{this.renderContent()}
			</div>
		)
	}
}

export default Story
