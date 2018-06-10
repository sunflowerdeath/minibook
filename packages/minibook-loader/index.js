const path = require('path')
const fs = require('fs')

const markdownIt = require('markdown-it')
const { unescapeAll, escapeHtml } = require('markdown-it/lib/common/utils')
const frontMatter = require('front-matter')
const jsStringEscape = require('js-string-escape')
const yaml = require('js-yaml')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')

const renderPermalink = (slug, opts, state, idx) => {
	const tokens = [
		Object.assign(new state.Token('link_open', 'a', 1), {
			attrs: [
				['class', 'minibook__anchor'],
				['href', `#${slug}`],
				['aria-hidden', 'true']
			]
		}),
		Object.assign(new state.Token('html_inline', '', 0), { content: '#' }),
		new state.Token('link_close', 'a', -1),
		Object.assign(new state.Token('text', '', 0), { content: ' ' })
	]

	state.tokens[idx + 1].children.unshift(...tokens)
}

const source = (options, resourcePath) => {
	const { file, tabs, from, to } = options
	const filepath = path.resolve(path.dirname(resourcePath), file)
	let content = fs.readFileSync(filepath, 'utf-8')
	if (from !== undefined || to !== undefined) {
		const lines = content.split('\n')
		content = lines
			.slice(
				from === undefined ? 0 : from - 1,
				to === undefined ? lines.length : to
			)
			.join('\n')
	}
	if (tabs !== undefined) {
		content = content.replace(/\t/g, ' '.repeat(tabs))
	}
	return `
		<div className="minibook__fence">
			<pre><code>{'${jsStringEscape(content)}'}</code></pre>
		</div>
	`
}

const fence = (tokens, idx, resourcePath) => {
	const token = tokens[idx]
	const info = token.info ? unescapeAll(token.info).trim() : ''
	const tags = info ? info.split(/\s+/g) : []

	if (tags[0] === 'source') {
		const options = yaml.safeLoad(token.content)
		return source(options, resourcePath)
	}

	const render =
		tags[0] === 'example' || tags[0] === 'render'
			? `<div className="minibook__render">${token.content}</div>`
			: ''
	const code =
		tags[0] === 'render'
			? ''
			: `<pre><code>{'${jsStringEscape(token.content)}'}</code></pre>`
	return `
		<div className="minibook__fence">
			${render}
			${code}
		</div>
	`
}

const parse = (markdown, resourcePath, query) => {
	const { body, attributes } = frontMatter(markdown)
	if (!attributes.name) {
		const nameFromPath = resourcePath.match(/([^/]+)\.md$/)[1]
		attributes.name = nameFromPath[0].toUpperCase() + nameFromPath.slice(1)
	}

	const options = { xhtmlOut: true, html: true }
	const md = markdownIt(options)
		.use(anchor, { permalink: true, renderPermalink })
		.use(toc, { includeLevel: [1, 2, 3] })

	// disable jsx in top level blocks by wrapping them into span
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
		`<code>${escapeHtml(tokens[idx].content)}</code>`

	md.renderer.rules.link_open = (tokens, idx) => {
		const token = tokens[idx]
		const href = token.attrGet('href')
		if (href.match(/^https?:\/\//)) {
			// open external links in new window
			token.attrSet('target', '_blank')
		} else {
			// other links should use history api
			token.attrSet('data-use-history-api', '1')
		}
		return md.renderer.renderToken(tokens, idx, options)
	}

	md.renderer.rules.code_block = (tokens, idx) =>
		fence(tokens, idx, resourcePath)
	md.renderer.rules.fence = (tokens, idx) => fence(tokens, idx, resourcePath)

	if (query.configure) query.configure(md)

	const html = md.render(body)
	return { html, attributes }
}

const build = ({ html, attributes }) => {
	const { imports, name, description } = attributes
	const defaultImports = ["import React from 'react'"]
	const markdownImports = imports
		? Object.entries(imports).map(
				([key, value]) => `import ${key} from '${value}'\n`
			)
		: []
	return `
		${[...defaultImports, ...markdownImports].join('\n')}
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
	return build(parse(content, this.resourcePath, this.query))
}
