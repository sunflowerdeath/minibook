const frontMatter = require('front-matter')

const mdToJsx = require('./mdToJsx')

const DEFAULT_OPTIONS = {
	renderer: 'MD',
	rendererPath: 'minimark-renderer',
	gfm: false,
	commonmark: false,
	allowDangerousHTML: false
}

function loader(content) {
	console.log('OPTIONS', this.query)
	// this.resourcePath
	const options = { ...DEFAULT_OPTIONS, ...this.query }
	const { body, attributes } = frontMatter(content)
	const jsx = mdToJsx(body, options)
	const { imports, ...restAttributes } = attributes
	const { renderer, rendererPath } = options
	const defaultImports = [
		"import React from 'react'",
		`import ${renderer} from '${rendererPath}'`
	]
	const markdownImports = imports
		? Object.entries(imports).map(
				([key, value]) => `import ${key} from '${value}'\n`
			)
		: []
	return `
	${[...defaultImports, ...markdownImports].join('\n')}
	export default function MarkdownDocument() {
		return (
			${jsx}
		)
	}
	export const attributes = ${JSON.stringify(restAttributes)}
	`
}

module.exports = loader
