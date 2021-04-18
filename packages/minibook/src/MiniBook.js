import React, { useState, useRef, useCallback } from 'react'
import raw from 'raw.macro'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import { useStyles } from 'floral'

import { useTheme } from './ThemeContext'
import matchMedia from './matchMedia'
import Nav from './Nav'
import Story from './Story'
import { SectionPropType } from './propTypes'

const favicon = raw('./favicon.base64')
const menuIconSvg = raw('./menu.svg')

const styles = (props, theme) => {
	const {
		matchedMedia: { smallScreen, wideScreen }
	} = props

	const nav = smallScreen
		? {
				width: 256,
				background: theme.highlight,
				height: '100%',
				boxShadow: 'rgba(0,0,0,0.15) 2px 2px 4px',
				boxSizing: 'border-box'
		  }
		: {
				position: 'fixed',
				height: '100%',
				width: 200,
				borderRight: `1px solid ${theme.border}`,
				paddingRight: wideScreen ? 20 : 0
		  }

	return {
		root: {
			minHeight: '100%',
			background: theme.background,
			color: theme.text
		},
		container: {
			maxWidth: 1200,
			margin: 'auto'
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
			color: theme.color,
			fontWeight: 'bold'
		},
		title: {
			fontSize: '18px',
			position: 'relative',
			top: -1
		},
		menu: {
			padding: 12,
			marginLeft: -12,
			fill: theme.text
		},
		story: {
			paddingLeft: do {
				if (smallScreen) 0
				else if (wideScreen) 220
				else 200
			},
			paddingTop: smallScreen ? 50 : 0,
			boxSizing: 'border-box'
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
			zIndex: 1
		},
		nav
	}
}

const getFirstStory = (items, base = '') => {
    let [firstKey, firstItem] = Object.entries(items)[0]
    if (firstItem.items) return getFirstStory(firstItem.items, base + '/' + firstKey)
    return base + '/' + firstKey
}

const Minibook = props => {
	const { items, title, match, matchedMedia } = props
	const segments = match.params.path.split('/')
	const { smallScreen } = matchedMedia
	const theme = useTheme()

	const computedStyles = useStyles(styles, [props, theme])
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
	const navRef = useRef()
	const onClickOverlay = event => {
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
        if (item.items) {
            iterItems = item.items
        } else {
            story = item
            break;
        }
    }

	const nav = (
		<Nav
			title={title}
			items={items}
			smallScreen={smallScreen}
			style={computedStyles.nav}
			ref={navRef}
		/>
	)

	const root = (
		<div style={computedStyles.container}>
			<Helmet>
				<title>{story.name}</title>
				<link rel="shortcut icon" href={favicon} />
				{sidebarIsOpen && <style>{'html { overflow: hidden }'}</style>}
			</Helmet>
			{smallScreen ? (
				<div style={computedStyles.header}>
					<div
						tabIndex="0"
						role="button"
						style={computedStyles.menu}
						dangerouslySetInnerHTML={{ __html: menuIconSvg }}
						onClick={() => setSidebarIsOpen(true)}
					/>
					<div style={computedStyles.title}>
						{title || 'Minibook'}
					</div>
				</div>
			) : (
				nav
			)}
			<div
				style={{
					...computedStyles.story,
					height: story.src ? '100%' : 'auto'
				}}
			>
				<Story
					key={segments.join('-')}
					story={story}
					matchedMedia={matchedMedia}
				/>
			</div>
		</div>
	)

	if (smallScreen) {
		return (
			<div style={computedStyles.root}>
				{root}
				{sidebarIsOpen && (
					<div
						style={computedStyles.overlay}
						onClick={onClickOverlay}
					>
						{nav}
					</div>
				)}
			</div>
		)
	}

	return <div style={computedStyles.root}>{root}</div>
}

Minibook.propTypes = {
	title: PropTypes.string,
	items: PropTypes.objectOf(SectionPropType).isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	match: PropTypes.object.isRequired,
	matchedMedia: PropTypes.objectOf(PropTypes.bool).isRequired
}

export default withRouter(
	matchMedia({
		smallScreen: '(max-width: 1023px)',
		wideScreen: '(min-width: 1200px)'
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
