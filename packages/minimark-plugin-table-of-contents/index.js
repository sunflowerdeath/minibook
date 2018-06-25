const yaml = require('js-yaml')
const map = require('unist-util-map')
const filter = require('unist-util-filter')
const toString = require('mdast-util-to-string')
const Slugger = require('github-slugger')

const tocPlugin = (/* options */) => tree => {
	const slugger = new Slugger()
	const headings = []
	const treeWithIds = map(tree, node => {
		if (node.type !== 'heading') return node
		const text = toString(filter(node, child => child.type !== 'html'))
		const slug = slugger.slug(text)
		headings.push({ id: slug, level: node.depth, text })
		return {
			...node,
			id: slug,
			jsxComponent: 'AnchorHeading',
			jsxProps: { id: slug }
		}
	})
	return map(treeWithIds, node => {
		if (node.type !== 'code' || node.lang !== '@toc') return node
		const { levels, loose, ordered } = yaml.safeLoad(node.value) || {}
		return {
			type: 'jsx',
			component: 'TableOfContents',
			props: { headings, levels, loose, ordered }
		}
	})
}

module.exports = tocPlugin
