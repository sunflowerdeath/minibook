import React, { Component } from 'react'
import PropTypes from 'prop-types'
import floral from 'floral'

import Section from './Section'
import { SectionPropType } from '../propTypes'

@floral
class Nav extends Component {
	static propTypes = {
		title: PropTypes.string,
		sections: PropTypes.objectOf(SectionPropType).isRequired,
		currentSection: PropTypes.string.isRequired,
		smallScreen: PropTypes.bool.isRequired
	}

	static styles = {
		root: {
			padding: '20px 0',
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
		const { title, sections, currentSection, smallScreen } = this.props
		const sectionsElems = Object.entries(sections).map(([key, section]) => (
			<Section
				key={key}
				sectionKey={key}
				section={section}
				initialIsOpened={currentSection === key}
				smallScreen={smallScreen}
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

export default Nav
