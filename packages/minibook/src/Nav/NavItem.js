import React, { useState } from 'react'
import raw from 'raw.macro'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Taply from 'taply'
import { useStyles } from 'floral'

import { SectionPropType } from '../propTypes'
import { useTheme } from '../ThemeContext'

const arrowIconSvg = raw('./arrow.svg')

const styles = ({ smallScreen }, isOpened, theme) => ({
	title: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 10,
		paddingLeft: 16,
		cursor: 'pointer',
		userSelect: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		outline: 'none',
		borderRadius: 5,
	},
	arrow: {
		width: 24,
		height: 24,
		transform: isOpened ? 'rotate(180deg)' : 'none',
		fill: theme.text,
	},
	link: {
		display: 'block',
		textDecoration: 'none',
		paddingTop: smallScreen ? 8 : 4,
		paddingBottom: smallScreen ? 8 : 4,
		paddingLeft: 16,
		paddingRight: 10,
		fontSize: 16,
		color: theme.secondary,
		userSelect: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		outline: 'none',
		borderRadius: 5,
	},
	isHovered: {
		background: theme.highlight,
	},
	isActive: {
		color: theme.link,
	},
})

const renderTitle = ({ item, computedStyles, setIsOpened }) => (
	<Taply onTap={() => setIsOpened((val) => !val)}>
		{(tapState) => (
			<div
				style={{
					...computedStyles.title,
					...(tapState.isHovered || tapState.isFocused
						? computedStyles.isHovered
						: {}),
				}}
			>
				{item.name}
				<div
					style={computedStyles.arrow}
					dangerouslySetInnerHTML={{ __html: arrowIconSvg }}
				/>
			</div>
		)}
	</Taply>
)

const renderLink = ({ baseUrl, itemKey, item, computedStyles }) => (
	<Taply key={itemKey}>
		{(tapState) => (
			<NavLink
				to={`${baseUrl}/${itemKey}`}
				style={{
					...computedStyles.link,
					...(tapState.isHovered || tapState.isFocused
						? computedStyles.isHovered
						: {}),
				}}
				activeStyle={computedStyles.isActive}
			>
				{item.name}
			</NavLink>
		)}
	</Taply>
)

const NavItem = (props) => {
	const { baseUrl = '', item, itemKey, initialIsOpened } = props
	const [isOpened, setIsOpened] = useState(initialIsOpened)
	const theme = useTheme()
	const computedStyles = useStyles(styles, [props, isOpened, theme])

	if (item.items) {
		const newBaseUrl = baseUrl + '/' + itemKey
		const links =
			isOpened &&
			Object.entries(item.items).map(([itemKey, item]) => (
				<NavItem item={item} itemKey={itemKey} baseUrl={newBaseUrl} />
			))
		return (
			<div key={itemKey} style={computedStyles.root}>
				{renderTitle({ item, computedStyles, setIsOpened })}
				{links}
			</div>
		)
	} else {
		return renderLink({ baseUrl, itemKey, item, computedStyles })
	}
}

NavItem.propTypes = {
	initialIsOpened: PropTypes.bool,
	item: SectionPropType.isRequired,
	itemKey: PropTypes.string.isRequired,
}

export default NavItem
