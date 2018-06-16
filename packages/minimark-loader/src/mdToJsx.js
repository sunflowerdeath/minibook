const unified = require('unified')
const remarkParse = require('remark-parse')

const mdastToJsxast = require('./mdastToJsxast')
const jsxastToJsx = require('./jsxastToJsx')

// markdown -> MDAST -> JSXAST -> jsx
const process = (markdown, options) => {
	const { gfm, commonmark, allowDangerousHTML, renderer } = options
	return unified()
		.use(remarkParse, { gfm, commonmark, allowDangerousHTML })
		.use(mdastToJsxast, { allowDangerousHTML })
		.use(jsxastToJsx, { renderer })
		.processSync(markdown).contents
}

module.exports = process
