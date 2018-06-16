const hastToHtml = require('hast-util-to-html')

const jsxTag = ({ renderer, component, props, children }) => {
	const propsString =
		props && Object.keys(props).length
			? ` {...${JSON.stringify(props)}}`
			: ''
	return (
		`<${renderer} component="${component}"${propsString}` +
		(children ? `>${children}</${renderer}>` : `/>`)
	)
}

function jsxastToJsx(options) {
	const toJsx = node => {
		if (node.type === 'jsx' || node.type === 'root') {
			return jsxTag({
				renderer: options.renderer,
				component: node.type === 'root' ? 'Root' : node.component,
				props: node.props,
				children: node.children && node.children.map(toJsx).join('')
			})
		}
		if (node.type === 'dangerouslySetInnerHTML') {
			const html = node.children.map(toJsx).join('')
			const escapedHtmlString = html
				.replace(/`/g, '\\`')
				.replace(/\$/g, '\\$')
			return `<span dangerouslySetInnerHTML={{ __html: \`${
				escapedHtmlString
			}\` }} />`
		}
		if (node.type === 'element') return hastToHtml(node)
		if (
			node.type === 'text' ||
			node.type === 'html' ||
			node.type === 'raw'
		) {
			return node.value
		}
	}
	this.Compiler = toJsx
}

module.exports = jsxastToJsx
