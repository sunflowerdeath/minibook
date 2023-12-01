const fs = require('fs')
const frontMatter = require('front-matter')
const externalLinksPlugin = require('remark-external-links').default

const mdToJsx = require('./mdToJsx')
const tocPlugin = require('./plugins/tableOfContents')
const propsDocPlugin = require('./plugins/propsDoc')
const fencePlugin = require('./plugins/fence')

const DEFAULT_OPTIONS = {
	renderer: 'MD',
	gfm: false,
	commonmark: false,
	allowDangerousHTML: false,
}

function loader(content) {
	const readFile = (filePath, ...args) => {
		this.addDependency(filePath)
		return fs.readFileSync(filePath, ...args)
	}
	const options = {
		...DEFAULT_OPTIONS,
		...this.query,
		documentPath: this.resourcePath,
		readFile,
		mdPlugins: [
			externalLinksPlugin,
			tocPlugin,
			propsDocPlugin,
			fencePlugin,
		],
	}
	const { body, attributes } = frontMatter(content)
	const jsx = mdToJsx(body, options)
	const { imports, ...restAttributes } = attributes
	const { renderer, rendererPath } = options
	const defaultImports = [
		"import React from 'react'",
		`import ${renderer} from 'minimark-renderer'`,
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
