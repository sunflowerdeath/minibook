const frontMatter = require('front-matter')

const mdToJsx = require('./mdToJsx')

const DEFAULT_OPTIONS = {
	renderer: 'MD',
	rendererPath: 'minimark-renderer',
	gfm: false,
	commonmark: false,
	allowDangerousHTML: false
}

const build = (markdown, options) => {
	options = { ...DEFAULT_OPTIONS, ...options }
	const { body, attributes } = frontMatter(markdown)
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
	export default function Markdown() {
		return (
			${jsx}
		)
	}
	export const attributes = ${JSON.stringify(restAttributes)}
	`
}

module.exports = build
