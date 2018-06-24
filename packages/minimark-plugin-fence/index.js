const path = require('path')

const map = require('unist-util-map')
const yaml = require('js-yaml')

const fencePlugin = ({ documentPath, readFile }) => tree =>
	map(tree, node => {
		if (node.type !== 'code') return node

		if (node.lang === '@source') {
			const { file, tabs, from, to } = yaml.safeLoad(node.value)
			const filePath = path.resolve(path.dirname(documentPath), file)
			let code = readFile(filePath, 'utf-8')
			if (from !== undefined || to !== undefined) {
				const lines = code.split('\n')
				code = lines
					.slice(
						from === undefined ? 0 : from - 1,
						to === undefined ? lines.length : to
					)
					.join('\n')
			}
			if (tabs !== undefined) {
				code = code.replace(/\t/g, ' '.repeat(tabs))
			}
			return { type: 'jsx', component: 'Fence', props: { code } }
		}

		if (node.lang === '@example') {
			return {
				type: 'jsx',
				component: 'Fence',
				props: { code: node.value, lang: node.lang },
				children: [{ type: 'raw', value: node.value }]
			}
		}
		if (node.lang === '@render') {
			return {
				type: 'jsx',
				component: 'Fence',
				children: [{ type: 'raw', value: node.value }]
			}
		}

		return {
			type: 'jsx',
			component: 'Fence',
			props: { code: node.value, lang: node.lang }
		}
	})

module.exports = fencePlugin
