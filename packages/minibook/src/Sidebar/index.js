import React, { Component } from 'react'
import floral from 'floral'

import Section from './Section'

@floral
class Sidebar extends Component {
	static styles = {
		root: {
			width: 200,
			borderRight: '1px solid #eee',
			boxSizing: 'border-box',
			padding: '20px 0',
			flexShrink: 0,
			overflow: 'auto'
		},
		title: {
			fontSize: '24px',
			fontWeight: 'bold',
			marginBottom: 20,
			paddingLeft: 15
		}
	}

	render() {
		const { title, sections, currentSection } = this.props
		const sectionsElems = Object.entries(sections).map(([key, section]) => (
			<Section
				key={key}
				sectionKey={key}
				section={section}
				initialIsOpened={currentSection === key}
			/>
		))
		return (
			<div style={this.styles.root}>
				{title && <div style={this.styles.title}>{title}</div>}
				{sectionsElems}
			</div>
		)
	}
}

export default Sidebar
