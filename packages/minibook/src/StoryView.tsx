import React from 'react'

import { useStyles, StyleProps, StyleMap } from './styles'
import { useTheme } from './ThemeContext'
import { Story, Theme } from './types'
import MarkdownContainer from './MarkdownContainer'

interface StoryViewProps extends StyleProps<[StoryViewProps, Theme]> {
	story: Story
}

const storyStyles = (
	{ story, matchedMedia }: StoryViewProps,
	theme: Theme
): StyleMap => ({
	root: {
		display: story.src ? 'flex' : 'block',
		flexDirection: 'column',
		height: '100%',
	},
	container: {
		padding: matchedMedia.wideScreen ? '20px 40px' : 20,
	},
	header: {
		borderBottom: `1px solid ${theme.border}`,
	},
	title: {
		fontSize: '32px',
		fontWeight: 'bold',
	},
	description: {
		marginTop: 10,
	},
	frame: {
		width: '100%',
		border: 'none',
		flexGrow: 1,
	},
})

const renderContent = (props, computedStyles) => {
	const { story } = props
	const { props: storyProps, render, src, markdown, component } = story

	if (src) {
		return <iframe style={computedStyles.frame} src={src} title="story" />
	}

	let content
	if (markdown) {
		content = <MarkdownContainer markdown={markdown} />
	} else if (render) {
		content = render(component, storyProps)
	} else {
		content = React.createElement(component, storyProps)
	}

	return <div style={computedStyles.container}>{content}</div>
}

const StoryView = (props: StoryViewProps) => {
	const { story } = props
	const theme = useTheme()
	const styles = useStyles(storyStyles, [props, theme])

	let header
	if (!story.markdown) {
		const { description } = story
		header = (
			<div style={styles.header}>
				<div style={styles.container}>
					<div style={styles.title}>{story.name}</div>
					{description && (
						<div style={styles.description}>{description}</div>
					)}
				</div>
			</div>
		)
	}

	let content
	const { props: storyProps, render, src, markdown, component } = story
	if (src) {
		content = <iframe style={styles.frame} src={src} title="story" />
	} else {
		if (markdown) {
			content = <MarkdownContainer markdown={markdown} />
		} else if (render) {
			content = render(component, storyProps)
		} else if (component) {
			content = React.createElement(component, storyProps)
		}
		content = <div style={styles.container}>{content}</div>
	}

	return (
		<div style={styles.root}>
			{header}
			{content}
		</div>
	)
}

export default StoryView
