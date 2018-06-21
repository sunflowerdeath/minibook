const mdastToHast = require('mdast-util-to-hast')
const mdastDefinitions = require('mdast-util-definitions')
const originalHandlers = require('mdast-util-to-hast/lib/handlers')
const detab = require('detab')

/*
JSXAST is a format for representing markdown in JSX.
Block nodes are transformed to react components.
Inline nodes are HAST nodes wrapped in span with dangerouslySetInnerHTML.
This is needed for compatibility with inline html in markdown.

Block level nodes are transformed to jsx nodes:
	{ type: 'jsx', component: 'Name', props: { ... }, children: [] }
Inline nodes are transformed to HAST nodes and wrapped in node
	{ type: 'dangerouslySetInnerHtml', children: [] }

Block nodes:
	heading, paragraph, blockquote, list, listItem,
	thematicBreak, table, tableRow, tableCell
Inline nodes:
	strong, emphasis, delete, link, image, inlineCode,
	linkReference, imageReference
Other:
	definition
Not supported:
	footnote, footnoteReference, footnoteDefinition
*/
const mdastToJsxast = options => tree => {
	const definition = mdastDefinitions(tree)

	const transformChildren = (node, html) => {
		if (!node.children) return null
		const handlers = html ? htmlHandlers : jsxHandlers
		const transformed = node.children
			.map(child => mdastToHast(child, { ...options, handlers }))
			.filter(child => !!child)
		return html
			? [{ type: 'dangerouslySetInnerHTML', children: transformed }]
			: transformed
	}

	const jsxHandlers = {
		root(h, node) {
			return {
				type: 'jsx',
				component: 'Root',
				children: transformChildren(node, false)
			}
		},
		heading(h, node) {
			return {
				type: 'jsx',
				component: 'Heading',
				props: { depth: node.depth },
				children: transformChildren(node, true)
			}
		},
		paragraph(h, node) {
			return {
				type: 'jsx',
				component: 'Paragraph',
				children: transformChildren(node, true)
			}
		},
		list(h, node) {
			// list -> listItem -> ...mdast

			// set property on list items if list is loose
			if (node.loose) {
				node.children.forEach(child => {
					child.looseList = true
				})
			}

			return {
				type: 'jsx',
				component: 'List',
				props: { ordered: node.ordered, loose: node.loose },
				children: transformChildren(node, false)
			}
		},
		listItem(h, node) {
			// strip paragraphs in tight lists
			const container =
				// list is loose when all of its items are loose
				// loose list items can contain multiple block elements
				!node.looseList &&
				node.children.length === 1 &&
				node.children[0].type === 'paragraph'
					? node.children[0]
					: node
			return {
				type: 'jsx',
				component: 'ListItem',
				props: { checked: node.checked },
				children: transformChildren(container, false)
			}
		},
		blockquote(h, node) {
			// blockquote -> paragraph -> ...mdast
			return {
				type: 'jsx',
				component: 'Blockquote',
				children: transformChildren(node, false)
			}
		},
		table(h, node) {
			// table -> tableRow -> tableCell -> ...mdast
			return {
				type: 'jsx',
				component: 'Table',
				props: { align: node.align },
				children: transformChildren(node, false)
			}
		},
		tableRow(h, node) {
			return {
				type: 'jsx',
				component: 'TableRow',
				children: transformChildren(node, false)
			}
		},
		tableCell(h, node) {
			return {
				type: 'jsx',
				component: 'TableCell',
				children: transformChildren(node, true)
			}
		},
		thematicBreak() {
			return { type: 'jsx', component: 'Break' }
		},
		code(h, node) {
			const code = node.value ? detab(node.value + '\n') : ''
			// const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/)
			return {
				type: 'jsx',
				component: 'Code',
				props: { code, lang: node.lang }
			}
		},
		html(h, node) {
			return { type: 'dangerouslySetInnerHTML', children: [node] }
		},
		jsx(h, node) {
			return node
		}
	}

	const htmlHandlers = {
		// patch handlers to use definitions of the whole document
		imageReference(h, node) {
			h.definition = definition
			return originalHandlers.imageReference(h, node)
		},
		linkReference(h, node) {
			h.definition = definition
			return originalHandlers.linkReference(h, node)
		}
	}

	return mdastToHast(tree, { ...options, handlers: jsxHandlers })
}

module.exports = mdastToJsxast
