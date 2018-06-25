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
		options.mdPlugins.forEach(plugin => processor.use(plugin, options))
	}

	processor
		.use(mdastToJsxast, { allowDangerousHTML })
		.use(jsxastToJsx, { renderer })

	return processor.processSync(markdown).contents
}

module.exports = process
