import React from 'react'
import floral from 'floral'

import { StoryPropType, SectionPropType } from './propTypes'
import MarkdownContainer from './MarkdownContainer'

const styles = props => ({
	root: {
		display: props.story.src ? 'flex' : 'block',
		flexDirection: 'column',
		height: '100%'
	},
	container: {
		maxWidth: 800,
		margin: '0 auto',
		padding: 20
	},
	header: {
		borderBottom: '1px solid #eee'
	},
	title: {
		fontSize: '32px',
		fontWeight: 'bold'
	},
	description: {
		marginTop: 10
	},
	frame: {
		width: '100%',
		border: 'none',
		flexGrow: 1
	}
})

const renderHeader = props => {
	const { section, story, computedStyles } = props
	const { description } = story

	return (
		<div style={computedStyles.header}>
			<div style={computedStyles.container}>
				<div style={computedStyles.title}>
					{section.name} / {story.name}
				</div>
				{description && (
					<div style={computedStyles.description}>{description}</div>
				)}
			</div>
		</div>
	)
}

const renderContent = props => {
	const { section, story, computedStyles } = props
	const { component } = section
	const { props: storyProps, render, src, markdown } = story

	if (src) {
		return <iframe style={computedStyles.frame} src={src} title="story" />
	}

	const content = do {
		// eslint-disable-next-line no-unused-expressions
		if (markdown) <MarkdownContainer markdown={markdown} />
		else if (render) render(component, storyProps)
		else React.createElement(component, storyProps)
	}

	return <div style={computedStyles.container}>{content}</div>
}

const Story = floral(styles)(props => {
	const { story, computedStyles } = props

	return (
		<div style={computedStyles.root}>
			{!story.markdown && renderHeader(props)}
			{renderContent(props)}
		</div>
	)
})

Story.propTypes = {
	section: SectionPropType.isRequired,
	story: StoryPropType.isRequired
}

export default Story
