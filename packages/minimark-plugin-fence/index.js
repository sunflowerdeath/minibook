const path = require('path')
const map = require('unist-util-map')
const yaml = require('js-yaml')
const prism = require('prismjs')
const prismComponents = require('prismjs/components')
const { flatten, escape } = require('lodash')

// parses ranges like this "1, 2 - 4" into this:
// [{start: 1, end: 1}, {start: 2, end: 4}]
const parseLinesRange = linesRange =>
	flatten(
		linesRange
			.replace(/\s/g, '')
			.split(',')
			.map(part => {
				const match = part.match(/^(\d+)(?:-(\d+))?$/)
				const start = match[1]
				const end = match[2]
				return { start, end: end === undefined ? start : end }
			})
	)

// parses lang and optional highlightLines from tags like this: "lang{1-2,3,5}"
const parseTag = tag => {
	if (!tag || !tag.includes('{')) return { lang: tag }
	const match = tag.match(/^(.*)\{([0-9,-\s]+)\}$/)
	return {
		lang: match[1],
		highlightLines: match[2] && parseLinesRange(match[2])
	}
}

const loadPrismLang = lang => {
	if (prism.languages[lang]) return // already loaded
	const langData = prismComponents.languages[lang]
	if (!langData) throw new Error(`Prism doesn't support language '${lang}'.`)
	if (langData.require) {
		// load required languages
		if (Array.isArray(langData.require)) {
			langData.require.forEach(loadPrismLang)
		} else {
			loadPrismLang(langData.require)
		}
	}
	require(`prismjs/components/prism-${lang}.js`)
}

const highlightCode = ({ code, lang }) => {
	if (lang) {
		try {
			loadPrismLang(lang)
		} catch (e) {}
	}
	return lang && prism.languages[lang]
		? prism.highlight(code, prism.languages[lang], lang)
		: escape(code)
}

const fencePlugin = ({ minimarkOptions }) => tree =>
	map(tree, node => {
		if (node.type !== 'code') return node

		if (node.lang === '@source') {
			const { documentPath, readFile } = minimarkOptions
			const {
				file,
				lang,
				highlightLines,
				tabs,
				from,
				to
			} = yaml.safeLoad(node.value)
			const filePath = path.resolve(path.dirname(documentPath), file)
			let code = readFile(filePath, 'utf-8')
			if (from !== undefined || to !== undefined) {
				const lines = code.split('\n')
				code = lines
					.slice(
						from === undefined ? 0 : from - 1,
						to === undefined ? lines.length : to
					)
					.join('\n')
			}
			if (tabs !== undefined) {
				code = code.replace(/\t/g, ' '.repeat(tabs))
			}
			return {
				type: 'jsx',
				component: 'Fence',
				props: {
					code: highlightCode({ code, lang }),
					highlightLines
				}
			}
		}

		const { lang, highlightLines } = parseTag(node.lang)

		if (lang === '@example') {
			return {
				type: 'jsx',
				component: 'Fence',
				props: {
					code: highlightCode({ code: node.value, lang }),
					highlightLines
				},
				children: [{ type: 'raw', value: node.value }]
			}
		}

		if (lang === '@render') {
			return {
				type: 'jsx',
				component: 'Fence',
				children: [{ type: 'raw', value: node.value }]
			}
		}

		return {
			type: 'jsx',
			component: 'Fence',
			props: {
				code: highlightCode({ code: node.value, lang }),
				highlightLines
			}
		}
	})

module.exports = fencePlugin
