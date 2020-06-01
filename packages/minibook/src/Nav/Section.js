import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Taply from 'taply'
import { useStyles } from 'floral'

import { SectionPropType } from '../propTypes'
import { useTheme } from '../ThemeContext'
// eslint-disable-next-line import/first
import arrowIconSvg from '!raw-loader!./arrow.svg'

const styles = ({ smallScreen }, isOpened, theme) => ({
	title: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 10,
		paddingLeft: 15,
		fontWeight: 'bold',
		cursor: 'pointer',
		textTransform: 'uppercase',
		userSelect: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		outline: 'none'
	},
	arrow: {
		width: 24,
		height: 24,
		transform: isOpened ? 'rotate(180deg)' : 'none',
		fill: theme.text
	},
	link: {
		display: 'block',
		textDecoration: 'none',
		paddingTop: smallScreen ? 8 : 4,
		paddingBottom: smallScreen ? 8 : 4,
		paddingLeft: 15,
		paddingRight: 10,
		fontSize: 15,
		color: theme.secondary,
		userSelect: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		outline: 'none'
	},
	isHovered: {
		background: theme.highlight
	},
	isActive: {
		color: theme.blue
	}
})

const renderTitle = ({ section, computedStyles, setIsOpened }) => (
	<Taply onTap={() => setIsOpened(val => !val)}>
		{tapState => (
			<div
				style={{
					...computedStyles.title,
					...(tapState.isHovered || tapState.isFocused
						? computedStyles.isHovered
						: {})
				}}
			>
				{section.name}
				<div
					style={computedStyles.arrow}
					dangerouslySetInnerHTML={{ __html: arrowIconSvg }}
				/>
			</div>
		)}
	</Taply>
)

const renderLink = ({ sectionKey, storyKey, story, computedStyles }) => (
	<Taply key={storyKey}>
		{tapState => (
			<NavLink
				to={`/${sectionKey}/${storyKey}`}
				style={{
					...computedStyles.link,
					...(tapState.isHovered || tapState.isFocused
						? computedStyles.isHovered
						: {})
				}}
				activeStyle={computedStyles.isActive}
			>
				{story.name}
			</NavLink>
		)}
	</Taply>
)

const NavSection = props => {
	const { section, sectionKey, initialIsOpened } = props
	const [isOpened, setIsOpened] = useState(initialIsOpened)
	const theme = useTheme()
	const computedStyles = useStyles(styles, [props, isOpened, theme])

	const links =
		isOpened &&
		Object.entries(section.stories).map(([storyKey, story]) =>
			renderLink({ sectionKey, section, storyKey, story, computedStyles })
		)
	return (
		<div key={sectionKey} style={computedStyles.root}>
			{renderTitle({ section, computedStyles, setIsOpened })}
			{links}
		</div>
	)
}

NavSection.propTypes = {
	initialIsOpened: PropTypes.bool,
	section: SectionPropType.isRequired,
	sectionKey: PropTypes.string.isRequired
}

export default NavSection
