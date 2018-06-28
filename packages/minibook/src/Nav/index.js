import React from 'react'
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

const Nav = floral(styles)(props => {
	const {
		title,
		sections,
		currentSection,
		smallScreen,
		computedStyles
	} = props
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
})

Nav.propTypes = {
	title: PropTypes.string,
	sections: PropTypes.objectOf(SectionPropType).isRequired,
	currentSection: PropTypes.string.isRequired,
	smallScreen: PropTypes.bool.isRequired
}

export default Nav
