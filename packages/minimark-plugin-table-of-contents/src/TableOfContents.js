import React from 'react'
import PropTypes from 'prop-types'

import MinimarkRenderer from 'minimark-renderer'

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

const TableOfContents = ({ headings, levels, loose, ordered }) => {
	const filtered = headings.filter(heading => levels.includes(heading.level))
	const tree = generateTree(filtered)
	return (
		<MinimarkRenderer component="List" ordered={ordered}>
			{tree.children.map(child => renderTree(child, { loose, ordered }))}
		</MinimarkRenderer>
	)
}

TableOfContents.propTypes = {
	headings: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string,
			id: PropTypes.string,
			level: PropTypes.number
		})
	).isRequired,
	levels: PropTypes.arrayOf(PropTypes.number).isRequired,
	loose: PropTypes.bool,
	ordered: PropTypes.bool
}

TableOfContents.defaultProps = {
	levels: [2, 3, 4]
}

export default TableOfContents
