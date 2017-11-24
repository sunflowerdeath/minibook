import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import Sidebar from 'react-sidebar'
import floral from 'floral'

import matchMedia from './matchMedia'
import Nav from './Nav'
import Story from './Story'
import { SectionPropType } from './propTypes'
import favicon from '!raw-loader!./favicon.base64'
import menuIconSvg from '!raw-loader!./menu.svg'

@withRouter
@matchMedia({ smallScreen: '(max-width: 1024px)' })
@floral
class MiniBook extends Component {
	static propTypes = {
		title: PropTypes.string,
		sections: PropTypes.objectOf(SectionPropType).isRequired,
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
					boxSizing: 'border-box'
				}
			: {
					height: '100%',
					width: 200,
					borderRight: '1px solid #eee'
				}

		return {
			root: {
				width: '100%',
				height: '100%',
				display: smallScreen ? 'block' : 'flex'
			},
			header: {
				position: 'fixed',
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
				paddingTop: smallScreen ? 50 : 0,
				flexGrow: 1
			},
			nav
		}
	}

	componentWillReceiveProps(nextProps) {
		const { section, story } = this.props.match.params
		const { section: nextSection, story: nextStory } = nextProps.match.params
		if (section !== nextSection || story !== nextStory) {
			this.setState({ sidebarIsOpen: false })
		}
	}

	render() {
		const { sections, title, match, matchedMedia } = this.props
		const { section: sectionKey, story: storyKey } = match.params
		const { smallScreen } = matchedMedia

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
					{smallScreen && <style>{'html, body { overflow: visible }'}</style>}
				</Helmet>
				{smallScreen ? (
					<div style={this.styles.header}>
						<div
							style={this.styles.menu}
							dangerouslySetInnerHTML={{ __html: menuIconSvg }}
							onClick={() => this.setState({ sidebarIsOpen: true })}
						/>
						<div style={this.styles.title}>{title || 'Minibook'}</div>
					</div>
				) : (
					nav
				)}
				<div style={this.styles.story}>
					<Story
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
				<Sidebar
					open={this.state.sidebarIsOpen}
					sidebar={nav}
					onSetOpen={open => this.setState({ sidebarIsOpen: open })}
					touch={false}
					shadow={false}
				>
					{root}
				</Sidebar>
			)
		}

		return root
	}
}

export default MiniBook
