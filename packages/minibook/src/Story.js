import React, { Component } from 'react'
import floral from 'floral'

import { StoryPropType, SectionPropType } from './propTypes'

@floral
class Story extends Component {
	static propTypes = {
		section: SectionPropType.isRequired,
		story: StoryPropType.isRequired
	}

	static styles = {
		root: {
			display: 'flex',
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
		name: {
			fontSize: '24px',
			fontWeight: 'bold',
			marginBottom: 10
		},
		content: {
			overflow: 'auto',
			flexGrow: 1,
			lineHeight: '1.25em'
		},
		frame: {
			width: '100%',
			border: 'none',
			flexGrow: 1
		}
	}

	render() {
		const { section, story } = this.props
		const { component } = section
		const { description, props, render, src } = story

		return (
			<div style={this.styles.root}>
				<div style={this.styles.header}>
					<div style={this.styles.container}>
						<div style={this.styles.name}>
							{section.name} / {story.name}
						</div>
						<div style={this.styles.description}>{description}</div>
					</div>
				</div>
				{src ? (
					<iframe style={this.styles.frame} src={src} title="story" />
				) : (
					<div style={this.styles.content}>
						<div style={this.styles.container}>
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
