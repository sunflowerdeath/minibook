import React, { useState, useRef, useCallback, useEffect } from 'react'
import { withRouter, Redirect, useLocation } from 'react-router-dom'
import Helmet from 'react-helmet'

import { useStyles, StyleProps, StyleMap } from './styles'
import { useTheme } from './ThemeContext'
import matchMedia from './matchMedia'
import { Section, Story, Theme } from './types'
import Nav from './Nav'
import StoryView from './StoryView'

import favicon from 'raw-loader!./icons/favicon.base64'
import menuIconSvg from 'raw-loader!./icons/menu.svg'

interface MinibookProps extends StyleProps<[MinibookProps, Theme]> {
	title: React.ReactNode
	items: any // PropTypes.objectOf(SectionPropType).isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	match: any // PropTypes.object.isRequired,
	matchedMedia: any // PropTypes.objectOf(PropTypes.bool).isRequired,
}

const minibookStyles = (props: MinibookProps, theme: Theme) : StyleMap => {
	const {
		matchedMedia: { smallScreen, wideScreen },
	} = props

	const nav = smallScreen
		? {
				width: 256,
				background: theme.highlight,
				height: '100%',
				boxShadow: 'rgba(0,0,0,0.15) 2px 2px 4px',
				boxSizing: 'border-box',
		  }
		: {
				position: 'fixed',
				height: '100%',
				width: 200,
				borderRight: `1px solid ${theme.border}`,
				paddingRight: wideScreen ? 20 : 0,
		  }

	return {
		root: {
			minHeight: '100%',
			background: theme.background,
			color: theme.text,
		},
		container: {
			maxWidth: 1200,
			margin: 'auto',
		},
		header: {
			position: 'fixed',
			zIndex: 1,
			width: '100%',
			height: 50,
			display: 'flex',
			alignItems: 'center',
			padding: '0 20px',
			background: theme.highlight,
			borderBottom: `1px solid ${theme.border}`,
			color: theme.text,
			fontWeight: 'bold',
		},
		title: {
			fontSize: '18px',
			position: 'relative',
			top: -1,
		},
		menu: {
			padding: 12,
			marginLeft: -12,
			fill: theme.text,
		},
		story: {
			paddingLeft: smallScreen ? 0 : wideScreen ? 220 : 200,
			paddingTop: smallScreen ? 50 : 0,
			boxSizing: 'border-box',
		},
		overlay: {
			position: 'fixed',
			width: '100%',
			height: '100%',
			background: 'rgba(0,0,0,0.4)',
			userSelect: 'none',
			WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
			top: 0,
			left: 0,
			zIndex: 1,
		},
		nav,
	}
}

const useScrollToTopOnNavigation = () => {
	const { pathname } = useLocation()
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])
}

const getFirstStory = (
	items: { [key: string]: Story | Section },
	base = ''
): string => {
	const [firstKey, firstItem] = Object.entries(items)[0]
	if ('stories' in firstItem) {
		return getFirstStory(firstItem.stories, base + '/' + firstKey)
	}
	return base + '/' + firstKey
}

const Minibook = (props: MinibookProps) => {
	const { items, title, match, matchedMedia } = props
	const segments = match.params.path.split('/')
	const { smallScreen } = matchedMedia
	const theme = useTheme()

	useScrollToTopOnNavigation()

	const styles = useStyles(minibookStyles, [props, theme])
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
	const navRef = useRef()
	const onClickOverlay = (event) => {
		const navElem = navRef.current
		if (event.target === navElem || navElem.contains(event.target)) {
			return
		}
		setSidebarIsOpen(false)
	}

	let story
	let iterItems = items
	for (let i in segments) {
		let itemKey = segments[i]
		let item = iterItems[itemKey]
		if (!item) return <Redirect to={getFirstStory(items)} />
		if (item.stories) {
			iterItems = item.stories
		} else {
			story = item
			break
		}
	}

	const nav = (
		<Nav
			title={title}
			items={items}
			smallScreen={smallScreen}
			style={styles.nav}
			ref={navRef}
		/>
	)

	const root = (
		<div style={styles.container}>
			<Helmet>
				<title>{story.name}</title>
				<link rel="shortcut icon" href={favicon} />
				{sidebarIsOpen && <style>{'html { overflow: hidden }'}</style>}
			</Helmet>
			{smallScreen ? (
				<div style={styles.header}>
					<div
						tabIndex={0}
						role="button"
						style={styles.menu}
						dangerouslySetInnerHTML={{ __html: menuIconSvg }}
						onClick={() => setSidebarIsOpen(true)}
					/>
					<div style={styles.title}>{title || 'Minibook'}</div>
				</div>
			) : (
				nav
			)}
			<div
				style={{
					...styles.story,
					height: story.src ? '100%' : 'auto',
				}}
			>
				<StoryView
					key={segments.join('-')}
					story={story}
					matchedMedia={matchedMedia}
				/>
			</div>
		</div>
	)

	if (smallScreen) {
		return (
			<div style={styles.root}>
				{root}
				{sidebarIsOpen && (
					<div style={styles.overlay} onClick={onClickOverlay}>
						{nav}
					</div>
				)}
			</div>
		)
	}

	return <div style={styles.root}>{root}</div>
}

export default withRouter(
	matchMedia({
		smallScreen: '(max-width: 1023px)',
		wideScreen: '(min-width: 1200px)',
	})(Minibook)
)

/*
	static getDerivedStateFromProps(props, state) {
		// Close sidebar when story changed
		const { section: prevSection, story: prevStory } =
			state.prevParams || {}
		const { section, story } = props.match.params
		if (section !== prevSection || story !== prevStory) {
			return { sidebarIsOpen: false, prevParams: props.match.params }
		}

		// Close sidebar when rotating ipad while sidebar is open
		if (!props.matchedMedia.smallScreen && state.sidebarIsOpen) {
			return { sidebarIsOpen: false }
		}

		return null
	}
*/
