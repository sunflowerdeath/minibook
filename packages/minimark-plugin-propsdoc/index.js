const fs = require('fs')
const path = require('path')

const map = require('unist-util-map')
const yaml = require('js-yaml')
const reactDocgen = require('react-docgen')

const propsDocPlugin = ({ filePath }) => tree =>
	map(tree, node => {
		if (node.type !== 'code' || node.lang !== '@propsdoc') return node

		const { file } = yaml.safeLoad(node.value)
		const source = fs.readFileSync(
			path.resolve(path.dirname(filePath), file)
		)
		const componentInfo = reactDocgen.parse(source)

		return {
			type: 'jsx',
			component: 'PropsDoc',
			props: { propsInfo: componentInfo.props }
		}
	})

module.exports = propsDocPlugin
