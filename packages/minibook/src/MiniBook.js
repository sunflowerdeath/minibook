import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import floral from 'floral'

import Sidebar from './Sidebar'
import Story from './Story'
import { SectionPropType } from './propTypes'
import favicon from '!raw-loader!./favicon.base64'

@withRouter
@floral
class MiniBook extends Component {
	static styles = {
		root: {
			width: '100%',
			height: '100%',
			display: 'flex'
		},
		story: {
			flexGrow: 1
		}
	}

	render() {
		const { sections, title } = this.props
		const { section: sectionKey, story: storyKey } = this.props.match.params

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

		return (
			<div style={this.styles.root}>
				<Helmet>
					<title>
						{currentSection.name}/{currentStory.name}
					</title>
					<link rel="shortcut icon" href={favicon} />
				</Helmet>
				<Sidebar title={title} sections={sections} currentSection={sectionKey} />
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
	}
}

MiniBook.propTypes = {
	title: PropTypes.string,
	sections: PropTypes.objectOf(SectionPropType).isRequired,
	match: PropTypes.object.isRequired
}

export default MiniBook
