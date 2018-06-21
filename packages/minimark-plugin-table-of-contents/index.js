const map = require('unist-util-map')
const filter = require('unist-util-filter')
const toString = require('mdast-util-to-string')
const Slugger = require('github-slugger')

const tocPlugin = (/* options */) => tree => {
	const slugger = new Slugger()
	const headings = []
	const treeWithIds = map(tree, node => {
		if (node.type !== 'heading') return node
		const nodeWithoutHtml = filter(node, child => child.type !== 'html')
		const slug = slugger.slug(toString(nodeWithoutHtml))
		headings.push({ id: slug, level: node.level })
		return { ...node, id: slug }
	})
	return map(treeWithIds, node => {
		if (node.type !== 'code' || node.lang !== '!toc') return node
		return {
			type: 'jsx',
			component: 'TableOfContents',
			props: { headings }
		}
	})
}

module.exports = tocPlugin
