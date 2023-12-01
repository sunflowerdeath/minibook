import React, { forwardRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useStyles, StyleProps, StyleMap } from './styles'
import { useTaply, TapState } from './taply'
import { Story, Section, Theme } from './types'
import { useTheme } from './ThemeContext'

import arrowIconSvg from 'raw-loader!./icons/arrow.svg'

interface NavSectionTitleProps
	extends StyleProps<[NavSectionTitleProps, TapState, Theme]> {
	onClick: () => void
	isOpen: boolean
	children: React.ReactNode
}

const navSectionTitleStyles = (
	props: NavSectionTitleProps,
	tapState: TapState,
	theme: Theme
) : StyleMap => ({
	root: {
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
		background:
			tapState.isFocused || tapState.isHovered
				? theme.highlight
				: 'transparent',
	},
	arrow: {
		width: 24,
		height: 24,
		transform: props.isOpen ? 'rotate(180deg)' : 'none',
		fill: theme.text,
	},
})

const NavSectionTitle = (props: NavSectionTitleProps) => {
	const { onClick, children } = props
	const theme = useTheme()
	const { render, tapState } = useTaply({ onClick })
	const styles = useStyles(navSectionTitleStyles, [props, tapState, theme])
	return render((attrs, ref) => (
		<div {...attrs} ref={ref} style={styles.root}>
			{children}
			<div
				style={styles.arrow}
				dangerouslySetInnerHTML={{ __html: arrowIconSvg }}
			/>
		</div>
	))
}

interface NavStoryLinkProps
	extends StyleProps<[NavStoryLinkProps, TapState, Theme]> {
	url: string
	children: React.ReactNode
}

const navStoryLinkStyles = (
	props: NavStoryLinkProps,
	tapState: TapState,
	theme: Theme
) : StyleMap => ({
	root: {
		display: 'block',
		textDecoration: 'none',
		paddingTop: 8,
		paddingBottom: 8,
		// paddingTop: smallScreen ? 8 : 4,
		// paddingBottom: smallScreen ? 8 : 4,
		paddingLeft: 16,
		paddingRight: 10,
		fontSize: 16,
		color: theme.secondary,
		userSelect: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		outline: 'none',
		borderRadius: 5,
		background:
			tapState.isFocused || tapState.isHovered
				? theme.highlight
				: 'transparent',
	},
	isActive: {
		color: theme.link,
	},
})

const NavStoryLink = (props: NavStoryLinkProps) => {
	const { url, children } = props
	const { tapState, render } = useTaply({})
	const theme = useTheme()
	const styles = useStyles(navStoryLinkStyles, [props, tapState, theme])
	return render((attrs, ref) => (
		<NavLink
			{...attrs}
			ref={ref}
			to={url}
			style={styles.root}
			activeStyle={styles.isActive}
		>
			{children}
		</NavLink>
	))
}

interface NavItemProps {
	baseUrl?: string
	initialIsOpened?: boolean
	item: Story | Section
	itemKey: string
	style?: React.CSSProperties
}

const NavItem = (props: NavItemProps) => {
	const { baseUrl = '', item, itemKey, initialIsOpened, style } = props
	const [isOpened, setIsOpened] = useState(!!initialIsOpened)
	const theme = useTheme()

	if ('stories' in item) {
		const newBaseUrl = baseUrl + '/' + itemKey
		const links =
			isOpened &&
			Object.entries(item.stories).map(([itemKey, item]) => (
				<NavItem item={item} itemKey={itemKey} baseUrl={newBaseUrl} />
			))
		return (
			<div key={itemKey} style={style}>
				<NavSectionTitle
					isOpen={isOpened}
					onClick={() => setIsOpened((v) => !v)}
				>
					{item.name}
				</NavSectionTitle>
				{links}
			</div>
		)
	} else {
		return (
			<NavStoryLink key={itemKey} url={`${baseUrl}/${itemKey}`}>
				{item.name}
			</NavStoryLink>
		)
	}
}

const navStyles = {
	root: {
		padding: '20px 0',
		overflow: 'auto',
	},
	title: {
		fontSize: '24px',
		fontWeight: 'bold',
		marginBottom: 20,
		paddingLeft: 15,
	},
}

interface NavProps extends StyleProps<[NavProps]> {
	title: React.ReactNode
	items: { [key: string]: Section | Story }
	currentSection: string
	smallScreen: boolean
}

const Nav = forwardRef((props: NavProps, ref) => {
	const { title, items, currentSection, smallScreen } = props
	const styles = useStyles(navStyles, [props])

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
		<div style={styles.root} ref={ref}>
			{title && <div style={styles.title}>{title}</div>}
			{sectionsElems}
		</div>
	)
})

export default Nav
