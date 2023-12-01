const path = require('path')

const map = require('unist-util-map')
const yaml = require('js-yaml')
const reactDocgen = require('react-docgen')

const mdToJsx = require('../src/mdToJsx')
const rawStringify = require('./rawStringify')

const propsDocPlugin = ({ minimarkOptions }) => (tree) =>
	map(tree, (node) => {
		if (node.type !== 'code' || node.lang !== '@propsdoc') return node

		const { documentPath, readFile, renderer } = minimarkOptions
		const { file, allowMarkdown, component } = yaml.safeLoad(node.value)
		const filePath = path.resolve(path.dirname(documentPath), file)
		const source = readFile(filePath, 'utf-8')

		let propsInfo
		if (component) {
			const resolver = reactDocgen.resolver.findAllComponentDefinitions
			const componentInfo = reactDocgen
				.parse(source, resolver)
				.find((c) => c.displayName === component)
			if (!componentInfo) {
				throw new Error(
					`Can't find definition of the component "${component}" ` +
						`in the file "${filePath}"`
				)
			}
			propsInfo = componentInfo.props
		} else {
			const res = reactDocgen.parse(source, undefined, undefined, {
				configFile: false,
			})
			propsInfo = res.props
		}

		if (allowMarkdown) {
			for (const propInfo of Object.values(propsInfo)) {
				if (propInfo.description) {
					propInfo.description = new rawStringify.RawValue(
						mdToJsx(propInfo.description, {
							...minimarkOptions,
							mdPlugins: undefined,
						})
					)
				}
			}
		}

		const props = rawStringify({ propsInfo })
		return {
			type: 'raw',
			value: `<${renderer} component="PropsDoc" { ...${props} } />`,
		}
	})

module.exports = propsDocPlugin
