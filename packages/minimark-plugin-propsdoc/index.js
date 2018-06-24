const path = require('path')

const map = require('unist-util-map')
const yaml = require('js-yaml')
const reactDocgen = require('react-docgen')

const propsDocPlugin = ({ documentPath, readFile }) => tree =>
	map(tree, node => {
		if (node.type !== 'code' || node.lang !== '@propsdoc') return node

		const { file } = yaml.safeLoad(node.value)
		const filePath = path.resolve(path.dirname(documentPath), file)
		const source = readFile(filePath, 'utf-8')
		const componentInfo = reactDocgen.parse(source)

		return {
			type: 'jsx',
			component: 'PropsDoc',
			props: { propsInfo: componentInfo.props }
		}
	})

module.exports = propsDocPlugin
