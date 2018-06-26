const unified = require('unified')
const remarkParse = require('remark-parse')

const mdastToJsxast = require('./mdastToJsxast')
const jsxastToJsx = require('./jsxastToJsx')

// markdown -> MDAST -> JSXAST -> jsx
const process = (markdown, options) => {
	const { gfm, commonmark, allowDangerousHTML, renderer } = options
	const processor = unified()

	processor.use(remarkParse, { gfm, commonmark, allowDangerousHTML })

	if (options.mdPlugins) {
		/*
		plugins: [
			somePlugin,
			{ plugin: somePlugin, options: { ... } }
		]
		*/
		options.mdPlugins.forEach(item => {
			const plugin = typeof item === 'object' ? item.plugin : item
			const pluginOptions = typeof plugin === 'object' && item.options
			processor.use(plugin, {
				...pluginOptions,
				minimarkOptions: options
			})
		})
	}

	processor
		.use(mdastToJsxast, { allowDangerousHTML })
		.use(jsxastToJsx, { renderer })

	return processor.processSync(markdown).contents
}

module.exports = process
