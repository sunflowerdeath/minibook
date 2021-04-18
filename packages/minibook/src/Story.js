import React from 'react'
import { useStyles } from 'floral'

import { useTheme } from './ThemeContext'
import { StoryPropType, SectionPropType } from './propTypes'
import MarkdownContainer from './MarkdownContainer'

const styles = ({ story, matchedMedia }, theme) => ({
	root: {
		display: story.src ? 'flex' : 'block',
		flexDirection: 'column',
		height: '100%'
	},
	container: {
		padding: matchedMedia.wideScreen ? '20px 40px' : 20
	},
	header: {
		borderBottom: `1px solid ${theme.border}`
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

const renderHeader = (props, computedStyles) => {
	const { story } = props
	const { description } = story

	return (
		<div style={computedStyles.header}>
			<div style={computedStyles.container}>
				<div style={computedStyles.title}>
					{story.name}
				</div>
				{description && (
					<div style={computedStyles.description}>{description}</div>
				)}
			</div>
		</div>
	)
}

const renderContent = (props, computedStyles) => {
	const { story } = props
	const { props: storyProps, render, src, markdown, component } = story

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

const Story = props => {
	const { story } = props
	const theme = useTheme()
	const computedStyles = useStyles(styles, [props, theme])

	return (
		<div style={computedStyles.root}>
			{!story.markdown && renderHeader(props, computedStyles)}
			{renderContent(props, computedStyles)}
		</div>
	)
}

Story.propTypes = {
	story: StoryPropType.isRequired
}

export default Story
