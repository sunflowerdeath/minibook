const MarkdownIt = require('markdown-it')
const { unescapeAll } = require('markdown-it/lib/common/utils')
const frontMatter = require('front-matter')
const jsStringEscape = require('js-string-escape')

const fence = (tokens, idx) => {
	const token = tokens[idx]
	const info = token.info ? unescapeAll(token.info).trim() : ''
	const tags = info ? info.split(/\s+/g) : []
	const example =
		tags[0] === 'example'
			? `<div className="example">${token.content}</div>`
			: ''
	return `
		<div className="fence">
			${example}
			<pre><code>{"${jsStringEscape(token.content)}"}</code></pre>
		</div>
	`
}

const parse = (markdown, resourcePath) => {
	const md = new MarkdownIt({ xhtmlOut: true, html: true })
	const { body, attributes } = frontMatter(markdown)
	if (!attributes.name) {
		const nameFromPath = resourcePath.match(/([^/]+)\.md$/)[1]
		attributes.name = nameFromPath[0].toUpperCase() + nameFromPath.slice(1)
	}

	const originalRenderInline = md.renderer.renderInline.bind(md.renderer)
	md.renderer.renderInline = (...args) => {
		const html = jsStringEscape(originalRenderInline(...args))
		return `<span dangerouslySetInnerHTML={{ __html: "${html}" }} />`
	}

	md.renderer.rules.html_block = (tokens, idx) => {
		const html = jsStringEscape(tokens[idx].content)
		return `<span dangerouslySetInnerHTML={{ __html: "${html}" }} />`
	}

	md.renderer.rules.code_inline = (tokens, idx) =>
		`<code>${jsStringEscape(tokens[idx].content)}</code>`

	md.renderer.rules.code_block = fence
	md.renderer.rules.fence = fence

	const html = md.render(body)
	return { html, attributes }
}

const build = ({ html, attributes }) => {
	const { imports, name, description } = attributes
	const importsCode = imports
		? Object.entries(imports).map(([key, value]) => `import ${key} from '${value}'\n`)
		: []
	return `
		${["import React from 'react'\n", ...importsCode].join('\n')}
		export default {
			name: ${JSON.stringify(name)},
			description: ${JSON.stringify(description)},
			render() {
				return <div>${html}</div>
			}
		}
	`
}

module.exports = function loader(content) {
	return build(parse(content, this.resourcePath))
}
