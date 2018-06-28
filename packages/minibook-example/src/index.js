import React from 'react'
import ReactDOM from 'react-dom'
import MiniBook from 'minibook'
import 'minibook/lib/styles.css'

import Button from './Button'
import Markdown from './markdown.md'
import MarkdownElementsTest from './markdown-elements-test.md'
import MarkdownPluginsTest from './markdown-plugins-test.md'

const sections = {
	example: {
		name: 'Section',
		component: Button,
		stories: {
			props: {
				name: 'Component',
				description: 'Story description',
				props: {
					children: 'Button'
				}
			},
			render: {
				name: 'Render function',
				description:
					'You can provide custom render function for a story',
				props: {
					children: 'Click me!'
				},
				// eslint-disable-next-line react/display-name
				render: (Component, props) => (
					<Component {...props} onClick={() => alert('Click')} />
				)
			},
			iframe: {
				name: 'Iframe',
				description:
					'Story can be another page displayed in the iframe',
				src: '/page.html'
			},
			markdown: {
				name: 'Markdown',
				markdown: Markdown
			},
			'elements-test': {
				name: 'Elements test',
				markdown: MarkdownElementsTest
			},
			'plugins-test': {
				name: 'Plugins test',
				markdown: MarkdownPluginsTest
			}
		}
	}
}

ReactDOM.render(
	<MiniBook title="Minibook" sections={sections} />,
	document.querySelector('#root')
)
