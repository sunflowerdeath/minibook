import React from 'react'
import { createRoot } from 'react-dom/client'
import { Minibook, themes } from 'minibook'

import MD from "minimark-renderer"
// import { Minibook } from "minibook"
// import { dark } from 'minibook/lib/themes'
//import 'minibook/lib/styles.css'

import Button from './Button'
import Markdown from './markdown.md'
import MarkdownElementsTest from './markdown-elements-test.md'
import MarkdownPluginsTest from './markdown-plugins-test.md'

console.log('MINIBOOK', Minibook)
console.log('RENDERER', MD)

const items = {
	index: {
		name: 'Index',
		component: Button,
		props: {
			children: 'Button',
		},
	},
	section: {
		name: 'Section',
		component: Button,
		stories: {
			props: {
				name: 'Component',
				description: 'Story description',
				component: Button,
				props: {
					children: 'Button',
				},
			},
			render: {
				name: 'Render function',
				description:
					'You can provide custom render function for a story',
				component: Button,
				props: {
					children: 'Click me!',
				},
				// eslint-disable-next-line react/display-name
				render: (Component, props) => (
					<Component {...props} onClick={() => alert('Click')} />
				),
			},
			iframe: {
				name: 'Iframe',
				description:
					'Story can be another page displayed in the iframe',
				src: '/page.html',
			},
			markdown: {
				name: 'Markdown',
				markdown: Markdown,
			},
			'elements-test': {
				name: 'Elements test',
				markdown: MarkdownElementsTest,
			},
			'plugins-test': {
				name: 'Plugins test',
				markdown: MarkdownPluginsTest,
			},
		},
	},
}

const root = createRoot(document.getElementById('root'))
root.render(<Minibook title="Minibook" items={items} theme={themes.dark} />)
