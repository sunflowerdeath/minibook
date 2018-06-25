const path = require('path')

const map = require('unist-util-map')
const yaml = require('js-yaml')
const reactDocgen = require('react-docgen')

const mdToJsx = require('minimark-loader/src/mdToJsx')

const rawStringify = require('./rawStringify')

const propsDocPlugin = options => tree =>
	map(tree, node => {
		if (node.type !== 'code' || node.lang !== '@propsdoc') return node

		const { documentPath, readFile, renderer } = options
		const { file, allowMarkdown } = yaml.safeLoad(node.value)
		const filePath = path.resolve(path.dirname(documentPath), file)
		const source = readFile(filePath, 'utf-8')
		const propsInfo = reactDocgen.parse(source).props

		if (allowMarkdown) {
			for (const propInfo of Object.values(propsInfo)) {
				if (propInfo.description) {
					propInfo.description = new rawStringify.RawValue(
						mdToJsx(propInfo.description, {
							...options,
							mdPlugins: undefined
						})
					)
				}
			}
		}

		const props = rawStringify({ propsInfo })
		return {
			type: 'raw',
			value: `<${renderer} component="PropsDoc" { ...${props} } />`
		}
	})

module.exports = propsDocPlugin
