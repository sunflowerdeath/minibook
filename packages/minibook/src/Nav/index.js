import React, { Component } from 'react'
import PropTypes from 'prop-types'
import floral from 'floral'

import Section from './Section'
import { SectionPropType } from '../propTypes'

const styles = {
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

@floral(styles)
class Nav extends Component {
	static propTypes = {
		title: PropTypes.string,
		sections: PropTypes.objectOf(SectionPropType).isRequired,
		currentSection: PropTypes.string.isRequired,
		smallScreen: PropTypes.bool.isRequired
	}

	state = {}

	render() {
		const { title, sections, currentSection, smallScreen } = this.props
		const { computedStyles } = this.state

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
			<div style={computedStyles.root}>
				{title && <div style={computedStyles.title}>{title}</div>}
				{sectionsElems}
			</div>
		)
	}
}

export default Nav
