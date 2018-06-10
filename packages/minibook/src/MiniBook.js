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

@withRouter
@matchMedia({ smallScreen: '(max-width: 1023px)' })
@floral
class MiniBook extends Component {
	static propTypes = {
		title: PropTypes.string,
		sections: PropTypes.objectOf(SectionPropType).isRequired,
		// eslint-disable-next-line react/forbid-prop-types
		match: PropTypes.object.isRequired,
		matchedMedia: PropTypes.objectOf(PropTypes.bool).isRequired
	}

	static styles = props => {
		const { matchedMedia: { smallScreen } } = props

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
					borderRight: '1px solid #eee'
				}

		return {
			root: {
				height: '100%'
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
				paddingLeft: smallScreen ? 0 : 200,
				paddingTop: smallScreen ? 50 : 0,
				boxSizing: 'border-box'
			},
			drawer: {
				boxShadow: 'rgba(0,0,0,0.15) 2px 2px 4px'
			},
			nav
		}
	}

	componentWillReceiveProps(nextProps) {
		// Close sidebar when story changed
		const { section, story } = this.props.match.params
		const {
			section: nextSection,
			story: nextStory
		} = nextProps.match.params
		if (section !== nextSection || story !== nextStory) {
			this.setState({ sidebarIsOpen: false })
		}

		// Close sidebar when rotating ipad while sidebar is open
		if (!nextProps.matchedMedia.smallScreen && this.state.sidebarIsOpen) {
			this.setState({ sidebarIsOpen: false })
		}
		return null
	}

	render() {
		const { sections, title, match, matchedMedia } = this.props
		const { section: sectionKey, story: storyKey } = match.params
		const { smallScreen } = matchedMedia
		const { sidebarIsOpen } = this.state

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
				style={this.styles.nav}
			/>
		)

		const root = (
			<div style={this.styles.root}>
				<Helmet>
					<title>
						{currentSection.name}/{currentStory.name}
					</title>
					<link rel="shortcut icon" href={favicon} />
					{sidebarIsOpen && (
						<style>{'html, body { overflow: hidden }'}</style>
					)}
				</Helmet>
				{smallScreen ? (
					<div style={this.styles.header}>
						<div
							tabIndex="0"
							role="button"
							style={this.styles.menu}
							dangerouslySetInnerHTML={{ __html: menuIconSvg }}
							onClick={() =>
								this.setState({ sidebarIsOpen: true })
							}
						/>
						<div style={this.styles.title}>
							{title || 'Minibook'}
						</div>
					</div>
				) : (
					nav
				)}
				<div
					style={{
						...this.styles.story,
						height: currentStory.src ? '100%' : 'auto'
					}}
				>
					<Story
						key={`${sectionKey}-${storyKey}`}
						sectionKey={sectionKey}
						section={currentSection}
						storyKey={storyKey}
						story={currentStory}
					/>
				</div>
			</div>
		)

		if (smallScreen) {
			return (
				<div style={this.styles.root}>
					{root}
					<Drawer
						open={this.state.sidebarIsOpen}
						drawerStyle={this.styles.drawer}
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
