import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useStyles } from 'floral'

import NavItem from './NavItem'
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

const Nav = forwardRef((props, ref) => {
	const { title, items, currentSection, smallScreen } = props
	const computedStyles = useStyles(styles, [props])

	const sectionsElems = Object.entries(items).map(([key, item]) => (
		<NavItem
			key={key}
			itemKey={key}
			item={item}
			initialIsOpened={currentSection === key}
			smallScreen={smallScreen}
		/>
	))

	return (
		<div style={computedStyles.root} ref={ref}>
			{title && <div style={computedStyles.title}>{title}</div>}
			{sectionsElems}
		</div>
	)
})

Nav.displayName = 'Nav'

Nav.propTypes = {
	title: PropTypes.string,
	items: PropTypes.objectOf(SectionPropType).isRequired,
	currentSection: PropTypes.string.isRequired,
	smallScreen: PropTypes.bool.isRequired
}

export default Nav
