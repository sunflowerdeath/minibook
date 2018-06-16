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
			return {
				type: 'jsx',
				component: 'List',
				props: { ordered: node.ordered },
				children: transformChildren(node)
			}
		},
		listItem(h, node) {
			return {
				type: 'jsx',
				component: 'ListItem',
				props: { checked: node.checked },
				children: transformChildren(node)
			}
		},
		blockquote(h, node) {
			// blockquote -> paragraph -> ...mdast
			return {
				type: 'jsx',
				component: 'Blockquote',
				children: transformChildren(node)
			}
		},
		table(h, node) {
			// table -> tableRow -> tableCell -> ...mdast
			return {
				type: 'jsx',
				component: 'Table',
				props: { align: node.align },
				children: transformChildren(node)
			}
		},
		tableRow(h, node) {
			return {
				type: 'jsx',
				component: 'TableRow',
				children: transformChildren(node)
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
				children: [{ type: 'raw', value: code }]
			}
		},
		html(h, node) {
			return { type: 'dangerouslySetInnerHTML', children: [node] }
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
