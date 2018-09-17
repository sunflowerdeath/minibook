import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import Drawer from 'react-motion-drawer'
import floral from 'floral'

import matchMedia from './matchMedia'
import Nav from './Nav'
import Story from './Story'
import { SectionPropType } from './propTypes'
// eslint-disable-next-line import/first
import favicon from '!raw-loader!./favicon.base64'
// eslint-disable-next-line import/first
import menuIconSvg from '!raw-loader!./menu.svg'

const styles = props => {
	const {
		matchedMedia: { smallScreen, wideScreen }
	} = props

	const nav = smallScreen
		? {
				width: 256,
				background: 'white',
				height: '100%',
				boxShadow: 'rgba(0,0,0,0.15) 2px 2px 4px',
				boxSizing: 'border-box'
		  }
		: {
				position: 'fixed',
				height: '100%',
				width: 200,
				borderRight: '1px solid #eee',
				paddingRight: wideScreen ? 20 : 0
		  }

	return {
		root: {
			height: '100%',
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
			borderBottom: '1px solid #eee',
			background: '#263238',
			color: 'white',
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
			fill: 'white'
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
		drawer: {
			boxShadow: 'rgba(0,0,0,0.15) 2px 2px 4px'
		},
		nav
	}
}

@withRouter
@matchMedia({
	smallScreen: '(max-width: 1023px)',
	wideScreen: '(min-width: 1200px)'
})
@floral(styles)
class MiniBook extends Component {
	static propTypes = {
		title: PropTypes.string,
		sections: PropTypes.objectOf(SectionPropType).isRequired,
		// eslint-disable-next-line react/forbid-prop-types
		match: PropTypes.object.isRequired,
		matchedMedia: PropTypes.objectOf(PropTypes.bool).isRequired
	}

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

	state = {
		sidebarIsOpen: false
	}

	render() {
		const { sections, title, match, matchedMedia } = this.props
		const { section: sectionKey, story: storyKey } = match.params
		const { smallScreen } = matchedMedia
		const { sidebarIsOpen, computedStyles } = this.state

		const currentSection = sectionKey && sections[sectionKey]
		if (!currentSection) {
			const firstSection = Object.keys(sections)[0]
			const firstStory = Object.keys(sections[firstSection].stories)[0]
			return <Redirect to={`/${firstSection}/${firstStory}`} />
		}

		const currentStory = currentSection && currentSection.stories[storyKey]
		if (!currentStory) {
			const firstStory = Object.keys(currentSection.stories)[0]
			return <Redirect to={`/${sectionKey}/${firstStory}`} />
		}

		const nav = (
			<Nav
				title={title}
				sections={sections}
				currentSection={sectionKey}
				smallScreen={smallScreen}
				style={computedStyles.nav}
			/>
		)

		const root = (
			<div style={computedStyles.root}>
				<Helmet>
					<title>
						{currentSection.name}/{currentStory.name}
					</title>
					<link rel="shortcut icon" href={favicon} />
					{sidebarIsOpen && (
						<style>{'html { overflow: hidden }'}</style>
					)}
				</Helmet>
				{smallScreen ? (
					<div style={computedStyles.header}>
						<div
							tabIndex="0"
							role="button"
							style={computedStyles.menu}
							dangerouslySetInnerHTML={{ __html: menuIconSvg }}
							onClick={() =>
								this.setState({ sidebarIsOpen: true })
							}
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
						height: currentStory.src ? '100%' : 'auto'
					}}
				>
					<Story
						key={`${sectionKey}-${storyKey}`}
						sectionKey={sectionKey}
						section={currentSection}
						storyKey={storyKey}
						story={currentStory}
						matchedMedia={matchedMedia}
					/>
				</div>
			</div>
		)

		if (smallScreen) {
			return (
				<div style={computedStyles.root}>
					{root}
					<Drawer
						open={this.state.sidebarIsOpen}
						drawerStyle={computedStyles.drawer}
						onChange={open =>
							this.setState({ sidebarIsOpen: open })
						}
						width={256}
					>
						{nav}
					</Drawer>
				</div>
			)
		}

		return root
	}
}

export default MiniBook
