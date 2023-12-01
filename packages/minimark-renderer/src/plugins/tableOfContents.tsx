import React from 'react'

import { useTaply, TapState } from '../taply'
import { useStyles } from 'floral'
import MinimarkRenderer from '../index'

const generateTree = headings => {
	const tree = { level: 0, children: [] }
	let last = tree
	headings.forEach(heading => {
		const node = {
			level: heading.level,
			heading,
			children: []
		}
		if (heading.level > last.level) {
			node.parent = last
		} else {
			let parent = last.parent
			while (parent.level >= heading.level) parent = parent.parent
			node.parent = parent
		}
		node.parent.children.push(node)
		last = node
	})
	return tree
}

const renderTree = (node, { loose, ordered }) => {
	const { heading, children } = node
	let content = <a href={`#${heading.id}`}>{heading.text}</a>
	if (loose) {
		content = (
			<MinimarkRenderer component="Paragraph">{content}</MinimarkRenderer>
		)
	}
	return (
		<MinimarkRenderer key={heading.id} component="ListItem" checked={null}>
			{content}
			{children.length > 0 && (
				<MinimarkRenderer
					component="List"
					ordered={ordered}
					style={{ marginBottom: 0 }}
				>
					{children.map(child =>
						renderTree(child, { loose, ordered })
					)}
				</MinimarkRenderer>
			)}
		</MinimarkRenderer>
	)
}

interface TableOfContentsHeading {
    text: string
    id: string
    level: number
}

interface TableOfContentsProps {
	headings: TableOfContentsHeading[]
	levels: number[]
	loose?: boolean
	ordered?: boolean
}

const TableOfContents = (props: TableOfContentsProps) => {
    const { headings, levels, loose, ordered } = props
	const filtered = headings.filter(heading => levels.includes(heading.level))
	const tree = generateTree(filtered)
	return (
		<MinimarkRenderer component="List" ordered={ordered}>
			{tree.children.map(child => renderTree(child, { loose, ordered }))}
		</MinimarkRenderer>
	)
}

TableOfContents.defaultProps = {
	levels: [2, 3, 4]
}

interface AnchorHeadingProps {
	id: string
	level: number //HeadingLevel
	first: boolean
	children: React.ReactNode
}

const anchorHeadingStyles = (
	props: AnchorHeadingProps,
	{ isHovered }: TapState
) => ({
	root: {
		position: 'relative',
	},
	link: {
		fontWeight: 'normal',
		position: 'absolute',
		left: -20,
		width: 20,
		textAlign: 'center',
		display: isHovered ? 'block' : 'none',
	},
})

const AnchorHeading = (props: AnchorHeadingProps) => {
	const { id, level, first, children } = props
	const { tapState, render } = useTaply({})
	const styles = useStyles(anchorHeadingStyles, [props, tapState])
	return (
		<div id={id} style={styles.root}>
			{render((attrs, ref) => (
				<MinimarkRenderer
					component="Heading"
					level={level}
					first={first}
					ref={ref}
					{...attrs}
				>
					<a href={`#${id}`} style={styles.link}>
						#
					</a>
					{children}
				</MinimarkRenderer>
			))}
		</div>
	)
}

export { AnchorHeading, TableOfContents }
